const name = 'WEB RTC'
const port = process.env.PORT || 60001
const sslport = process.env.SSLPORT || 60000

debug = require('debug')
mLOG = debug('server:log')
mINFO = debug('server:info')
mERROR = debug('server:error')

mINFO(process.env)  // DEBUG=mINFO

var morgan = require('morgan');
var assert = require('assert')
var os = require('os')
var socketIO = require('socket.io');
var http = require('http');
var https = require('https');
var fs =      require('fs');
var Routes = require('./routes.js');
var mongoose = require('mongoose');

var privateKey  = fs.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate };

var express = require('express')
let app = express();

var bp =      require('body-parser');
var path =    require('path')
var serveIndex = require('serve-index')
var sessions = require('client-sessions')({
    cookieName: "heroes-session",  // front-end cookie name, currently pulled from package.json, feel free to change
    secret: 'DR@G0N$',        // the encryption password : keep this safe
    requestKey: 'session',    // req.session,
    duration: (86400 * 1000) * 7, // one week in milliseconds
    cookie: {
        ephemeral: false,     // when true, cookie expires when browser is closed
        httpOnly: true,       // when true, the cookie is not accesbile via front-end JavaScript
        secure: false         // when true, cookie will only be read when sent over HTTPS
    }
}); // encrypted cookies!

mongoose.connect('mongodb://localhost/rustuck');

app.use(morgan('dev'));
app.use(sessions);

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

setInterval(function(){
  console.log(sslport+' is serving https @ %s', name);
}, 60000);

Routes(app);

httpServer.listen(port);
httpsServer.listen(sslport);


// //START EXPRESS LISTENING
// var server = app.listen(port, () => {
//     mLOG(port +' Listening for %s', name);
// });

module.exports = httpsServer;
require('./work/js/socketListeners.js');
