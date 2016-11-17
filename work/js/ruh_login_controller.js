// terse style
// angular.module('RuhLogin',[])
//     .controller('RuhLoginController',['$http', function($http) {

angular.module('RuhLogin',[]);
var loginApp = angular.module("RuhLogin")
    .controller('RuhLoginController', loginController)
    .factory('RuhQuestionFactory', questionFactory)

loginController.$inject = ['RuhQuestionFactory', '$http'];
function loginController(RuhQuestionFactory, $http){

        var loginThis = this;

        loginThis.mainText = "Sign in ...";
        loginThis.userText = "Email";

        loginThis.subText = "Enter your email address and password.";
        loginThis.keepText = "Keep me signed in";
        loginThis.forgotText = "I forgot my password";
        loginThis.emailText = "you@domain.com";
        loginThis.passwordText = "password";
        loginThis.passwordHint = "********";

        loginThis.submit = function() {
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
        }

    }; // loginController
    //}]); // loginController terse form
