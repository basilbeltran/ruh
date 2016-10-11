'use strict';

angular.module("RuhApp")
  .controller('RuhQuestionController', questionController);

questionController.$inject = ['RuhQuestionFactory'];


function questionController(RuhQuestionFactory){
  var questionThis = this;
  questionThis.message = "You are a click (more or less) away from expert help";

  questionThis.data = RuhQuestionFactory.getData();

  questionThis.addQuestion = function(){
    RuhQuestionFactory.addQuestion(questionThis);
    $('#myModal').modal('hide'); // trigger the modal
  }


} //END qMainController
