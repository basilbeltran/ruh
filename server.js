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

var allInqs = [];
var io = socketIO.listen(httpsServer);

io.sockets.on('connection', function(socket) {

  // // convenience function to log server messages on the client
  // function log() {
  //   var array = ['Message from server:'];
  //   array.push.apply(array, arguments);
  //   socket.emit('log', array);
  //   mLOG(array);
  // }

  socket.on('message', function(message) {     // log('Client said: ', message);
    socket.broadcast.emit('message', message); // for a real app, would be room-only (not broadcast)
     console.log('server socket emitting MESSAGE', message);
  });

  socket.on('question', function(room) {
    socket.join(room);
    console.log(`question ${socket.id} QUESTIONED ${room}`);
    socket.emit('created', room, socket.id);

    allInqs.push({"id":socket.id, "room":room});
    io.sockets.emit('allInqs', allInqs);
    console.log(allInqs);

  });

  socket.on('answer', function(room) {
    console.log(`answer ${socket.id} ANSWERED ${room}`)
    io.sockets.in(room).emit('join', room);
    socket.join(room);
    socket.emit('joined', room, socket.id);
    io.sockets.in(room).emit('ready');
  });


  socket.on('inquiry', function(room) {          ////// INQUIRY
    var numClients = Object.keys(io.sockets.connected).length;
      console.log(`io.sockets HOLDS ${numClients} connections:`);

     allInqs.push({"id":socket.id, "room":room});
     io.sockets.emit('allInqs', allInqs);
     console.log(allInqs);

    if (numClients === 1) {
      socket.join(room);
      console.log(`1 server emits ${socket.id} CREATED ROOM ${room}`);
      socket.emit('created', room, socket.id);

    } else if (numClients === 2) {              // log('Client ID ' + socket.id + ' joined room ' + room);
      console.log(`2 server emits ${socket.id} join/joined/ready ${room}`)
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
    } else { // max two clients
      socket.emit('full', room);
    }
  });

  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
              console.log(` server emits ipaddr   ${details.address} `)
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

});
