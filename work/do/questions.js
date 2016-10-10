
class question = {
  constructor( question,
              subject,
              userID,            //TODO create user object
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
    this.myUUID = randomString(5)
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



class questions = {
    constructor( questionsArray ) {
      this.questionsArray = questionsArray
    }

    loadFromStub(){

    }

    toString(){
      var strVal;  //TODO  is this needed?
      this.questions.map( q => strVal += q.toString() );
      return strVal;
    }
} // questions



class comment = {

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


class comments = {

    constructor() {
      this.comments = [];
    }

    addComment(id, text){
      this.comments.push(new Comment(id, text));
    }




    orderCommentsByTime(){
        //TODO order comments this.comments.map
      return [];
    }

    toString(){
      var strVal;  //TODO  is this needed?
      this.comments.map( comment => strVal += comment.toString() );
      return strVal;
    }
} // comments




class helper = {

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


class helpers = {

    constructor( helpers ) {
      this.helpers = helpers;
    }

    toString(){
      return  this.helpers  //TODO use map when working below on helpers (questions also)
    }
} // helpers
