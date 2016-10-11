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
        if(! data){
            console.log(`looking for stub data`)
            window.localStorage.setItem('data', JSON.stringify(stub))
            data = JSON.parse(window.localStorage.getItem('data'));
            return data;
        } else {
          console.log(`returning cached data`)
          return data;
        }
      }


  return {
    getData: getData
  }
}
//getQuestionData().push({   why "not function" ?
