//////////////////////////////////////////
  var pc1, pc2, startTime, localStream;
  //var localVideo = document.getElementById("myView").getElementsByClassName("localVideo")[0];
  var localVideo = document.getElementById('localVideo')
  var remoteVideo = document.getElementById('remoteVideo');
  // var mediaConstraints = { audio: false, video: true };
  // var offerOptions = { offerToReceiveAudio: 1, offerToReceiveVideo: 1 };

  //$scope.start = function() {
  // function start() {
  //   navigator.mediaDevices.getUserMedia(mediaConstraints)
  //   .then(  (stream) => localVideo.src = window.URL.createObjectURL(stream))
  //   .catch( (e) => console.log(`GUM error: ${e}`) );
  // }


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
