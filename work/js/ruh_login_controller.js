// terse style
// angular.module('RuhLogin',[])
//     .controller('RuhLoginController',['$http', function($http) {

angular.module('RuhLogin',[]);
var loginApp = angular.module("RuhLogin")
    .controller('RuhLoginController', loginController)

loginController.$inject = ['$http'];
function loginController($http){

        var loginThis = this;

        loginThis.mainText = "Sign in ...";
        loginThis.userText = "Email";

        loginThis.subText = "Enter your email address and password.";
        loginThis.keepText = "Keep me signed in !";
        loginThis.forgotText = "I forgot my password";
        loginThis.register = "register";
        loginThis.emailText = "you@domain.com";
        loginThis.passwordText = "password";
        loginThis.passwordHint = "********";

        loginThis.login = function() {
            //console.log(loginThis);

            $http({
                method: 'POST',
                url: '/login',
                data: {
                    uEmail: loginThis.email,
                    uPassword: loginThis.password
                }
            }).then(function(res) {
                console.info("loginThis.SUBMIT: ", res.data);
                location.href = '/';
            }, function(err) {
                console.error(err);
            });
        }//login

        loginThis.register = function() {
            //console.log(loginThis);

            $http({
                method: 'POST',
                url: '/register',
                data: {
                    uEmail: loginThis.email,
                    uPassword: loginThis.password
                }
            }).then(function(res) {
                console.info("loginThis.REGISTER: ", res.data);
                location.href = '/';
            }, function(err) {
                console.error(err);
            });
        }//register

  }; // loginController
  //}]); // loginController terse form
