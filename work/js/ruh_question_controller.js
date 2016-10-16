'use strict';

angular.module("RuhApp")
  .controller('RuhQuestionController', questionController);

questionController.$inject = ['RuhQuestionFactory'];


function questionController(RuhQuestionFactory){
  var questionThis = this;

  questionThis.selectedCat;
  questionThis.message = "You are one click (more or less) away from expert help";
  questionThis.data = RuhQuestionFactory.getData();


//TODO camera light comes on but no video if tag is inside ng-view
// it looks like angular + webRTC integration will not be simple
// MOVED VIDEO TAG OUTSIDE controller
///////////////////////////////////////////////////////////////////////////////////

var mediaConstraints = { audio: false, video: true };
var offerOptions = { offerToReceiveAudio: 1, offerToReceiveVideo: 1 };
var localVideo = document.getElementById('localVideo')
var remoteVideo = document.getElementById('remoteVideo');

questionThis.addQuestion = function(){
// put the question fields in the "database"
    RuhQuestionFactory.addQuestion(questionThis);
    trace(questionThis.selectedCat.subjectName );

//obtain localMedia stream
    navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then(  (stream) => {
      questionThis.data.localStream = stream;         //////localStream
      localVideo.src = window.URL.createObjectURL(stream);
    })
    .catch( (e) => trace(`GUM error: ${e}`) );
} // addQuestion


questionThis.makeOffer = function(){
    var servers = null;

     questionThis.data.remotePeer = new RTCPeerConnection(servers);
     questionThis.data.remotePeer.onicecandidate = e => onIceCandidate(remotePeer, e);
     questionThis.data.remotePeer.oniceconnectionstatechange = e => onIceStateChange(remotePeer, e);
     /////////////////////////////////////////////////////
     questionThis.data.remotePeer.onaddstream = e => remoteVideo.srcObject = e.stream;
     /////////////////////////////////////////////////////

    questionThis.data.localPeer = new RTCPeerConnection(servers);
    questionThis.data.localPeer.onicecandidate = e => onIceCandidate(questionThis.data.localPeer, e);
    questionThis.data.localPeer.oniceconnectionstatechange = e => onIceStateChange(questionThis.data.localPeer, e);
    questionThis.data.localPeer.addStream(questionThis.data.localStream);        //////add localStream to localPeer
    questionThis.data.localPeer.createOffer(offerOptions)
    .then(
      onCreateOfferSuccess,
      onSdpError
    );
  } //makeOffer

  function onIceCandidate(pc, event) {  /// if pc is data.localPeer this adds event.candidate to remote
      if (event.candidate) {
        var candidate = new RTCIceCandidate(event.candidate);
        getOtherPc(pc).addIceCandidate(candidate)
        .then( (pc) => trace(` ${getName(pc)}  added ICE Candidate`),
          (pc, err) => trace(` ${getName(pc)}  add Candidate err: ${error.toString()} `)
        );
        console.log(event.candidate);
      }
  } //onIceCandidate


  function onCreateOfferSuccess(desc) {
    questionThis.data.localPeer.setLocalDescription(desc)
    .then( ()=> trace( `${getName(questionThis.data.localPeer)}  setLocal complete`), onSdpError);
    questionThis.data.remotePeer.setRemoteDescription(desc)
    .then( () => trace( `${getName(questionThis.data.remotePeer)}  setRemote complete`), onSdpError);

  // THIS IS ARTIFICIALLY TRIGGERED IN TEST
    questionThis.data.remotePeer.createAnswer()
    .then( onCreateAnswerSuccess, onSdpError);  /// call onCreateAnswerSuccess
  }

  function onCreateAnswerSuccess(desc) {
    questionThis.data.localPeer.setRemoteDescription(desc)
    .then( () => trace(`${getName(questionThis.data.localPeer)}  setRemote complete`), onSdpError);
    questionThis.data.remotePeer.setLocalDescription(desc)
    .then(() => trace(`${getName(questionThis.data.remotePeer)}  setLocal complete`), onSdpError);
  }

  var  onIceStateChange = (pc, event) => {
    if(pc){trace(getName(pc) + ' ' + pc.iceConnectionState );}
  }


  var  onSdpError = (error) => trace('SDP error: ' + error.toString());
  var  getName = pc =>  (pc === questionThis.data.localPeer) ? 'questionThis.data.localPeer' : 'questionThis.data.remotePeer';
  var  getOtherPc = pc => (pc === questionThis.data.localPeer) ? questionThis.data.remotePeer : questionThis.data.localPeer;

  var hangup = () => {
  try{
      questionThis.data.localPeer.close();  questionThis.data.remotePeer.close();  questionThis.data.localPeer = null;  questionThis.data.remotePeer = null;
    }catch(err){ }
  }



} //END qMainController
