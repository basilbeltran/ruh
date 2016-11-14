'use strict';

angular.module("RuhApp", ['ngRoute']);

var app = angular.module("RuhApp")
    .controller('RuhMainController', mainController)
    .controller('RuhLoginController', loginController)
    .controller('RuhProfileController', profileController)
    .factory('RuhQuestionFactory', questionFactory)
    .filter('RuhReverse', ruhReverse_B)

    // things can be defined like this is you declare a variable "app" as above
    app.filter('ruhReverse', function() {
      return function(items) {
        return items.slice().reverse();
      };
    });

    // the "non-call back" option show below is used throughout this application
    function ruhReverse_B(){
      return function(items) {
        return items.slice().reverse();
      };
    }


angular.module('RuhApp').config(myRouter);  // the client side routes are defined immediately below
myRouter.$inject = ['$routeProvider'];
function myRouter($routeProvider) {
  $routeProvider
  .when('/', { templateUrl: '/templates/login.html', controller: "RuhLoginController as loginMain" })
  .when('/expert', { templateUrl: '/templates/expert.html', controller: "RuhExpertController as expertMain" })
  .when('/question', { templateUrl: '/templates/question.html', controller: "RuhQuestionController as questionMain" })
  .when('/profile', { templateUrl: '/templates/profile.html', controller: "RuhProfileController as profileMain" })
  .otherwise({ redirectTo: '/'})
}


// minor angular controllers are defined here, larger ones have there own file

function mainController(){
  var mainThis = this;
  mainThis.titleLink = "RU Stuck"
  mainThis.profileLink = "Profile"
  mainThis.questionLink = "I'm Stuck"
  mainThis.expertLink = "I'll Help"
}


function loginController(){
  var loginThis = this;

  loginThis.mainText = "Sign in ...";
  loginThis.subText = "Enter your email address and password.";
  loginThis.keepText = "Keep me signed in";
  loginThis.forgotText = "I forgot my password";
  loginThis.emailText = "you@domain.com";
  loginThis.passwordText = "password";

  loginThis.login = function(){
    console.log('logged in maybe');
  }
}


profileController.$inject = ['RuhQuestionFactory'];

function profileController(RuhQuestionFactory){
  var profileThis = this;
  profileThis.data = RuhQuestionFactory.getData();

  profileThis.mainText = "Stuck Profile";
  profileThis.subText = "Change your password.";
  profileThis.oldPasswordText = "old password";
  profileThis.newPasswordText = "new password";
  profileThis.checkPasswordText = "retype password";
  
    profileThis.addPhoto = "Your Photo";
    profileThis.addPhotoBtn = "Take Photo";

  profileThis.addExpertice = "Areas of Expertice";
  profileThis.addExperticeBtn = "Add Expertice";

  profileThis.addInterests = "Areas of Interest";
  profileThis.addInterestsBtn = "Add Interests";


  profileThis.changePassword = function(){
    console.log('password changed');
  }
}
