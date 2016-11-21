const name = 'WEB RTC'
const port = 80
const sslport = 443





var morgan = require('morgan');
var assert = require('assert')
var os = require('os')
var socketIO = require('socket.io');
var http = require('http');
var https = require('https');
var fs =      require('fs');
var Routes = require('./routes.js');
var mongoose = require('mongoose');
var express = require('express');
var bp =      require('body-parser');
var path =    require('path');
var serveIndex = require('serve-index');

var sessions = require('client-sessions')({
    cookieName: "rustuck-session",  // front-end cookie name, currently pulled from package.json, feel free to change
    secret: '@NyT1M3',        // the encryption password : keep this safe
    requestKey: 'session',    // req.session,
    duration: (86400 * 1000) * 7, // one week in milliseconds
    cookie: {
        ephemeral: false,     // when true, cookie expires when browser is closed
        httpOnly: true,       // when true, the cookie is not accesbile via front-end JavaScript
        secure: false         // when true, cookie will only be read when sent over HTTPS
    }
}); // encrypted cookies!

var credentials = {
    production: {
        key:  fs.readFileSync('/etc/letsencrypt/live/rustuck.website/privkey.pem', 'utf8'),
        cert: fs.readFileSync('/etc/letsencrypt/live/rustuck.website/cert.pem', 'utf8')
    },
    development: {
        key:  fs.readFileSync('sslcert/key.pem', 'utf8'),
        cert: fs.readFileSync('sslcert/cert.pem', 'utf8');
    }
}

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rustuck');

var app = express();
app.use(morgan('dev'));
app.use(sessions);
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials[process.env.NODE_ENV||'development'], app);

setInterval(function(){
  console.log(sslport+' is serving https @ %s', name);
}, 60000);

Routes(app);

httpServer.listen(port);
httpsServer.listen(sslport);

module.exports = httpsServer;
require('./work/js/socketListeners.js');
