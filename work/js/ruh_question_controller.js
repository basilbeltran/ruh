'use strict';

angular.module("RuhApp")
  .controller('RuhQuestionController', questionController);
questionController.$inject = ['RuhQuestionFactory'];



function questionController(RuhQuestionFactory){
  var questionThis = this;
  var questionObj; //send the factory fields, get object back

  questionThis.token = "questionController";
  questionThis.selectedCat;
  questionThis.message = "You are one click (more or less) away from expert help";
  questionThis.data = RuhQuestionFactory.getData();

  questionThis.socket = io.connect();
  questionThis.pc;

////////////////// addQuestion
questionThis.addQuestion = function() {
        // put the question fields in the "database"
        questionObj = RuhQuestionFactory.addQuestion(questionThis); //console.dir(questionObj);

        //send the question to the server
        //questionThis.socket.emit('question', questionObj);
        //questionThis.socket.emit('inquiry', questionObj );
        questionThis.socket.emit('inquiry', "test"); //TODO use the question UUID

        navigator.mediaDevices.getUserMedia({
                audio: false,
                video: true
            })
            .then(gotStream)
            .catch(function(e) {
                alert('getUserMedia() error: ' + e.name);
            });

    } ////////////////// addQuestion


//////////////////////////////////////////////////////////// SHARED LOGIC
//var pcConfig = { 'iceServers': [ {'url': 'stun:stun.l.google.com:19302'} ] };
//var sdpConstraints = { 'mandatory': {'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true} };
//var mediaConstraints = { audio: false, video: true };
//var constraints = { video: true};

var localStream;
var remoteStream;
var localVideo = document.getElementById('localVideo')
var remoteVideo = document.getElementById('remoteVideo');

var isInitiator = false;
var isChannelReady = false;
var isStarted = false;
var offerOptions = { offerToReceiveAudio: 1, offerToReceiveVideo: 1 };
var turnReady;


function gotStream(stream) {
  console.log('Adding local stream.');
  localVideo.src = window.URL.createObjectURL(stream);
  questionThis.data.localStream = stream;
  localStream = stream;
  sendMessage(questionThis, 'got user media');
  if (isInitiator) {
      console.log('I think I the initiator, so maybestart()');
    maybeStart();
  }
}



questionThis.socket.on('created', room => {
  console.log(`received created with room ${room}`);
  isInitiator = true;
});

questionThis.socket.on('full', room => {
  console.log(`received  full with ${room} `);
});

questionThis.socket.on('join', room =>{
  console.log(`received join with  ${room}`);
  isChannelReady = true;
});

questionThis.socket.on('joined', room =>{
  console.log(`received joined with  ${room}`);
  isChannelReady = true;
});

questionThis.socket.on('log', array => {
  console.log(`received log with ...`);
  console.log.apply(console, array);
});

questionThis.socket.on('allInqs', inq => {
  console.dir(inq);
});
////////////////////////////////////////////////


// This client receives a message
questionThis.socket.on('message', function(message) {
  console.log('received message with', message.type);
  if (message === 'got user media') {
    maybeStart();
  } else if (message.type === 'offer') {
    if (!isInitiator && !isStarted) {
      maybeStart();
    }
    questionThis.pc.setRemoteDescription(new RTCSessionDescription(message));
    doAnswer();
  } else if (message.type === 'answer' && isStarted) {
    questionThis.pc.setRemoteDescription(new RTCSessionDescription(message));
  } else if (message.type === 'candidate' && isStarted) {
    var candidate = new RTCIceCandidate({
      sdpMLineIndex: message.label,
      candidate: message.candidate
    });
    questionThis.pc.addIceCandidate(candidate);
  } else if (message === 'bye' && isStarted) {
    handleRemoteHangup();
  }
});



function maybeStart() {

  console.log(`maybeStart() isStarted is ${isStarted} isChannelReady is ${isChannelReady}` );
  if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
    console.log(' maybeStart() creating peer connection');
    createPeerConnection();
    questionThis.pc.addStream(localStream);
    isStarted = true;
    console.log('isInitiator', isInitiator);
    if (isInitiator) {
      doOffer(questionThis);
    }
  }
}

window.onbeforeunload = function() {
  sendMessage(questionThis, 'bye');
};

/////////////////////////////////////////////////////////

function createPeerConnection() {
  try {
    questionThis.pc = new RTCPeerConnection(null);
    questionThis.pc.onicecandidate = handleIceCandidate;
    questionThis.pc.onaddstream = handleRemoteStreamAdded;
    questionThis.pc.onremovestream = handleRemoteStreamRemoved;
    console.log('Created RTCPeerConnnection');
  } catch (e) {
    console.log('Failed to create PeerConnection, exception: ' + e.message);
    alert('Cannot create RTCPeerConnection object.');
    return;
  }
}

function handleIceCandidate(event) {
  console.log('icecandidate event: ', event.type);
  if (event.candidate) {
    sendMessage(questionThis, {
      type: 'candidate',
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate
    });
  } else {
    console.log('End of candidates.');
  }
}

function handleRemoteStreamAdded(event) {
  console.log('*************REMOTE STREAM EVENT.');
  remoteVideo.src = window.URL.createObjectURL(event.stream);
  remoteStream = event.stream;
}


////////////////////////////// ANSWER ///////////////////////////
function doAnswer() {
  console.log('************ DO ANSWER');
  questionThis.pc.createAnswer().then(
    setLocalAndSendMessage,
    onCreateSessionDescriptionError
  );
}

//////////////////////////////OFFER ///////////////////////////
function doOffer() {
  console.log('************ DO OFFER');
  questionThis.pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
}

function handleCreateOfferError(event) {
  console.log('createOffer() error: ', event);
}

function setLocalAndSendMessage(sessionDescription) {
  console.log('************ SET LOCAL');
  // Set Opus as the preferred codec in SDP if Opus is present.
  //  sessionDescription.sdp = preferOpus(sessionDescription.sdp);
  questionThis.pc.setLocalDescription(sessionDescription);
  console.log('setLocalAndSendMessage sending message', sessionDescription.type);
  sendMessage(questionThis, sessionDescription);
}

function onCreateSessionDescriptionError(error) {
    console.log('Failed to create session description: ' + error.toString());
}










function handleRemoteStreamRemoved(event) {
  console.log('Remote stream removed. Event: ', event);
}

function hangup() {
  console.log('*************  Hanging up.');
  stop(questionThis);
  sendMessage(questionThis, 'bye');
}

function handleRemoteHangup() {
  console.log('************ handleRemoteHangup');
  stop(questionThis);
  isInitiator = false;
}


////////////////////////////////////////////////////////
} //END qMainController
