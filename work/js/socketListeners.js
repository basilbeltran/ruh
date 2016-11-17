var socketIO = require('socket.io');
var httpsServer = require('../../server2.js');
var Question = require('../do/questionModel');

var io = socketIO.listen(httpsServer);
var first = true;
var allInqs = [];  // used for testing when database is not available


io.sockets.on('connection', function(socket) {

    //messages are simply broadcast to all sockets
    socket.on('message', function(message) {
        socket.broadcast.emit('message', message);

        if (typeof message === "string") {
            console.log(`BC MESSAGE ${message} FROM ${socket.id}  ` );
        } else {
            if(message.type !== "candidate"   ){
            console.log(`BC MESSAGE ${message.type} FROM ${socket.id}  ` );
          }
        }
    });

    socket.on('noDatabase', function(questionObjs) {

            // add the question object with a key of the socketID
            //allInqs.push({"id":socket.id, "question":questionObj});

            // here we get all the questions
            allInqs = questionObjs;
            var newQuestion = allInqs[allInqs.length -1]

            // create the room with the new question UUID
            socket.join( newQuestion.qUUID );
                console.log(`${socket.id} noDatabase ${newQuestion.qUUID}`);

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
