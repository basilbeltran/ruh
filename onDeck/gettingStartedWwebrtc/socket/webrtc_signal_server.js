

// useful libs
var http = require("http");
var fs = require("fs");
var express = require('express');
var websocket = require("websocket").server;

// general variables
var port = 1234;
var webrtc_clients = [];
var webrtc_discussions = {};

xpress = require('express')
let app = express();
app.use(express.static(__dirname + '/public'));

//START EXPRESS LISTENING
var server = app.listen(port, () => {
    console.log('MASTER NODE>', port);
});

// web socket functions
var websocket_server = new websocket({
  httpServer: server
});

websocket_server.on("request", function(request) {
  log_comment("new request ("+request.origin+")");

  var connection = request.accept(null, request.origin);
  log_comment("new connection ("+connection.remoteAddress+")");

  webrtc_clients.push(connection);
  connection.id = webrtc_clients.length-1;

  connection.on("message", function(message) {
    if (message.type === "utf8") {
      log_comment("got message "+message.utf8Data);

      var signal = undefined;
      try { signal = JSON.parse(message.utf8Data); } catch(e) { };
      if (signal) {
        if (signal.type === "join" && signal.token !== undefined) {
          try {
            if (webrtc_discussions[signal.token] === undefined) {
              webrtc_discussions[signal.token] = {};
            }
          } catch(e) { };
          try {
            webrtc_discussions[signal.token][connection.id] = true;
          } catch(e) { };
        } else if (signal.token !== undefined) {
          try {
            Object.keys(webrtc_discussions[signal.token]).forEach(function(id) {
              if (id != connection.id) {
                webrtc_clients[id].send(message.utf8Data, log_error);
              }
            });
          } catch(e) { };
        } else {
          log_comment("invalid signal: "+message.utf8Data);
        }
      } else {
        log_comment("invalid signal: "+message.utf8Data);
      }
    }
  });

  connection.on("close", function(connection) {
    log_comment("connection closed ("+connection.remoteAddress+")");
    Object.keys(webrtc_discussions).forEach(function(token) {
      Object.keys(webrtc_discussions[token]).forEach(function(id) {
        if (id === connection.id) {
          delete webrtc_discussions[token][id];
        }
      });
    });
  });
});

// utility functions
function log_error(error) {
  if (error !== "Connection closed" && error !== undefined) {
    log_comment("ERROR: "+error);
  }
}
function log_comment(comment) {
  console.log((new Date())+" "+comment);
}
