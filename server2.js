const name = 'WEB RTC'
const port = process.env.PORT || 60001
const sslport = process.env.SSLPORT || 60000

debug = require('debug')
mLOG = debug('server:log')
mINFO = debug('server:info')
mERROR = debug('server:error')

mINFO(process.env)  // DEBUG=mINFO

var assert = require('assert')

var os = require('os')
var socketIO = require('socket.io')

var http = require('http');
var https = require('https');

var fs =      require('fs')
var privateKey  = fs.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var express = require('express')
let app = express();

var bp =      require('body-parser')
var path =    require('path')
var serveIndex = require('serve-index')
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/work'));

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(port);
httpsServer.listen(sslport);

setInterval(function(){
  mINFO(sslport+' is serving https @ %s', name);
}, 60000);


// //START EXPRESS LISTENING
// var server = app.listen(port, () => {
//     mLOG(port +' Listening for %s', name);
// });

var first = true;
var allInqs = [];
var io = socketIO.listen(httpsServer);


  io.sockets.on('connection', function(socket) {

    //messages are simply broadcast to all sockets
    socket.on('message', function(message) {
        socket.broadcast.emit('message', message); // for a real app, would be room-only (not broadcast)

        if (typeof message === "string") {
            console.log(`BC MESSAGE ${message} FROM ${socket.id}  ` );
        } else {
            if(message.type !== "candidate"  &&  message !== "bye"  ){
            console.log(`BC MESSAGE ${message.type} FROM ${socket.id}  ` );
          }
        }
    });



socket.on('question', function(questionObjs) {

        // add the question object with a key of the socketID
        //allInqs.push({"id":socket.id, "question":questionObj});

        // here we get all the questions
        allInqs = questionObjs;
        var newQuestion = allInqs[allInqs.length -1]

        // create the room with the new question UUID
        socket.join( newQuestion.qUUID );
            console.log(`${socket.id} IS ASKING ${newQuestion.qUUID}`);

        // ping back to questioner  (was "created")  send back the new question object
        socket.emit('created', newQuestion.qUUID, socket.id);  // client sets "initiator"

        // send the array of inquiries back to everyone
        socket.broadcast.emit('allQuestions', allInqs, socket.id);
        //console.log(allInqs);

      });

socket.on('getAllQuestions', function() {
         socket.emit('allQuestions', allInqs, socket.id);
      });

socket.on('answer', function(qUUID) {
        socket.join(qUUID);
        console.log(` ${socket.id} IS ANSWERING ${qUUID}`)

        io.sockets.in(qUUID).emit('join', qUUID);   // broadcast to room set isChannelReady
        socket.emit('joined', qUUID, socket.id);   // back to new peer  set isChannelReady
      });




socket.on('ipaddr', function() {
        var ifaces = os.networkInterfaces();
        for (var dev in ifaces) {
          ifaces[dev].forEach(function(details) {
            if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
                  console.log(` server emits IPADDR   ${details.address} `)
              socket.emit('ipaddr', details.address);
            }
          });
        }
      });


});  // sockets on

  // // legacy code ....
  //
  //   socket.on('inquiry', function(room) {          ////// INQUIRY
  //
  //     console.log(`first is ${first} `);
  //         if (first) {
  //           socket.join(room);
  //           console.log(`${socket.id} CREATED ROOM ${room}`);
  //
  //           socket.emit('created', room, socket.id);            // back to client as initiator
  //           first = false;
  //                             // } else if (numClients === 2) {   // log('Client ID ' + socket.id + ' joined room ' + room);
  //         }
  //
  //         else {
  //           socket.join(room);
  //           console.log(`${socket.id} joined ${room}`)
  //
  //           socket.emit('joined', room, socket.id);           // back to new peer  set isChannelReady
  //           io.sockets.in(room).emit('join', room);           // broadcast to room set isChannelReady
  //
  //
  //           // io.sockets.in(room).emit('ready');             // broadcast to room NOT USED
  //         }
  //         // else { // max two clients
  //         //   socket.emit('full', room);
  //         // }
  //       });
  // // END legacy code ....
