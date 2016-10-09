'use strict';

var lc, rc, startTime, localStream;
var localVideo = document.getElementById('localVideo');
var remoteVideo = document.getElementById('remoteVideo');
var mediaConstraints = { audio: false, video: true };
var offerOptions = { offerToReceiveAudio: 1, offerToReceiveVideo: 1 };

function start() {
  navigator.mediaDevices.getUserMedia(mediaConstraints)
  .then(  (stream) => localVideo.srcObject = localStream = stream)
  .catch( (e) => trace(`GUM error: ${e.name}`) );
}

function makeOffer() {
  var servers = null;

  rc = new RTCPeerConnection(servers);
   rc.onicecandidate = (ev) => onIceCandidate(rc, ev);
   rc.oniceconnectionstatechange = (ev) => onIceStateChange(rc, ev);
   rc.onaddstream = e => remoteVideo.srcObject = e.stream;

  lc = new RTCPeerConnection(servers);
   lc.onicecandidate = (e) => onIceCandidate(lc, e);
   lc.oniceconnectionstatechange = (ev) => onIceStateChange(lc, ev);
  lc.addStream(localStream);
  lc.createOffer(offerOptions)
  .then(
    onCreateOfferSuccess,
    onSdpError
  );
}

function onCreateOfferSuccess(desc) {
  lc.setLocalDescription(desc)
  .then( ()=> trace( `${getName(lc)}  setLocal complete`), onSdpError);
  rc.setRemoteDescription(desc)
  .then( () => trace( `${getName(rc)}  setRemote complete`), onSdpError);

  rc.createAnswer()
  .then( onCreateAnswerSuccess, onSdpError);
}

function onCreateAnswerSuccess(desc) {
  lc.setRemoteDescription(desc)
  .then( () => trace(`${getName(lc)}  setRemote complete`), onSdpError);
  rc.setLocalDescription(desc)
  .then(() => trace(`${getName(rc)}  setLocal complete`), onSdpError);
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
var  getName = pc =>  (pc === lc) ? 'lc' : 'rc';
var  getOtherPc = pc => (pc === lc) ? rc : lc;
var  onIceStateChange = (pc, event) => {
  if(pc){trace(getName(pc) + ' ' + pc.iceConnectionState );}
}

var hangup = () => {
try{
    lc.close();  rc.close();  lc = null;  rc = null;
  }catch(err){ }
}

var trace = (text) => {
  console.log((window.performance.now() / 1000).toFixed(3) + ': ' + text);
}
