'use strict';

angular.module("RuhApp")
  .controller('RuhQuestionController', questionController);

questionController.$inject = ['RuhQuestionFactory'];


function questionController(RuhQuestionFactory){
  var qMain = this;
  qMain.message = "You are a click (more or less) away from expert help";

  qMain.addQuestion = function(){
    RuhQuestionFactory.addQuestion(qMain.question);
    $('#myModal').modal('hide'); // trigger the modal
  }


} //END qMainController
