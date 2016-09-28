const name = 'WEB RTC'
const port = process.env.PORT || 60000

debug = require('debug')
mLOG = debug('server:log')
mINFO = debug('server:info')
mERROR = debug('server:error')

mINFO(process.env)  // DEBUG=mINFO

var assert = require('assert')
var os = require('os')
var socketIO = require('socket.io')
var express = require('express')
var fs =      require('fs')
var bp =      require('body-parser')
var path =    require('path')
var serveIndex = require('serve-index')
let app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/work'));     // put a dot here

//START EXPRESS LISTENING
var server = app.listen(port, () => {
    mLOG(port +' Listening for %s', name);
});

setInterval(function(){
  mINFO(port+' is serving  %s', name);
}, 60000);



var io = socketIO.listen(server);

io.sockets.on('connection', function(socket) {

  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
    mLOG(array);
  }

  socket.on('message', function(message) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });

  socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room);

var numSockets = Object.keys(io.sockets.connected).length;
console.log(`THERE ARE ${numSockets} SOCKETS`)
    var numClients = Object.keys(io.sockets.connected).length
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    if (numClients === 1) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);

    } else if (numClients === 2) {
      log('Client ID ' + socket.id + ' joined room ' + room);
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
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

});
