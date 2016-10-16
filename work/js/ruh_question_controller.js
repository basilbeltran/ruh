'use strict';

angular.module("RuhApp")
  .controller('RuhQuestionController', questionController);

questionController.$inject = ['RuhQuestionFactory'];


function questionController(RuhQuestionFactory){
  var questionThis = this;
  var mediaConstraints = { audio: false, video: true };
  var offerOptions = { offerToReceiveAudio: 1, offerToReceiveVideo: 1 };


  questionThis.message = "You are one click (more or less) away from expert help";
  questionThis.data = RuhQuestionFactory.getData();







  var localVideo = document.getElementById('localVideo')
  var remoteVideo = document.getElementById('remoteVideo');

//TODO camera light comes on but no video.
// it looks like angular + webRTC integration will not be simple

questionThis.addQuestion = function(){
    RuhQuestionFactory.addQuestion(questionThis);

    navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then(  (stream) => {
      var temp = window.URL.createObjectURL(stream);
      questionThis.localSource = temp;
      localVideo.src = temp;

      console.dir(navigator );
      console.dir(stream );
      console.dir(questionThis.localSource);
    })
    .catch( (e) => console.log(`GUM error: ${e}`) );
  }



} //END qMainController
