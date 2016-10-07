'use strict';

angular.module("RuhApp")
  .controller('RuhExpertController', expertController);

  expertController.$inject = ['RuhUserFactory'];


function expertController(RuhUserFactory){
  var eMain = this;
  eMain.users = RuhUserFactory.users;
  console.log( RuhUserFactory.getExperts("node")) ;

  eMain.data = JSON.parse(window.localStorage.getItem('data')) || {};
   // console.log(eMain.data);
  if(eMain.data.constructor === Object){
    console.log("initializing eMain.data with stubs");
    window.localStorage.setItem('data', JSON.stringify(stub));
    //.log(eMain.data);
  }

  eMain.showProfile = function(){
    // eMain.isProfileShown = true;
    if(eMain.isProfileShown){
      eMain.isProfileShown = false;
    } else{
      eMain.isProfileShown = true;
    }
  }

  eMain.makeStatusRed = function(){
    eMain.qStatus = "statusRed";
    console.log('makeStatusRed called');
  }

  eMain.makeStatusGreen = function(){
    eMain.qStatus = "statusGreen";
    console.log('makeStatusGreen called');
  }

} //expertController
