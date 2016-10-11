
class question {
  constructor() {
    this.qInTime = new Date().getTime(),
    this.qUUID = randomString(10)
  }

  setQuestionObj(obj) {
    if(obj.qText)     this.qText = obj.qText;
    if(obj.qSubject)  this.qSubject = obj.qSubject;
    if(obj.qUserID)   this.qUserID = obj.qUserID;
    if(obj.qGroupID)  this.qGroupID = obj.qGroupID;
    if(obj.qComments) this.qComments = obj.qComments;
    if(obj.qHelpers)  this.qHelpers = obj.qHelpers;
    if(obj.qStatus)   this.qStatus = obj.qStatus;
    if(obj.qInTime)   this.qInTime = obj.qInTime;
    if(obj.qUUID)     this.qUUID = obj.qUUID;
  }

  setQuestionParams(
              qText,
              qSubject,
              qUserID,
              qGroupID,
              qComments,
              qHelpers,
              qStatus,
              qInTime,
              qUUID) {
    this.qText = qText;
    this.qSubject = qSubject;
    this.qUserID = qUserID;
    this.qGroupID = qGroupID;
    this.qComments = qComments;
    this.qHelpers = qHelpers;
    this.qStatus = qStatus;
    this.qInTime = qInTime;
    this.qUUID = qUUID;
  }


  toString(){
    return `qText is ${this.qText} \n
            qSubject is ${this.qSubject} \n
            qUserID is ${this.qUserID} \n
            qGroupID is ${this.qGroupID} \n
            qComments is ${this.qComments} \n
            qHelpers is ${this.qHelpers} \n
            qStatus is ${this.qStatus} \n
            qInTime is ${this.qInTime} \n
            qUUID is ${this.qUUID} \n `
  }
}



class questions {
    constructor( ) {
      this.questionsArray = []
    }

    addQuestion (qText){
      this.questionsArray.push( new question(qText));



      console.log(  JSON.parse(window.localStorage.getItem('data')) );
    } //END addQuestion



    loadFromStub(){

    }

    getQuestion (questionID){
      console.log(`looking for ${questionID}`);
      return this.questionsArray.filter( q  => q.myUUID === questionID);
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
