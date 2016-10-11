
class question {
  constructor( question,
              subject,
              userID,
              groupID,
              comments,
              helpers,
              myStatus,
              inTime ) {
    this.question = question,
    this.subject = subject,
    this.user = user,
    this.group = group,
    this.comments = comments,
    this.helpers = helpers,
    this.myStatus = myStatus,
    this.inTime = inTime,
    this.myUUID = randomString(10)
  }



  toString(){
    return `question is ${this.question} \n
            subject is ${this.subject} \n
            user is ${this.user} \n
            group is ${this.group} \n
            comments is ${this.comments} \n
            helpers is ${this.helpers} \n
            myStatus is ${this.myStatus} \n
            inTime is ${this.inTime} \n
            myUUID is ${this.myUUID} \n `
  }
}



class questions {
    constructor( questionsArray ) {
      this.questionsArray = questionsArray
    }

    addQuestion (qText){
      this.questionsArray.push( new question(qText));


      // var storeQuestions = angular.copy(data); // avoid duplicates
      // storeQuestions.forEach(function(q){
      //   delete q.$$hashKey;
      // });
      // questions = storeQuestions;
      // window.localStorage.setItem('data', JSON.stringify(data));
      console.log(  JSON.parse(window.localStorage.getItem('data')) );
    } //END addQuestion



    loadFromStub(){

    }

    getQuestion (questionID){
      console.log(`looking for ${questionID}`);
      return this.questionsArray.filter( q  => q.myUUID === questionID)
    }

    getQuestions(){
      return this.questionsArray;
    }

    toString(){
      var strVal;  //TODO  is this needed?
      this.questionsArray.map( q => strVal += q.toString() );
      return strVal;
    }
} // questions


class user {
      constructor( email, password, groupID  ) {
          this.email = email,
          this.password = password,
          this.expertise = [],
          this.groupID = groupID,
          this.myUUID = randomString(5)
        }

    getExperts (subject){
      console.log(`looking for ${subject}`);
      return usersData.filter( x  => x.expertise.includes(subject) )
    }

    toString(){
      return `email is ${this.email} \n
              password is ********   \n
              myUUID is ${this.myUUID} \n `
    }
}

class users {
    constructor(  ) {
      this.usersArray = [];
    }

    toString(){
      return  this.usersArray  //TODO use map when working below on helpers (questions also)
    }
} // helpers



class comment {
      constructor( userID, myText  ) {
        this.userID = userID,
        this.myText = text,
        this.myTime = new Date().getTime(),
        this.myUUID = randomString(10)
      }


      toString(){
        return `userID is ${this.userID} \n
                myText is ${this.myText} \n
                myTime is ${this.myTime} \n
                myUUID is ${this.myUUID} \n `
      }
} // comment


class comments {
    constructor() {
      this.commentsArray = [];
    }

    addComment(id, text){
      this.commentsArray.push(new Comment(id, text));
    }


    orderCommentsByTime(){
        //TODO order comments this.comments.map
      return [];
    }

    toString(){
      var strVal;  //TODO  is this needed?
      this.commentsArray.map( comment => strVal += comment.toString() );
      return strVal;
    }
} // comments




class helper {
    constructor( userID, socketID ) {
      this.userID = userID,
      this.socketID = socketID,
      this.myUUID = randomString(10)
    }

    toString(){
      return `userID is ${this.userID} \n
              socketID is ${this.socketID} \n
              myUUID is ${this.myUUID} \n `
    }
} // helper


class helpers {
    constructor() {
      this.helpersArray = [];
    }

    toString(){
      return  this.helpersArray  //TODO use map when working below on helpers (questions also)
    }
} // helpers
