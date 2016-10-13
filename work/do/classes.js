
class Question {
  constructor(data) {
    this.qInTime = new Date().getTime(),
    this.qUUID = randomString(10),
    this.data = data
  }

  setQuestionObj(obj) {
    if(obj.qText)    this.qText = obj.qText             // set from obj
      else           this.qText = "I want to know..."   // else a default val

    // if(obj.qProblem)    this.qText = obj.qProblem
    //   else              this.qText = "what problem trying to solve"


    // if(obj.qWillAnswerIn)    this.qWillAnswerIn = obj.qWillAnswerIn
    //   else                   this.qWillAnswerIn = "minutes until broadcast"

    if(obj.qSubject)  this.qSubject = obj.qSubject
      else this.qSubject = "Subject area of question"

    if(obj.qUserID)   this.qUserID = obj.qUserID
      else            this.qUserID = "22222"

    if(obj.qGroupID)  this.qGroupID = obj.qGroupID;
      else            this.qGroupID = "aaaaaaaaaa"

    if(obj.qComments) this.qComments = obj.qComments
      else            this.qComments = ["5555555555", "6666666666"]

    if(obj.qHelpers)  this.qInterested = obj.qInterested
      else            this.qInterested = ["11111", "22222"]

    if(obj.qStatus)   this.qStatus = obj.qStatus
      else            this.qStatus = "yellow"

    if(obj.qInTime)   this.qInTime = obj.qInTime;
    if(obj.qUUID)     this.qUUID = obj.qUUID;

// inflate from foreign keys.....

    this.qUser = new User(this.data);
    this.qUser.setUserKey(this.qUserID);

    this.qCommentArray = [];
    this.qComments.forEach( cID => {
      var comment = new Comment(this.data);
      comment.setCommentKey(cID);
      this.qCommentArray.push(comment);
    });

  }


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
  constructor(data) {
    this.uInTime = new Date().getTime(),
    this.uUUID = randomString(10),
    this.data = data
  }


  setUserObj( obj ) {
    if(obj.uEmail)  this.uEmail = obj.uEmail
      else          this.uEmail = "user@gmail.com"

    if(obj.uPassword)  this.uPassword = obj.uPassword
      else             this.uPassword = "password"

    if(obj.uExpertise)  this.uExpertise = obj.uExpertise
      else              this.uExpertise = ["Javascript", "css"]

    if(obj.uInTime)   this.uInTime = obj.uInTime;
    if(obj.uUUID)     this.uUUID = obj.uUUID;
    }

    setUserKey(uuid){  // inflates this user from a user UUID
      var userObj = this.data.usersData
        .filter( x  => x.uUUID === uuid );
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
  constructor(data) {
    this.cInTime = new Date().getTime(),
    this.cUUID = randomString(10),
    this.data = data
  }


      setCommentObj( obj ) {

        if(obj.cTopic)  this.cTopic = obj.cTopic
          else this.cTopic = "Mathamatrix"

        if(obj.cUserID)   this.cUserID = obj.cUserID
          else            this.cUserID = "22222"

        if(obj.cText)    this.cText = obj.cText
          else           this.cText = "comment"


        if(obj.cInTime)   this.cInTime = obj.cInTime;
        if(obj.cUUID)     this.cUUID = obj.cUUID;
      }

      setCommentKey(uuid){
        var commentObj = this.data.comments
          .filter( x  => x.cUUID === uuid );
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
