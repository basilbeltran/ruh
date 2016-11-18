
questionFactory.$inject = ['$http', '$rootScope'];
function questionFactory($http, $rootScope){

  var allQuestions;
  var socket = io.connect();
  var data;
  var haveMongo = false;
  var user;
  var admin;

  socket.on('getAllAdmin', allAdmin => {
    Factory.admin = allAdmin;
    console.log("FACTORY RECEIVED ADMIN", Factory.admin );
    //$rootScope.$apply();
    $rootScope.$broadcast('newAdmin', allAdmin);
  });

  socket.on('allQuestions', newQuestions => {
    Factory.allQuestions = newQuestions;
    console.log("FACTORY RECEIVED QUESTIONS", Factory.allQuestions );
    $rootScope.$broadcast('newQuestions', newQuestions);    
  });

  var getUser = function() {
      $http({
          method: 'GET',
          url: '/whoami',
      }).then(function(res) {
          Factory.user = res.data;
          console.info("FACTORY RECEIVED USER", Factory.user);
      }, function(err) {
          console.error(err);
      });
  }

// initialize the factory from the server
    getUser();
    socket.emit('getAllQuestions');
    socket.emit('getAllAdmin');




///TODO REMOVE ---  LEGACY CODE
var getData = function () {  // read "data" from local storage
  if(data){
    console.log(`using QuestionFactory-Fresh! data`)
    return data;
  }

// expect hit if page refreshed
  console.log(`reading localStorage to questionFactory data`)
  data = JSON.parse(window.localStorage.getItem('data'));
  console.log(data);

// hit after deleting LocalStorage
  if(! data){
    console.log(`initialize localStorage from stub file`)
    window.localStorage.setItem('data', JSON.stringify(stub));
    data = JSON.parse(window.localStorage.getItem('data'));

    // "object-ify" (and inflate) the stub data
    var objects = [];
    data.questions.forEach( q => {
      var nq = new Question();
      nq.setQuestionObj(q);
      objects.push(nq);
    });
    data.questions = objects;

    return data;
  }
  return data;
}

////////////////////////////// write to browser local storage
var putData = function () {
  try{
    window.localStorage.setItem('data', JSON.stringify(data));
    data = JSON.parse(window.localStorage.getItem('data'));
  }catch(err){
    console.log("problem writing localStorage data:", data);
  }
}


//
// function getUsers(){
//  return getData().usersData;
// }
//
// function getComments(){
//  return getData().comments;
// }

// a new question is created and put in the data structure
function addQuestion(questionThis){
    var q = new Question();             // instanciation - classes in do/classes.js
    q.setQuestionObj(questionThis);     // inflation - with obj from controller or ?
    getData().questions.push( q );      // merging into memory based data
    putData();                          // write to local browser storage
    //console.log(q.toString());
    return data.questions;
}

function sendQuestion(newQuestion){
  console.log('sendQuestion: ', newQuestion);
  return $http.post('/api/question', newQuestion)
}


function  getQuestion (questionID){
  console.log(`looking for ${questionID}`);
  return getData().questions.filter( q  => q.myUUID === questionID);
}

// ensures the data structure is fresh and returns the questions array
// function getQuestions(){
//   if(haveMongo){
//
//   }
//   else return getData().questions;
// }

// function  getExperts (subject){
//   console.log(`looking for ${subject}`);
//   return usersData.filter( x  => x.expertise.includes(subject) )
// }

  var Factory = {
    getData: getData,
    // getQuestions: getQuestions,
    getQuestion: getQuestion,
    addQuestion: addQuestion,
    haveMongo: haveMongo,
    sendQuestion: sendQuestion,

    admin: admin,
    user: user,
    allQuestions: allQuestions,
  }

  return Factory;
}
