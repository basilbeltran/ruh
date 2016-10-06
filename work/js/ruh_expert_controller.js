
angular.module("RuhApp")
  .controller('eController', expertController);

function expertController(){
  var eMain = this;

  eMain.data = JSON.parse(window.localStorage.getItem('data')) || {};
   console.log(eMain.data);
  if(eMain.data.constructor === Object){
    console.log("initializing eMain.data with stubs");
    window.localStorage.setItem('data', JSON.stringify(stub));
    console.log(eMain.data);
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
    eMain.isStatusRed = true;
    console.log('makeStatusRed called');
  }

} //expertController
