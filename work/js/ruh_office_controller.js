'use strict';

angular.module("RuhApp")
  .controller('RuhOfficeController', officeController);
officeController.$inject = ['RuhQuestionFactory', '$scope'];


//function expertController($scope, RuhQuestionFactory){
function officeController(RuhQuestionFactory, $scope){
  var officeThis = this;
  // These are assigned to questionThis so butils.js can hold shared code
  officeThis.token = "officeController";
  officeThis.socket = io.connect();



////////////////// answerQuestion  ng-click

  officeThis.beginRecording = function(){

  } ///////////////// beginRecording

  officeThis.endRecording = function(){

  } ///////////////// endRecording




  officeThis.socket.on('blah', room => {     ////////////////////////  CREATED
    console.log(`IO received blah with room ${room}`);

  });



  ////////////////////////////////////////////////////////
} //END officeController
