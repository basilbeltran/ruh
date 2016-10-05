'use strict';

angular.module("SessionApp")
  .controller('qController', questionController);

function questionController(){
  var main = this;
  main.message = "RU Stuck?";

  // main.questions =  stub.questions;
  // main.categories =stub.categories;
  // main.groups =  stub.groups;
  // main.qStatus =  stub.qStatus;


  main.data = JSON.parse(window.localStorage.getItem('data')) || [];

  console.log(main.data);

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


// var storeQuestions = angular.copy(main.questions);
// storeQuestions.forEach(function(q){
//   delete q.$$hashKey;
// });

//window.localStorage.setItem('questions', JSON.stringify(main.questions))

//$('#myModal').modal('toggle '); // trigger the modal


} // addQuestion


} //mainController
