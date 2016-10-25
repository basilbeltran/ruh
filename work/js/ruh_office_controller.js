'use strict';

angular.module("RuhApp")
  .controller('RuhOfficeController', officeController);
officeController.$inject = ['RuhQuestionFactory', '$scope'];


//function expertController($scope, RuhQuestionFactory){
function officeController(RuhQuestionFactory, $scope){
  var officeThis = this;

    console.log(RuhQuestionFactory.current);

  var textIn = document.querySelector('textarea#textIn');
  var textOut = document.querySelector('textarea#textOut');

  // These are assigned to questionThis so butils.js can hold shared code
  officeThis.token = "officeController";
  officeThis.sendBtn = "Send";



if(  RuhQuestionFactory.current.dataChannel ) {
      RuhQuestionFactory.current.peer.ondatachannel = receiveChannelCallback;
      console.log('declaring receiveChannelCallback  ');
}
else {
      console.log('creating DataChannel ');
      RuhQuestionFactory.current.dataChannel = RuhQuestionFactory.current.peer.createDataChannel('dataChannel');
      RuhQuestionFactory.current.dataChannel.onmessage = onMessage;
      RuhQuestionFactory.current.dataChannel.onopen = function(event) {
        RuhQuestionFactory.current.dataChannel.send('dataChannel is open');
      }
}

officeThis.sendText = function() {
    var data = textIn.value;
    RuhQuestionFactory.current.dataChannel.send(data);
    console.log('Sent Data: ' + data);
  }

  function onMessage(event) {
    console.log('Received Message');
    textOut.value = event.data;
  }

  function receiveChannelCallback(event) {
        console.log('receiveChannelCallback assigning dataChannel');
      RuhQuestionFactory.current.dataChannel = event.channel;
      RuhQuestionFactory.current.dataChannel.onmessage = onMessage;
      RuhQuestionFactory.current.dataChannel.onopen = function(event) {
        RuhQuestionFactory.current.dataChannel.send('dataChannel is open');
      }
      // receiveChannel.onmessage = handleReceiveMessage;
      // receiveChannel.onopen = handleReceiveChannelStatusChange;
      // receiveChannel.onclose = handleReceiveChannelStatusChange;
    }

  ////////////////////  BUTTON LISTENERS  ////////////////////////////

  officeThis.beginRecording = function(){
  } ///////////////// beginRecording

  officeThis.endRecording = function(){
  } ///////////////// endRecording



//////// SOCKET LISTENERS   ////////////////////////////////////////////////////////
  // officeThis.socket.on('blah', room => {     ////////////////////////  CREATED
  //   console.log(`IO received blah with room ${room}`);
  //
  // });



  ////////////////////////////////////////////////////////
} //END officeController
