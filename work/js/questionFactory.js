// manages the "data" object which contains array of questions, users, categories, & comments
function questionFactory(){
  var data;

////////////////////////////// read "data" from local storage
var getData = function () {
  if(data){
    console.log(`using questionFactory fresh data`)
    return data;
  }
  console.log(`reading localStorage to questionFactory data`)  // hit on page refresh
  data = JSON.parse(window.localStorage.getItem('data'));
  if(! data){
    console.log(`initialize localStorage from stub file`)  // hit after deleting LS
    window.localStorage.setItem('data', JSON.stringify(stub));
    data = JSON.parse(window.localStorage.getItem('data'));

    // "classify" the data
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
    var q = new Question();             // instanciation - classes are proscibed in do/classes.js
    q.setQuestionObj(questionThis);     // inflation - with obj from the controller

    getData().questions.push( q );      // merging into factories memory based data
    // console.log("adding question:", q.toString() );
    putData();                          // written to local browser storage
}


// ensures the data structure is fresh and returns the questions array
function getQuestions(){   // new up and populate "data" (currently just reads file)
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
