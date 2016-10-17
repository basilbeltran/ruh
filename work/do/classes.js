
class Question {
  constructor() {
    this.qInTime = new Date().getTime(),
    this.qUUID = randomString(10)
  }

  setQuestionObj(obj) {
    if(obj.qText)    this.qText = obj.qText             // set from obj
      else           this.qText = "I want to know..."   // else a default val

    // if(obj.qProblem)    this.qText = obj.qProblem
    //   else              this.qText = "what problem trying to solve"


    // if(obj.qWillAnswerIn)    this.qWillAnswerIn = obj.qWillAnswerIn
    //   else                   this.qWillAnswerIn = "minutes until broadcast"

    this.qSubject = obj.qSubject      || "Subject area of question";
    this.qUserID = obj.qUserID        || "22222";
    this.qGroupID = obj.qGroupID      || "aaaaaaaaaa";
    this.qComments = obj.qComments    || ["5555555555", "6666666666"]
    this.qInterested = obj.qInterested || ["11111", "22222"]
    this.qStatus = obj.qStatus        || "yellow"

    if(obj.qInTime)   this.qInTime = obj.qInTime;
    if(obj.qUUID)     this.qUUID = obj.qUUID;

// inflate from foreign keys.....

    this.qUser = new User();
    this.qUser.setUserKey(this.qUserID);
    this.qCommentArray = [];

    this.qComments.forEach( cID => {
      var comment = new Comment();
      comment.setCommentKey(cID);
      this.qCommentArray.push(comment);
    });

  } //setQuestionObj


  toString(){
    return `\n qText = ${this.qText} \n
            qSubject = ${this.qSubject} \n
            qUserID = ${this.qUserID} \n
            qGroupID = ${this.qGroupID} \n
            qComments = ${this.qComments} \n
            qHelpers = ${this.qHelpers} \n
            qStatus = ${this.qStatus} \n
            qInTime = ${this.qInTime} \n
            qUUID = ${this.qUUID} \n `
  }
} //question


class User {
  constructor() {
    this.uInTime = new Date().getTime(),
    this.uUUID = randomString(10)
  }


  setUserObj( obj ) {
    this.uEmail = obj.uEmail || "user@gmail.com"
    this.uPassword = obj.uPassword || "password"
    this.uExpertise = obj.uExpertise || ["Javascript", "css"]
    if(obj.uInTime)   this.uInTime = obj.uInTime;
    if(obj.uUUID)     this.uUUID = obj.uUUID;
    }

    setUserKey(uuid){  // inflates this user from a user UUID
      var userObj = stub.usersData.filter( x  => x.uUUID === uuid ); //TODO REMOVE  REFERENCE TO STUB
      this.setUserObj( userObj[0] ) ;
    }

    toString(){
      return `uEmail = ${this.uEmail} \n
              uPassword = ${this.uPassword}   \n
              uExpertise = ${this.uExpertise}   \n
              myUUID = ${this.uUUID} \n `
    }
} //user



class Comment {
  constructor() {
    this.cInTime = new Date().getTime(),
    this.cUUID = randomString(10)
  }

      setCommentObj( obj ) {
        this.cUserID = obj.cUserID || "22222"
        this.cText = obj.cText || "comment"
        if(obj.cInTime)   this.cInTime = obj.cInTime;
        if(obj.cUUID)     this.cUUID = obj.cUUID;
      }

      setCommentKey(uuid){
        var commentObj = stub.comments.filter( x  => x.cUUID === uuid );   //TODO REMOVE  REFERENCE TO STUB
        this.setCommentObj( commentObj[0] ) ;
      }

      toString(){
        return `cUserID = ${this.cUserID} \n
                cTopic = ${this.cTopic} \n
                cText = ${this.cText} \n
                cTime = ${this.cTime} \n
                cUUID = ${this.cUUID} \n `
      }
} // comment
