'use strict';

angular.module("RuhApp")
  .controller('RuhQuestionController', questionController);
questionController.$inject = ['RuhQuestionFactory'];



function questionController(RuhQuestionFactory){

  var questionThis = this;
  questionThis.token = "questionController";
  questionThis.data = RuhQuestionFactory.getData();
  questionThis.socket = RuhQuestionFactory.current.socket = RuhQuestionFactory.current.socket || io.connect();
// socket, question and peer are available at RuhQuestionFactory.current.

  var questionObjs; //send the factory fields, get object back

  questionThis.selectedCat;
  questionThis.message = "You are one click (more or less) away from expert help";
  questionThis.data = RuhQuestionFactory.getData();

  //var pcConfig = { 'iceServers': [ {'url': 'stun:stun.l.google.com:19302'} ] };
  //var sdpConstraints = { 'mandatory': {'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true} };
  //var mediaConstraints = { audio: false, video: true };
  var constraints = {
      video: {
          mandatory: {
              minAspectRatio: 1.777,
              maxAspectRatio: 1.778
          },
          optional: [{
              maxWidth: 640
          }, {
              maxHeigth: 480
          }]
      },
      audio: false
  }


////////////////// addQuestion  ng-click

questionThis.addQuestion = function() {
        // put the question fields in the "database"
        questionObjs = RuhQuestionFactory.addQuestion(questionThis); //returns ALL questions
        //set CURRRENT question
        RuhQuestionFactory.current.question =  questionObjs[questionObjs.length-1];
        //send the questionS  to the server
        questionThis.socket.emit('question', questionObjs);
        //questionThis.socket.emit('inquiry', "test");   //since first, create msg sent

        navigator.mediaDevices.getUserMedia(constraints)
            .then(gotStream)
            .catch(function(e) {
                alert('getUserMedia() error: ' + e);
            });

    } ////////////////// addQuestion

questionThis.sendText = function(){
      var data = textIn.value;
      RuhQuestionFactory.current.dataChannel.send(data);
      console.log('Sent Data: ' + data);
    } ///////////////// sendText


//GUM >>
//////////////////////////////////////////////////////////// SHARED LOGIC
// gotStream >sends GUM>>
  // maybeStart  if ChannelReady>>
    // createPeerConnection >> addStream (so isStarted = true;)
      //pc.onicecandidate = handleIceCandidate;
      //pc.onaddstream = handleRemoteStreamAdded;
      //pc.onremovestream



var localStream;
var remoteStream;
var localVideo = document.getElementById('localVideo')
var remoteVideo = document.getElementById('remoteVideo');
var textIn = document.querySelector('textarea#textIn');
var textOut = document.querySelector('textarea#textOut');
var canvas = document.getElementById('canvas1');

var isInitiator = false;
var isChannelReady = false;
var isStarted = false;
var offerOptions = { offerToReceiveAudio: 1, offerToReceiveVideo: 1 };
var turnReady;


function gotStream(stream) {
  console.log('gotStream adding local stream to tag.');

  localVideo.src = window.URL.createObjectURL(stream);
  localStream = stream;

  sendMessage(questionThis, 'got user media');
  // if (isInitiator) {
  //     console.log('I think I the initiator, so maybeStart()');
  //   maybeStart();                                               // why would this ever work? channels not ready
  // }
}

function maybeStart() {

  console.log(`maybeStart() isStarted is ${isStarted} isChannelReady is ${isChannelReady}` );

  if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {

    console.log(' maybeStart() creating peer connection');
    createPeerConnection();
    RuhQuestionFactory.current.peer.addStream(localStream);
    isStarted = true;

    if (isInitiator) {
      doOffer(questionThis);
    }
  }
}

////////////////////////////// OFFER ///////////////////////////
function doOffer() {
  console.log('************ DO OFFER');
  RuhQuestionFactory.current.peer.createOffer(setLocalAndSendMessage, handleCreateOfferError);
}

function handleCreateOfferError(event) {
  console.log('createOffer() error: ', event);
}


////////////////////////////// ANSWER ///////////////////////////
function doAnswer() {
  console.log('************ DO ANSWER');
  RuhQuestionFactory.current.peer.createAnswer().then(
    setLocalAndSendMessage,
    onCreateSessionDescriptionError
  );
}

function setLocalAndSendMessage(sessionDescription) {
  console.log('************ SET LOCAL');
  // Set Opus as the preferred codec in SDP if Opus is present.
  //  sessionDescription.sdp = preferOpus(sessionDescription.sdp);
  RuhQuestionFactory.current.peer.setLocalDescription(sessionDescription);
  console.log('setLocalAndSendMessage sending message', sessionDescription.type);
  sendMessage(questionThis, sessionDescription);
}

function onCreateSessionDescriptionError(error) {
    console.log('Failed to create session description: ' + error.toString());
}



/////////////// SOCKET EVENTS  //////////////////////////


questionThis.socket.on('message', function(message) {  /////////////  MESSAGE ///////////


  if(message.type) {
      console.log('received message with', message.type);
  } else {
      console.log('received message with', message);
  }

  if (message === 'got user media') {
    maybeStart();                                   ///////////// peer joined so  MAYBE START ///////////


  } else if (message.type === 'offer') {    // if i get an offer start? set remote & answer
    if (!isInitiator && !isStarted) {

      maybeStart();
    }

    RuhQuestionFactory.current.peer.setRemoteDescription(new RTCSessionDescription(message));
    doAnswer();


  } else if (message.type === 'answer' && isStarted) {
    RuhQuestionFactory.current.peer.setRemoteDescription(new RTCSessionDescription(message));


  } else if (message.type === 'candidate' && isStarted) {
    var candidate = new RTCIceCandidate({
      sdpMLineIndex: message.label,
      candidate: message.candidate
    });
    RuhQuestionFactory.current.peer.addIceCandidate(candidate);

  } else if (message === 'bye' && isStarted) {
    handleRemoteHangup();
  }
});



// questionThis.socket.on(eventName, function (obj) {
//   processSocketEvent(obj,  eventName, questionThis);
// });

questionThis.socket.on('created', room => {     ////////////////////////  CREATED
  console.log(`ON created -  set initiator  ${room}`);
  isInitiator = true;
});

questionThis.socket.on('join', room =>{        ////////////////////////  JOIN (tell client peer joined)
  console.log(`ON join - set Channel Ready  ${room}`);
  isChannelReady = true;
});

questionThis.socket.on('joined', room =>{     ////////////////////////  JOINED
  console.log(`ON joined - set Channel Ready  ${room}`);
  isChannelReady = true;
});



questionThis.socket.on('full', room => {       ////////////////////////  FULL
  console.log(`ON  full with ${room} `);
});

questionThis.socket.on('allInqs', inq => {    ////////////////////////  ALLINQS
  console.dir("ON all inqueries " +inq);
});



//////////////////////  ICE    //////////////////////////

function createPeerConnection() {
  try {
    RuhQuestionFactory.current.peer = new RTCPeerConnection(null);
    RuhQuestionFactory.current.peer.onicecandidate = handleIceCandidate;
    RuhQuestionFactory.current.peer.onaddstream = handleRemoteStreamAdded;
    RuhQuestionFactory.current.peer.onremovestream = handleRemoteStreamRemoved;
    RuhQuestionFactory.current.peer.ondatachannel = receiveChannelCallback;
  } catch (e) {
    console.log('Failed to create PeerConnection, exception: ' + e.message);
    alert('Cannot create RTCPeerConnection object.');
    return;
  }
}

function receiveChannelCallback(event) {
      console.log('!!!!!!  receiveChannelCallback assigning dataChannel');
    RuhQuestionFactory.current.dataChannel = event.channel;
    RuhQuestionFactory.current.dataChannel.onmessage = onMessage;
    RuhQuestionFactory.current.dataChannel.onopen = function(event) {
      RuhQuestionFactory.current.dataChannel.send('dataChannel is open');
    }
    // receiveChannel.onmessage = handleReceiveMessage;
    // receiveChannel.onopen = handleReceiveChannelStatusChange;
    // receiveChannel.onclose = handleReceiveChannelStatusChange;
  }


function handleIceCandidate(event) {
  console.log('ICE CANDIDATE event: ', event.type);
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

//////////////////////  REMOTE STREAM    //////////////////////////
function handleRemoteStreamAdded(event) {
  console.log('*************REMOTE STREAM EVENT.');
  remoteVideo.src = window.URL.createObjectURL(event.stream);
  remoteStream = event.stream;
}

//////////////////////  GOODBYES

function handleRemoteStreamRemoved(event) {
  console.log('Remote stream removed. Event: ', event);
}

function handleRemoteHangup() {
  console.log('************ handleRemoteHangup');
  stop(questionThis);
  isInitiator = false;
}

function hangup() {
  console.log('*************  Hanging up.');
  stop(questionThis);
  sendMessage(questionThis, 'bye');
}

window.onbeforeunload = function() {
  sendMessage(questionThis, 'bye');
};

////////////////////////////////////////////////////////
} //END qMainController
