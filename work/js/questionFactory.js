// manages the "data" object which contains
//     array of questions, users & comments
//     plus static data (status, groups, categories, etc)

function questionFactory(){
  var data;

var getData = function () {  // read "data" from local storage
  if(data){
    console.log(`using QuestionFactory-Fresh! data`)
    return data;
  }

// expect hit if page refreshed
  console.log(`reading localStorage to questionFactory data`)
  data = JSON.parse(window.localStorage.getItem('data'));

// hit after deleting LocalStorage
  if(! data){
    console.log(`initialize localStorage from stub file`)
    window.localStorage.setItem('data', JSON.stringify(stub));
    data = JSON.parse(window.localStorage.getItem('data'));

    // "object-ify" (and inflate) the stub data
    var objects = [];
    data.questions.forEach( q => {
      var nq = new Question(data);
      nq.setQuestionObj(q);
      objects.push(nq);
    });
    data.questions = objects;

    return data;
  }
  return data;
}

////////////////////////////// write to local storage
var putData = function () {

    window.localStorage.setItem('data', JSON.stringify(data));
    data = JSON.parse(window.localStorage.getItem('data'));
    console.log("wrote localStorage data:", data);
}



// a new question is created and put in the data structure
function addQuestion(questionThis){
    var q = new Question();             // instanciation - classes in do/classes.js
    q.setQuestionObj(questionThis);     // inflation - with obj from controller or ?

    getData().questions.push( q );      // merging into memory based data
    putData();                          // write to local browser storage
}


// ensures the data structure is fresh and returns the questions array
function getQuestions(){
 return getData().questions;
}

function  getQuestion (questionID){
  console.log(`looking for ${questionID}`);
  return getData().questions.filter( q  => q.myUUID === questionID);
}

// function  getExperts (subject){
//   console.log(`looking for ${subject}`);
//   return usersData.filter( x  => x.expertise.includes(subject) )
// }

  return {
    getData: getData,
    getQuestions: getQuestions,
    getQuestion: getQuestion,
    addQuestion: addQuestion
  }
}