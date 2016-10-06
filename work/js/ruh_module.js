'use strict';

angular.module("RuhApp", []);
//factories allow controllers to share data

angular.module("RuhApp")
    .factory('RuhUserFactory', userFactory)
    .controller('RuhLoginController', loginController);


    function loginController(){
      var loginMain = this;

      loginMain.ngBlur = function () {
          isBlur = true;
          blur = "Ng-Blur True";
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
