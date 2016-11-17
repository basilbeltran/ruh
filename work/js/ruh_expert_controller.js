'use strict';

angular.module("RuhApp")
  .controller('RuhExpertController', expertController);
expertController.$inject = ['RuhQuestionFactory', '$scope'];


//function expertController($scope, RuhQuestionFactory){
function expertController(RuhQuestionFactory, $scope){
  var expertThis = this;
  // These are assigned to questionThis so butils.js can hold shared code
  expertThis.token = "expertController";
  expertThis.socket = io.connect();
  expertThis.pc;


  var loggedText = "Logged in as You";

 expertThis.qArray = RuhQuestionFactory.getQuestions();   // First Get questions locally
// then refresh questions from the server instead
expertThis.socket.emit('getAllQuestions'); //TODO how to do this callback properly

  expertThis.socket.on('allQuestions', questions => {       ////////////////////////  FULL

    console.dir("EXPERT RECEIVED QUESTIONS");
    console.dir(questions);
    expertThis.qArray = questions;
    $scope.$apply();

  });

  // console.log(expertThis.qArray);
  // console.log( RuhUserFactory.getExperts("node")) ;    // is an expert in that area logged in ?


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


////////////////// answerQuestion  ng-click

  expertThis.answerQuestion = function(uuid){
  //join the room
  expertThis.socket.emit('answer', uuid );
  expertThis.qArray[expertThis.qArray.length -1].qStatus = "orange";

  //obtain localMedia stream

      navigator.mediaDevices.getUserMedia(constraints)
      .then(gotStream)
      .catch(function(e) {
        alert('getUserMedia() error: ' + e);
      });

  } ///////////////// answerQuestion


  //GUM >>
  //////////////////////////////////////////////////////////// SHARED LOGIC
  // gotStream >>
    // maybeStart >>
      // createPeerConnection >> addStream
        //pc.onicecandidate = handleIceCandidate;
        //pc.onaddstream = handleRemoteStreamAdded;
        //pc.onremovestream


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
    console.log('Adding local stream to tag.');
    localVideo.src = window.URL.createObjectURL(stream);
    localStream = stream;
    sendMessage(expertThis, 'got user media');
    if (isInitiator) {
        console.log('I think I the initiator, so maybestart()');
      maybeStart();
    }
  }

  function maybeStart() {

    console.log(`maybeStart() isStarted is ${isStarted} isChannelReady is ${isChannelReady}` );
    if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
      console.log(' maybeStart() creating peer connection');
      createPeerConnection();
      expertThis.pc.addStream(localStream);
      isStarted = true;

      if (isInitiator) {
        doOffer(expertThis);
      }
    }
  }

  //////////////////////////////OFFER ///////////////////////////
  function doOffer() {
    console.log('************ DO OFFER');
    expertThis.pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
  }

  function handleCreateOfferError(event) {
    console.log('createOffer() error: ', event);
  }


  ////////////////////////////// ANSWER ///////////////////////////
  function doAnswer() {
    console.log('************ DO ANSWER');
    expertThis.pc.createAnswer().then(
      setLocalAndSendMessage,
      onCreateSessionDescriptionError
    );
  }

  function setLocalAndSendMessage(sessionDescription) {
    console.log('************ SET LOCAL');
    // Set Opus as the preferred codec in SDP if Opus is present.
    //  sessionDescription.sdp = preferOpus(sessionDescription.sdp);
    expertThis.pc.setLocalDescription(sessionDescription);
    console.log('setLocalAndSendMessage sending message', sessionDescription.type);
    sendMessage(expertThis, sessionDescription);
  }

  function onCreateSessionDescriptionError(error) {
      console.log('Failed to create session description: ' + error.toString());
  }



  /////////////// SOCKET EVENTS  //////////////////////////


  expertThis.socket.on('message', function(message) {  /////////////  MESSAGE ///////////
    console.log('received message with', message.type);

    if (message === 'got user media') {
      maybeStart();                                   /////////////  MAYBE START ///////////


    } else if (message.type === 'offer') {
      if (!isInitiator && !isStarted) {
        maybeStart();
      }
      expertThis.pc.setRemoteDescription(new RTCSessionDescription(message));
      doAnswer();


    } else if (message.type === 'answer' && isStarted) {
      expertThis.pc.setRemoteDescription(new RTCSessionDescription(message));


    } else if (message.type === 'candidate' && isStarted) {
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate
      });
      expertThis.pc.addIceCandidate(candidate);

    } else if (message === 'bye' && isStarted) {
      handleRemoteHangup();
    }
  });



  // expertThis.socket.on(eventName, function (obj) {
  //   processSocketEvent(obj,  eventName, expertThis);
  // });

  expertThis.socket.on('created', room => {     ////////////////////////  CREATED
    console.log(`IO received created with room ${room}`);
    isInitiator = true;
  });

  expertThis.socket.on('full', room => {       ////////////////////////  FULL
    console.log(`IO received  full with ${room} `);
  });

  expertThis.socket.on('join', room =>{        ////////////////////////  JOIN
    console.log(`IO received join with  ${room}`);
    isChannelReady = true;
  });

  expertThis.socket.on('joined', room =>{     ////////////////////////  JOINED
    console.log(`IO received joined with  ${room}`);
    isChannelReady = true;
  });


  //////////////////////  ICE    //////////////////////////

  function createPeerConnection() {
    try {
      expertThis.pc = new RTCPeerConnection(null);
      expertThis.pc.onicecandidate = handleIceCandidate;
      expertThis.pc.onaddstream = handleRemoteStreamAdded;
      expertThis.pc.onremovestream = handleRemoteStreamRemoved;
      console.log('Created RTCPeerConnnection');
    } catch (e) {
      console.log('Failed to create PeerConnection, exception: ' + e.message);
      alert('Cannot create RTCPeerConnection object.');
      return;
    }
  }

  function handleIceCandidate(event) {
    console.log('ICE CANDIDATE event: ', event.type);
    if (event.candidate) {
      sendMessage(expertThis, {
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
    stop(expertThis);
    isInitiator = false;
  }

  function hangup() {
    console.log('*************  Hanging up.');
    stop(expertThis);
    sendMessage(expertThis, 'bye');
  }

  window.onbeforeunload = function() {
    sendMessage(expertThis, 'bye');
  };


////////// END OF webRTC logic  ////////////////



    expertThis.showQuestionDetails = function(){
      console.log('showQuestionDetails called');
    }

    expertThis.hideQuestionDetails = function(){
      console.log('hideQuestionDetails called');
    }



    expertThis.showUserDetails = function(){
      console.log('showUserDetails called');
    }

    expertThis.hideUserDetails = function(){
      console.log('hideUserDetails called');
    }



    expertThis.showCommentArray = function(){
      expertThis.isCommentsShown = true;
    }

    expertThis.hideCommentArray = function(){
      expertThis.isCommentsShown = false;
    }

  ////////////////////////////////////////////////////////
} //END qMainController
