'use strict';

angular.module("RuhApp")
  .controller('RuhExpertController', expertController);

  expertController.$inject = ['RuhUserFactory'];
  expertController.$inject = ['RuhQuestionFactory'];

function expertController(RuhQuestionFactory){
  var expertMain = this;
  var loggedText = "Logged in as You";
  // expertMain.users = RuhUserFactory.users;

  expertMain.data = RuhQuestionFactory.getQuestionData();
  console.log(expertMain.data);


  // console.log( RuhUserFactory.getExperts("node")) ;    // is an expert in that area logged in ?


  expertMain.showProfile = function(){
    // expertMain.isProfileShown = true;
    if(expertMain.isProfileShown){
      expertMain.isProfileShown = false;
    } else{
      expertMain.isProfileShown = true;
    }
  }

  expertMain.makeStatusRed = function(){
    expertMain.qStatus = "statusRed";
    console.log('makeStatusRed called');
  }

  expertMain.makeStatusGreen = function(){
    expertMain.qStatus = "statusGreen";
    console.log('makeStatusGreen called');
  }

} //expertController
