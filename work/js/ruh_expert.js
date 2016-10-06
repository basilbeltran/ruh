'use strict';

angular.module("MainApp", []);
angular.module("MainApp").controller('eController', expertController);
// mainController.$inject=['$scope'];

function expertController(){
  var eMain = this;
  eMain.data = JSON.parse(window.localStorage.getItem('data')) || {};
   console.log(eMain.data);
  if(eMain.data.constructor === Object){
    console.log("initializing eMain.data with stubs");
    window.localStorage.setItem('data', JSON.stringify(stub));
    console.log(eMain.data);
  }

} //expertController
