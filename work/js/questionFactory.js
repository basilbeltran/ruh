
questionFactory.$inject = ['$http', '$rootScope'];
function questionFactory($http, $rootScope){
  var socket = io.connect();
  var data;
  var haveMongo = true;
  var user;
  var questions;

  socket.on('allQuestions', newQuestions => {
    console.dir("FACTORY RECEIVED QUESTIONS", newQuestions );

    questions = newQuestions;
    // $scope.$apply();
  });

  socket.on('getAllAdmin', admin => {
    console.dir("FACTORY RECEIVED Admin" );
    console.dir(admin);
    data = admin;
  });

  var getUser = function() {
      $http({
          method: 'GET',
          url: '/whoami',
      }).then(function(res) {
          console.info("questionFactory.getUser: ", res.data);
          // loginThis.getUser();
          user = res.data;
          $rootScope.$apply;
      }, function(err) {
          console.error(err);
      });
  }


getUser();
socket.emit('getAllQuestions');
socket.emit('getAllAdmin');

  return {
    data: data,
    user: user,
    getUser: getUser,
  }
}
