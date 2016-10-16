//////////////////////////////////////////
  var localPeer, remotePeer, startTime, localStream;
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

    remotePeer = new RTCPeerConnection(servers);
     remotePeer.onicecandidate = e => onIceCandidate(remotePeer, e);
     remotePeer.oniceconnectionstatechange = e => onIceStateChange(remotePeer, e);
     remotePeer.onaddstream = e => remoteVideo.srcObject = e.stream;

    localPeer = new RTCPeerConnection(servers);
    localPeer.onicecandidate = (e) => onIceCandidate(localPeer, e);
    localPeer.oniceconnectionstatechange = (e) => onIceStateChange(localPeer, e);
    localPeer.addStream(localStream);
    localPeer.createOffer(offerOptions)
    .then(
      onCreateOfferSuccess,
      onSdpError
    );
  }

  function onCreateOfferSuccess(desc) {
    localPeer.setLocalDescription(desc)
    .then( ()=> trace( `${getName(localPeer)}  setLocal complete`), onSdpError);
    remotePeer.setRemoteDescription(desc)
    .then( () => trace( `${getName(remotePeer)}  setRemote complete`), onSdpError);

    remotePeer.createAnswer()
    .then( onCreateAnswerSuccess, onSdpError);
  }

  function onCreateAnswerSuccess(desc) {
    localPeer.setRemoteDescription(desc)
    .then( () => trace(`${getName(localPeer)}  setRemote complete`), onSdpError);
    remotePeer.setLocalDescription(desc)
    .then(() => trace(`${getName(remotePeer)}  setLocal complete`), onSdpError);
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
  var  getName = pc =>  (pc === localPeer) ? 'localPeer' : 'remotePeer';
  var  getOtherPc = pc => (pc === localPeer) ? remotePeer : localPeer;
  var  onIceStateChange = (pc, event) => {
    if(pc){trace(getName(pc) + ' ' + pc.iceConnectionState );}
  }

  var hangup = () => {
  try{
      localPeer.close();  remotePeer.close();  localPeer = null;  remotePeer = null;
    }catch(err){ }
  }

  var trace = (text) => {
    // $scope.message = text;
    console.log((window.performance.now() / 1000).toFixed(3) + ': ' + text);
  }
//////////////////////////////////////////
