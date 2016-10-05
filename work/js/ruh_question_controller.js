'use strict';

angular.module("SessionApp")
  .controller('qController', questionController);

function questionController(){
  var main = this;
  main.message = "RU Stuck?";

  main.data = JSON.parse(window.localStorage.getItem('data')) || {};
   console.log(main.data);
  if(main.data.constructor === Object){
    console.log("initializing main.data with stubs");
    window.localStorage.setItem('data', JSON.stringify(stub));
  }

  main.addQuestion = function(){
    main.data.questions.push({
      "group":"temp",       // derived from userId
      "status":"temp",      // derived programatically
      "time": "temp",       // derived proframatically
      "subject":"temp",     // GET DROP CHOICE WORKING
      "subarea":"temp",     // GET DROP CHOICE WORKING
      "user":"temp",        // derived proframatically
      "expert":"temp",      // assigned or choosen
        // "group":main.group,     // derived from userId
        // "status":main.status,   // derived programatically
        // "time": main.time,      // derived proframatically
        // "subject":main.subject, // GET DROP CHOICE WORKING
        // "subarea":main.subarea, // GET DROP CHOICE WORKING
        // "user":main.user,          // derived proframatically
        // "expert":main.expert,      // assigned or choosen
        "question":main.question
    });


    var storeQuestions = angular.copy(main.data.questions);
    storeQuestions.forEach(function(q){
      delete q.$$hashKey;
    });
    main.data.questions = storeQuestions;
    window.localStorage.setItem('data', JSON.stringify(main.data));

    $('#myModal').modal('hide'); // trigger the modal
    console.log(  JSON.parse(window.localStorage.getItem('data')) );
  } //END addQuestion


} //END mainController
