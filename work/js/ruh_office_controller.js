'use strict';

angular.module("RuhApp")
  .controller('RuhOfficeController', officeController);
officeController.$inject = ['RuhQuestionFactory', '$scope'];


//function expertController($scope, RuhQuestionFactory){
function officeController(RuhQuestionFactory, $scope){
  var officeThis = this;
  officeThis.data = RuhQuestionFactory.getData();

  var dataChannelSend = document.querySelector('textarea#textIn');
  var dataChannelReceive = document.querySelector('textarea#textOut');

  // These are assigned to questionThis so butils.js can hold shared code
  officeThis.token = "officeController";
  officeThis.socket = io.connect();

  officeThis.takePhoto = "takePhoto";

  officeThis.startBtn = "Start";
  officeThis.sendBtn = "Send";
  officeThis.closeBtn = "Close";


  function enableStartButton() {
    officeThis.startButton.disabled = false;
  }

  function disableSendButton() {
    officeThis.sendButton.disabled = true;
  }


  officeThis.beginRecording = function(){

  } ///////////////// beginRecording

  officeThis.endRecording = function(){

  } ///////////////// endRecording




  officeThis.socket.on('blah', room => {     ////////////////////////  CREATED
    console.log(`IO received blah with room ${room}`);

  });



  ////////////////////////////////////////////////////////
} //END officeController
