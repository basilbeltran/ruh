// var pcConfig = {
//   'iceServers': [{
//     'url': 'stun:stun.l.google.com:19302'
//   }]
// };
//
// var sdpConstraints = {
//   'mandatory': {
//     'OfferToReceiveAudio': true,
//     'OfferToReceiveVideo': true
//   }
// };


randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

var trace = (text) => {
  // $scope.message = text;
  console.log((window.performance.now() / 1000).toFixed(3) + ': ' + text);
}



/////// ////// ////// ///// WEBRTC //////////

function sendMessage(ctrl, message) {
  if(message.type){
    console.log(` ${ctrl.token} sending message: ` + message.type);
  }else{
    console.log(` ${ctrl.token} sending message: ` + message);
  }
  ctrl.socket.emit('message', message);
}

// function processSocketEvent(ctlr, eventName, obj){
//   switch (eventName) {
//       case "created":
//           console.log(`IO received created with room ${obj}`);
//           ctlr.isInitiator = true;
//           break;
//       case "n":
//           //code block
//           break;
//       default:
//         console.log(`IO `);
//   }
// }


///////////////////////// Turn ///////////////////////////////
// if (location.hostname !== 'localhost') {
//   requestTurn(questionThis,
//     'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
//   );
// }

function requestTurn(ctrl, turnURL) {
    console.log('************ request Turn');
  var turnExists = false;
  for (var i in pcConfig.iceServers) {
    if (pcConfig.iceServers[i].url.substr(0, 5) === 'turn:') {
      turnExists = true;
      ctrl.turnReady = true;
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
        ctrl.turnReady = true;
      }
    };
    xhr.open('GET', turnURL, true);
    xhr.send();
  }
}



//////////////////////////// less important stuff ...
function stop(ctrl) {
        console.log('************ STOP');
  isStarted = false;
  // isAudioMuted = false;
  // isVideoMuted = false;
  ctrl.peer.close();
  ctrl.peer = null;
}


// Set Opus as the default audio codec if it's present.
function preferOpus(sdp) {
console.log('************ preferOpus');
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
  console.log('************ extractSdp');
  var result = sdpLine.match(pattern);
  return result && result.length === 2 ? result[1] : null;
}


// Set the selected codec to the first in m line.
function setDefaultCodec(mLine, payload) {
console.log('************ setDefaultCodec');
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
console.log('************ removeCN');
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
