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

  socket.on('message', function(message) { // log('Client said: ', message);
      socket.broadcast.emit('message', message); // for a real app, would be room-only (not broadcast)

      if (typeof message === "string") {
          console.log(`BROADCASTING ${socket.id} MESSAGE ` + message);
      } else {
          console.log(`BROADCASTING ${socket.id} MESSAGE ` + message.type);
      }
  });


// legacy code ....

  socket.on('inquiry', function(room) {          ////// INQUIRY

    console.log(`first is ${first} `);
        if (first) {
          socket.join(room);
          console.log(`${socket.id} CREATED ROOM ${room}`);
          socket.emit('created', room, socket.id);
          first = false;
    //    } else if (numClients === 2) {              // log('Client ID ' + socket.id + ' joined room ' + room);
        } else {
          console.log(`${socket.id} joined ${room}`)
          io.sockets.in(room).emit('join', room);
          socket.join(room);
          socket.emit('joined', room, socket.id);
          io.sockets.in(room).emit('ready');
        }
        // else { // max two clients
        //   socket.emit('full', room);
        // }
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

//new code
  socket.on('question', function(questionObj) {
// add the question object with a key of the socketID
    allInqs.push({"id":socket.id, "question":questionObj});
    socket.join(questionObj.qUUID);
    console.log(`socket.join ${socket.id} qUUID: ${questionObj.qUUID}`);

// ping back to questioner  (was "created")
    socket.emit('asked', allInqs[allInqs.length -1], socket.id);

//  send the array of inquiries back to everyone
    io.sockets.emit('allInqs', allInqs);
    //console.log(allInqs);

  });

  socket.on('answer', function(room) {
    console.log(`answer ${socket.id} ANSWERED ${room}`)
    io.sockets.in(room).emit('join', room);
    socket.join(room);
    socket.emit('joined', room, socket.id);
    io.sockets.in(room).emit('ready');
  });



});  // sockets on
