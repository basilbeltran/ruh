angular.module('RuhLogin',[])
    .controller('loginController',['$http', function($http) {
        var loginThis = this;

        loginThis.mainText = "Sign in ...";
        loginThis.subText = "Enter your email address and password.";
        loginThis.keepText = "Keep me signed in";
        loginThis.forgotText = "I forgot my password";
        loginThis.emailText = "you@domain.com";
        loginThis.passwordText = "password";

        loginThis.submit = function() {
            console.log(loginThis);

            $http({
                method: 'POST',
                url: '/login',
                data: {
                    uEmail: loginThis.email,
                    uPassword: loginThis.password
                }
            }).then(function(res) {
                console.info(res.data);
                location.href = '/';
            }, function(err) {
                console.error(err);
            });
        }
    }]);
