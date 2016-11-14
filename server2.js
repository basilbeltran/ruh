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
var socketIO = require('socket.io');
var http = require('http');
var https = require('https');
var fs =      require('fs');

var privateKey  = fs.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate };

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

setInterval(function(){
  console.log(sslport+' is serving https @ %s', name);
}, 60000);


httpServer.listen(port);
httpsServer.listen(sslport);


// //START EXPRESS LISTENING
// var server = app.listen(port, () => {
//     mLOG(port +' Listening for %s', name);
// });

module.exports = httpsServer;
require('./work/js/socketListeners.js');
