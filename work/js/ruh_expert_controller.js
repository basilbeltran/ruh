'use strict';

angular.module("RuhApp")
  .controller('RuhExpertController', expertController);
expertController.$inject = ['RuhQuestionFactory'];

function expertController(RuhQuestionFactory){
  var expertThis = this;
  var loggedText = "Logged in as You";
  // expertThis.users = RuhUserFactory.users;

  expertThis.qArray = RuhQuestionFactory.getQuestions();   // an error here stops the page painting
  //console.log(expertThis.qArray);
  // console.log( RuhUserFactory.getExperts("node")) ;    // is an expert in that area logged in ?


  expertThis.showProfile = function(){
    // expertThis.isProfileShown = true;
    if(expertThis.isProfileShown){
      expertThis.isProfileShown = false;
    } else{
      expertThis.isProfileShown = true;
    }
  }

  expertThis.makeStatusRed = function(){
    expertThis.qStatus = "statusRed";
    console.log('makeStatusRed called');
  }

  expertThis.makeStatusGreen = function(){
    expertThis.qStatus = "statusGreen";
    console.log('makeStatusGreen called');
  }


  //////////////////////////////////////////////////////////////////////////
  var socket = io.connect();
  var localVideo = document.getElementById('localVideo')
  var remoteVideo = document.getElementById('remoteVideo');
  var mediaConstraints = { audio: false, video: true };
  var offerOptions = { offerToReceiveAudio: 1, offerToReceiveVideo: 1 };



////////////////// answerQuestion
  expertThis.answerQuestion = function(){
  //join the room
  socket.emit('inquiry', "test" );

  //obtain localMedia stream

      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      })
      .then(gotStream)
      .catch(function(e) {
        alert('getUserMedia() error: ' + e.name);
      });

  } ///////////////// answerQuestion

  /////////////////////////////////////////////////////////////////
  ////////////////////////////main.js//////////////////////////////
  /////////////////////////////////////////////////////////////////

  var isChannelReady = false;
  var isInitiator = false;
  var isStarted = false;
  var localStream;
  var pc;
  var remoteStream;
  var turnReady;

  var pcConfig = {
    'iceServers': [{
      'url': 'stun:stun.l.google.com:19302'
    }]
  };

  // Set up audio and video regardless of what devices are present.
  var sdpConstraints = {
    'mandatory': {
      'OfferToReceiveAudio': true,
      'OfferToReceiveVideo': true
    }
  };

  function report(str){
    console.log(str);
    //document.getElementById("roomText").innerHTML = str;
  }



  function gotStream(stream) {
    sendMessage('got user media');
    console.log('Adding local stream.');
    localVideo.src = window.URL.createObjectURL(stream);
    // questionThis.data.localStream = stream;
    localStream = stream;

    if (isInitiator) {
            console.log('I NOT initiator, NO maybestart()');
      maybeStart();
    }
  }



  socket.on('created', room => {
    report(`received created with room ${room}`);
    isInitiator = true;
  });

  socket.on('full', room => {
    report(`received  full with ${room} `);
  });

  socket.on('join', room =>{
    report(`received join with  ${room}`);
    isChannelReady = true;
  });

  socket.on('joined', room =>{
    report(`received joined with  ${room}`);
    isChannelReady = true;
  });

  socket.on('log', array => {
    report(`received log with ...`);
    console.log.apply(console, array);
  });

  socket.on('allInqs', inq => {
    console.dir(inq);
  });
  ////////////////////////////////////////////////

  function sendMessage(message) {
    if(message.type){
      console.log(' sending message: ', message.type);
    }else{
      console.log(' sending message: ', message);
    }
    socket.emit('message', message);
  }

  // This client receives a message
  socket.on('message', function(message) {
    console.log('received message with', message.type);
    if (message === 'got user media') {
      maybeStart();
    } else if (message.type === 'offer') {
      if (!isInitiator && !isStarted) {
        maybeStart();
      }
      pc.setRemoteDescription(new RTCSessionDescription(message));
      doAnswer();
    } else if (message.type === 'answer' && isStarted) {
      pc.setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === 'candidate' && isStarted) {
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate
      });
      pc.addIceCandidate(candidate);
    } else if (message === 'bye' && isStarted) {
      handleRemoteHangup();
    }
  });


  var constraints = {
    video: true
  };

  // console.log('Getting user media with constraints');

  // if (location.hostname !== 'localhost') {
  //   requestTurn(
  //     'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
  //   );
  // }

  function maybeStart() {

    console.log(`maybeStart() isStarted is ${isStarted} isChannelReady is ${isChannelReady}` );
    if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
      console.log(' maybeStart() creating peer connection');
      createPeerConnection();
      pc.addStream(localStream);
      isStarted = true;
      console.log('isInitiator', isInitiator);
      if (isInitiator) {
        doOffer();
      }
    }
  }

  window.onbeforeunload = function() {
    sendMessage('bye');
  };

  /////////////////////////////////////////////////////////

  function createPeerConnection() {
    try {
      pc = new RTCPeerConnection(null);
      pc.onicecandidate = handleIceCandidate;
      pc.onaddstream = handleRemoteStreamAdded;
      pc.onremovestream = handleRemoteStreamRemoved;
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
      sendMessage({
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
    console.log('Remote stream added.');
    remoteVideo.src = window.URL.createObjectURL(event.stream);
    remoteStream = event.stream;
  }

  function handleCreateOfferError(event) {
    console.log('createOffer() error: ', event);
  }

  function doOffer() {
    console.log('Sending offer to peer');
    pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
  }

  function doAnswer() {
    console.log('Sending answer to peer.');
    pc.createAnswer().then(
      setLocalAndSendMessage,
      onCreateSessionDescriptionError
    );
  }

  function setLocalAndSendMessage(sessionDescription) {
    // Set Opus as the preferred codec in SDP if Opus is present.
    //  sessionDescription.sdp = preferOpus(sessionDescription.sdp);
    pc.setLocalDescription(sessionDescription);
    console.log('setLocalAndSendMessage sending message', sessionDescription.type);
    sendMessage(sessionDescription);
  }

  function onCreateSessionDescriptionError(error) {
    trace('Failed to create session description: ' + error.toString());
  }

  function requestTurn(turnURL) {
    var turnExists = false;
    for (var i in pcConfig.iceServers) {
      if (pcConfig.iceServers[i].url.substr(0, 5) === 'turn:') {
        turnExists = true;
        turnReady = true;
        break;
      }
    }
    if (!turnExists) {
      console.log('Getting TURN server from ', turnURL);
      // No TURN server. Get one from computeengineondemand.appspot.com:
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var turnServer = JSON.parse(xhr.responseText);
          console.log('Got TURN server: ', turnServer);
          pcConfig.iceServers.push({
            'url': 'turn:' + turnServer.username + '@' + turnServer.turn,
            'credential': turnServer.password
          });
          turnReady = true;
        }
      };
      xhr.open('GET', turnURL, true);
      xhr.send();
    }
  }

  function handleRemoteStreamAdded(event) {
  console.log('*************REMOTE STREAM EVENT.');
    remoteVideo.src = window.URL.createObjectURL(event.stream);
    remoteStream = event.stream;
  }

  function handleRemoteStreamRemoved(event) {
    console.log('Remote stream removed. Event: ', event);
  }

  function hangup() {
    console.log('Hanging up.');
    stop();
    sendMessage('bye');
  }

  function handleRemoteHangup() {
    console.log('Session terminated.');
    stop();
    isInitiator = false;
  }

  function stop() {
    isStarted = false;
    // isAudioMuted = false;
    // isVideoMuted = false;
    pc.close();
    pc = null;
  }

  ///////////////////////////////////////////

  // Set Opus as the default audio codec if it's present.
  function preferOpus(sdp) {
    var sdpLines = sdp.split('\r\n');
    var mLineIndex;
    // Search for m line.
    for (var i = 0; i < sdpLines.length; i++) {
      if (sdpLines[i].search('m=audio') !== -1) {
        mLineIndex = i;
        break;
      }
    }
    if (mLineIndex === null) {
      return sdp;
    }

    // If Opus is available, set it as the default in m line.
    for (i = 0; i < sdpLines.length; i++) {
      if (sdpLines[i].search('opus/48000') !== -1) {
        var opusPayload = extractSdp(sdpLines[i], /:(\d+) opus\/48000/i);
        if (opusPayload) {
          sdpLines[mLineIndex] = setDefaultCodec(sdpLines[mLineIndex],
            opusPayload);
        }
        break;
      }
    }

    // Remove CN in m line and sdp.
    sdpLines = removeCN(sdpLines, mLineIndex);

    sdp = sdpLines.join('\r\n');
    return sdp;
  }

  function extractSdp(sdpLine, pattern) {
    var result = sdpLine.match(pattern);
    return result && result.length === 2 ? result[1] : null;
  }

  // Set the selected codec to the first in m line.
  function setDefaultCodec(mLine, payload) {
    var elements = mLine.split(' ');
    var newLine = [];
    var index = 0;
    for (var i = 0; i < elements.length; i++) {
      if (index === 3) { // Format of media starts from the fourth.
        newLine[index++] = payload; // Put target payload to the first.
      }
      if (elements[i] !== payload) {
        newLine[index++] = elements[i];
      }
    }
    return newLine.join(' ');
  }

  // Strip CN from sdp before CN constraints is ready.
  function removeCN(sdpLines, mLineIndex) {
    var mLineElements = sdpLines[mLineIndex].split(' ');
    // Scan from end for the convenience of removing an item.
    for (var i = sdpLines.length - 1; i >= 0; i--) {
      var payload = extractSdp(sdpLines[i], /a=rtpmap:(\d+) CN\/\d+/i);
      if (payload) {
        var cnPos = mLineElements.indexOf(payload);
        if (cnPos !== -1) {
          // Remove CN payload from m line.
          mLineElements.splice(cnPos, 1);
        }
        // Remove CN line in sdp
        sdpLines.splice(i, 1);
      }
    }

    sdpLines[mLineIndex] = mLineElements.join(' ');
    return sdpLines;
  }

  ////////////////////////////////////////////////////////
} ///END expertController
