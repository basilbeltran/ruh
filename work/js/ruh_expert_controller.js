'use strict';

angular.module("RuhApp")
  .controller('RuhExpertController', expertController);

  expertController.$inject = ['RuhQuestionFactory'];

function expertController(RuhQuestionFactory){
  var expertThis = this;
  var loggedText = "Logged in as You";
  // expertThis.users = RuhUserFactory.users;


  expertThis.qArray = RuhQuestionFactory.getQuestions();   // an error here stops the page painting
  //console.log(expertThis.qArray);

  // console.log( RuhUserFactory.getExperts("node")) ;    // is an expert in that area logged in ?


  expertThis.showProfile = function(){
    // expertThis.isProfileShown = true;
    if(expertThis.isProfileShown){
      expertThis.isProfileShown = false;
    } else{
      expertThis.isProfileShown = true;
    }
  }

  expertThis.makeStatusRed = function(){
    expertThis.qStatus = "statusRed";
    console.log('makeStatusRed called');
  }

  expertThis.makeStatusGreen = function(){
    expertThis.qStatus = "statusGreen";
    console.log('makeStatusGreen called');
  }

} //expertController
