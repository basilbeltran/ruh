'use strict';

angular.module("RuhApp")
  .controller('RuhQuestionController', questionController);

questionController.$inject = ['RuhUserFactory'];

function questionController(RuhUserFactory){
  var qMain = this;


  qMain.message = "You are a click (more or less) away from expert help";

  qMain.data = JSON.parse(window.localStorage.getItem('data')) || {};
   console.log(qMain.data);
  if(qMain.data.constructor === Object){
    console.log("initializing qMain.data with stubs");
    window.localStorage.setItem('data', JSON.stringify(stub));
    console.log(qMain.data);
  }

  qMain.addQuestion = function(){
    qMain.data.questions.push({
      "group":"temp",       // derived from userId
      "status":"temp",      // derived programatically
      "time": "temp",       // derived proframatically
      "subject":"temp",     // GET DROP CHOICE WORKING
      "subarea":"temp",     // GET DROP CHOICE WORKING
      "user":"temp",        // derived proframatically
      "expert":"temp",      // assigned or choosen
        // "group":qMain.group,     // derived from userId
        // "status":qMain.status,   // derived programatically
        // "time": qMain.time,      // derived proframatically
        // "subject":qMain.subject, // GET DROP CHOICE WORKING
        // "subarea":qMain.subarea, // GET DROP CHOICE WORKING
        // "user":qMain.user,          // derived proframatically
        // "expert":qMain.expert,      // assigned or choosen
        "question":qMain.question
    });


    var storeQuestions = angular.copy(qMain.data.questions);
    storeQuestions.forEach(function(q){
      delete q.$$hashKey;
    });
    qMain.data.questions = storeQuestions;
    window.localStorage.setItem('data', JSON.stringify(qMain.data));

    $('#myModal').modal('hide'); // trigger the modal
    console.log(  JSON.parse(window.localStorage.getItem('data')) );
  } //END addQuestion


} //END qMainController
