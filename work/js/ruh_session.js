'use strict';

angular.module("SessionApp", []);
angular.module("SessionApp").controller('qController', questionController);

function questionController(){
  var main = this;
  main.message = "RU Stuck?";

  main.questions = [
    { "group":"sept-2016",
      "status":"yellow",
      "time": 0,
      "subject": "javascript",
      "subarea": "functions",
      "user":"basil.beltran@tinkermill.org",
      "expert":"basil.beltran@tinkermill.org",
      "texts":["1", "ok thats fine", "letter A"],
      "question":"How do you decide where to merge the data for a composite view element like this? It must happen above angular because it needs to use ng-repeat. Since mongo is a document db I will proceed on the assumption that it all goes into one big document. But that is silly. User info is certainly in its own table. Right?"
    },
    { "group":"sept-2016",
      "status":"red",
      "time": 600,
      "subject": "dev-ops",
      "subarea": "bash",
      "user":"basil.beltran@tinkermill.org",
      "expert":"basil.beltran@tinkermill.org",
      "texts":["2", "Im a moron", "letter B"],
      "question":"how do I migrate from cloud9 to a local dev environment"
    },
    { "group":"sept-2016",
      "status":"orange",
      "time": 240,
      "subject": "css",
      "subarea": "bootstrap",
      "user":"basil.beltran@tinkermill.org",
      "expert":"basil.beltran@tinkermill.org",
      "texts":["3", "no way", "letter C"],
      "question":"How many turtles are there?"
    }
  ] // end $scope.questions



  main.addQuestion = function(){
    main.questions.push({
      "group":"",     // derived from userId
      "status":"",   // derived programatically
      "time": "",      // derived proframatically
      "subject":"", // GET DROP CHOICE WORKING
      "subarea":"", // GET DROP CHOICE WORKING
      "user":"",          // derived proframatically
      "expert":"",      // assigned or choosen
        // "group":main.group,     // derived from userId
        // "status":main.status,   // derived programatically
        // "time": main.time,      // derived proframatically
        // "subject":main.subject, // GET DROP CHOICE WORKING
        // "subarea":main.subarea, // GET DROP CHOICE WORKING
        // "user":main.user,          // derived proframatically
        // "expert":main.expert,      // assigned or choosen
        "question":main.question
    });
  }

  main.categories = [
    {"subjectName": "JAVASCRIPT",
      "subAreas":["functions", "prototype", "scope", "this", "iteration", "modules"]
    },
    {"subjectName": "CSS",
      "subAreas":["selectors", "bootstrap"]
    },
    {"subjectName": "DEVOPS",
      "subAreas":["git", "bash", "c9"]
    },
    {"subjectName": "ANGULAR",
      "subAreas":["directives", "controller", "factory"]
    },
    {"subjectName": "MONGO",
      "subAreas":["mongoose", "sharding"]
    },
    {"subjectName": "NODE",
      "subAreas":["npm", "grunt"]
    }
  ] // end categories

  main.groups = [
    {"groupName": "sept-2016",
      "members":["basil", "JeffM", "JeffB", "Chris", "JustinD", "Justin"]
    },
    {"groupName": "aug-2016",
      "members":["Dylan", "Tim", "John"]
    }
  ] // end groups


} //mainController


//////////////////////////////////////////
  var pc1, pc2, startTime, localStream;
  var localVideo = document.getElementById('localVideo');
  var remoteVideo = document.getElementById('remoteVideo');
  var mediaConstraints = { audio: false, video: true };
  var offerOptions = { offerToReceiveAudio: 1, offerToReceiveVideo: 1 };

  //$scope.start = function() {
  function start() {
    navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then(  (stream) => localVideo.srcObject = localStream = stream)
    .catch( (e) => trace(`GUM error: ${e.name}`) );
  }

  function makeOffer() {
    var servers = null;

    pc2 = new RTCPeerConnection(servers);
     pc2.onicecandidate = (e) => onIceCandidate(pc2, e);
     pc2.oniceconnectionstatechange = (e) => onIceStateChange(pc2, e);
     pc2.onaddstream = e => remoteVideo.srcObject = e.stream;

    pc1 = new RTCPeerConnection(servers);
     pc1.onicecandidate = (e) => onIceCandidate(pc1, e);
     pc1.oniceconnectionstatechange = (e) => onIceStateChange(pc1, e);
    pc1.addStream(localStream);
    pc1.createOffer(offerOptions)
    .then(
      onCreateOfferSuccess,
      onSdpError
    );
  }

  function onCreateOfferSuccess(desc) {
    pc1.setLocalDescription(desc)
    .then( ()=> trace( `${getName(pc1)}  setLocal complete`), onSdpError);
    pc2.setRemoteDescription(desc)
    .then( () => trace( `${getName(pc2)}  setRemote complete`), onSdpError);

    pc2.createAnswer()
    .then( onCreateAnswerSuccess, onSdpError);
  }

  function onCreateAnswerSuccess(desc) {
    pc1.setRemoteDescription(desc)
    .then( () => trace(`${getName(pc1)}  setRemote complete`), onSdpError);
    pc2.setLocalDescription(desc)
    .then(() => trace(`${getName(pc2)}  setLocal complete`), onSdpError);
  }

  function onIceCandidate(pc, event) {
    if (event.candidate) {
      var candidate = new RTCIceCandidate(event.candidate);
      getOtherPc(pc).addIceCandidate(candidate)
      .then( (pc) => trace(` ${getName(pc)}  added ICE Candidate`),
        (pc, err) => trace(` ${getName(pc)}  add Candidate err: ${error.toString()} `)
      );
      //console.log(event.candidate);
    }
  }

  var  onSdpError = (error) => trace('SDP error: ' + error.toString());
  var  getName = pc =>  (pc === pc1) ? 'pc1' : 'pc2';
  var  getOtherPc = pc => (pc === pc1) ? pc2 : pc1;
  var  onIceStateChange = (pc, event) => {
    if(pc){trace(getName(pc) + ' ' + pc.iceConnectionState );}
  }

  var hangup = () => {
  try{
      pc1.close();  pc2.close();  pc1 = null;  pc2 = null;
    }catch(err){ }
  }

  var trace = (text) => {
    // $scope.message = text;
    console.log((window.performance.now() / 1000).toFixed(3) + ': ' + text);
  }
//////////////////////////////////////////
