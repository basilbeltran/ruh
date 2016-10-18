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
var remotePeer, localPeer;
var questionObj; //send the factory fields, get object back


questionThis.addQuestion = function(){
// put the question fields in the "database"
    questionObj = RuhQuestionFactory.addQuestion(questionThis);
    console.dir(questionObj);

//send the question to the server
    socket.emit('question', questionObj);


//obtain localMedia stream
    navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then((stream) => {
      questionThis.data.localStream = stream;         //////localStream
      localVideo.src = window.URL.createObjectURL(stream);
    })
    .catch( (e) => console.log(`GUM error: ${e}`) );
} // addQuestion



//an indication the server has processed question
  socket.on('asked', function(inqsObj) {
  console.log(`#> ${inqsObj.id} registered ${inqsObj.question.qUUID}` );
});


//a question has been asked (should be filtered)
  socket.on('allInqs', function(allInqs) {
  console.dir(`#> new questions: ` + allInqs );
});


//TODO finish this
// an expert has connected to a question
  socket.on('joined', function(room) {
    //give a learner the option to listen in
  });





questionThis.makeOffer = function(){
    var servers = null;

         remotePeer = new RTCPeerConnection(servers);
         remotePeer.onicecandidate = e => onIceCandidate(remotePeer, e);
         remotePeer.oniceconnectionstatechange = e => onIceStateChange(remotePeer, e);
         /////////////////////////////////////////////////////
         remotePeer.onaddstream = e => remoteVideo.srcObject = e.stream;
         /////////////////////////////////////////////////////

    localPeer = new RTCPeerConnection(servers);
    localPeer.onicecandidate = e => onIceCandidate(localPeer, e);
    localPeer.oniceconnectionstatechange = e => onIceStateChange(localPeer, e);
    localPeer.addStream(questionThis.data.localStream);        //////add localStream to localPeer
    localPeer.createOffer(offerOptions)
    .then(
      onCreateOfferSuccess,
      onSdpError
    );
  } //makeOffer


  function onCreateOfferSuccess(desc) {
    localPeer.setLocalDescription(desc)  // calls onIceCandidate
    .then( ()=> console.log( `${getName(localPeer)} setLocal `), onSdpError);
    remotePeer.setRemoteDescription(desc)
    .then( () => console.log( `${getName(remotePeer)} setRemote `), onSdpError);

  //THIS IS ARTIFICIALLY TRIGGERED IN TEST
    remotePeer.createAnswer()
    .then( onCreateAnswerSuccess, onSdpError);  /// call onCreateAnswerSuccess
  }

  function onCreateAnswerSuccess(desc) {
    localPeer.setRemoteDescription(desc)
    .then( () => console.log(`${getName(localPeer)} setRemote `), onSdpError);
    remotePeer.setLocalDescription(desc)
    .then(() => console.log(`${getName(remotePeer)} setLocal `), onSdpError);
  }

  function onIceCandidate(pc, event) {  /// if pc is data.localPeer this adds event.candidate to remote
      if (event.candidate) {
        var candidate = new RTCIceCandidate(event.candidate);
        getOtherPc(pc).addIceCandidate(candidate)
        .then( (pc) => console.log(` ${getName(pc)}  added Candidate`),
               (pc) => console.log(` ${getName(pc)}  add Candidate err`)
        );
        console.log(event.candidate.sdpMid);
      }
  } //onIceCandidate

  var  onIceStateChange = (pc, event) => {
    if(pc){console.log(getName(pc) + ' ' + pc.iceConnectionState );}
  }

  var  onSdpError = (error) => console.log('SDP error: ' + error.toString());
  var  getName = pc =>  (pc === localPeer) ? 'localPeer' : 'remotePeer';
  var  getOtherPc = pc => (pc === localPeer) ? remotePeer : localPeer;

  var hangup = () => {
  try{
      localPeer.close();  remotePeer.close();  localPeer = null;  remotePeer = null;
    }catch(err){ }
  }



} //END qMainController
