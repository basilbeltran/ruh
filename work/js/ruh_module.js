'use strict';

angular.module("RuhApp", ['ngRoute']);
angular.module("RuhApp")
    .controller('RuhMainController', mainController)
    .controller('RuhLoginController', loginController)
    .controller('RuhProfileController', profileController)
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



function questionFactory(){
  var data;

var getData = function () {
  if(data){
    console.log(`using questionFactory fresh data`)
    return data;
  }
  console.log(`reading localStorage to questionFactory data`)  // hit on page refresh
  data = JSON.parse(window.localStorage.getItem('data'));
  if(! data){
    console.log(`initialize localStorage from stub file`)  // hit after deleting LS
    window.localStorage.setItem('data', JSON.stringify(stub));
    data = JSON.parse(window.localStorage.getItem('data'));
    return data;
  }
  return data;
}

var putData = function () {

    // var dqs = angular.copy(data.questions); // avoid duplicates
    // dqs.forEach(function(q){
    //   delete q.$$hashKey;
    // });
    // data.questions = dqs;
    // decided to implement an alternative ... track by $id($index)
    //      "q in expertMain.qArray track by $id($index)"

    window.localStorage.setItem('data', JSON.stringify(data));
    data = JSON.parse(window.localStorage.getItem('data'));
    console.log("wrote localStorage data:", data);
}

function addQuestion(questionThis){
    var q = new question();
    q.setQuestionObj(questionThis);
    getData().questions.push( q );
    console.log("adding question:", q.toString() );
    putData();
}


function getQuestions(){
 return getData().questions;
}

  return {
    getData: getData,
    getQuestions: getQuestions,
    addQuestion: addQuestion
  }
}
