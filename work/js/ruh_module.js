'use strict';

angular.module("RuhApp", ['ngRoute']);
angular.module("RuhApp")
    .controller('RuhMainController', mainController)
    .controller('RuhLoginController', loginController)
    .controller('RuhProfileController', profileController)
    .factory('RuhUserFactory', userFactory)
    .factory('RuhQuestionFactory', questionFactory)

angular.module('RuhApp')
        .config(myRouter);
myRouter.$inject = ['$routeProvider'];
function myRouter($routeProvider) {
  $routeProvider
  .when('/', { templateUrl: '/templates/login.html', controller: "RuhLoginController as loginMain" })
  .when('/expert', { templateUrl: '/templates/expert.html', controller: "RuhExpertController as expertMain" })
  .when('/question', { templateUrl: '/templates/question.html', controller: "RuhQuestionController as questionMain" })
  .when('/profile', { templateUrl: '/templates/profile.html', controller: "RuhProfileController as profileMain" })
  .otherwise({ redirectTo: '/'})
}

function mainController(){     var mainMain = this;
  mainMain.titleLink = "RU Stuck"
  mainMain.profileLink = "Profile"
  mainMain.questionLink = "I'm Stuck"
  mainMain.expertLink = "I'll Help"
}


function loginController(){     var loginMain = this;

  loginMain.mainText = "Sign in to RU Stuck";
  loginMain.subText = "Enter your email address and password.";
  loginMain.keepText = "Keep me signed in";
  loginMain.forgotText = "I forgot my password";
  loginMain.emailText = "you@domain.com";
  loginMain.passwordText = "password";

  loginMain.login = function(){
    console.log('logged in maybe');
  }
}


function profileController(){    var profileMain = this;

  profileMain.mainText = "Stuck Profile";
  profileMain.subText = "Change your password.";
  profileMain.oldPasswordText = "old password";
  profileMain.newPasswordText = "new password";
  profileMain.checkPasswordText = "retype password";

  profileMain.addText = "Add subjects you're willing to field questions on";
  profileMain.addButtonText = "Add";

  profileMain.changePassword = function(){
    console.log('password changed');
  }
}


function userFactory(){

  var usersData = [
      {
          email: "basil.beltran@gmail.com",
          password: "12345678",
          expertise: ["javascript", "devops"]
      },
      {
          email: "basil.beltran@tinkermill.org",
          password: "asdf09",
          expertise: ["css", "node"]
      },
  ];

  var getExperts = function(subject){
    console.log(`looking for ${subject}`);
    return usersData.filter( x  => x.expertise.includes(subject) )
  }

    return {
      users: usersData,
      getExperts: getExperts
    }
}


function questionFactory(){
  var questions = [];

      var getQuestionData = function () {
        if(questions === []){
            window.localStorage.setItem('data', JSON.stringify(stub))
            questions = JSON.parse(window.localStorage.getItem('data'));
            return questions;
        } else {
          return questions;
        }
      }


      var getQuestion = function(questionID){
        console.log(`looking for ${questionID}`);
        return questionData.filter( x  => x.objectElement.includes(questionID) )
      }

      var addQuestion = function(qText){
        //getQuestionData().push({  // why "not function" ?
        questions.push({
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
            "question":qText
        });


        var storeQuestions = angular.copy(questions); // avoid duplicates
        storeQuestions.forEach(function(q){
          delete q.$$hashKey;
        });
        questions = storeQuestions;
        window.localStorage.setItem('data', JSON.stringify(questions));

        console.log(  JSON.parse(window.localStorage.getItem('data')) );
      } //END addQuestion



  return {
    getQuestionData: getQuestionData,
    getQuestion: getQuestion,
    addQuestion: addQuestion
  }
}
