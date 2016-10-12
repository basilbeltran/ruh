
class question {
  constructor() {
    this.qInTime = new Date().getTime(),
    this.qUUID = randomString(10)
  }

  setQuestionObj(obj) {
    if(obj.qText)    this.qText = obj.qText // set from obj
      else           this.qText = "test"   // else a default val

    if(obj.qSubject)  this.qSubject = obj.qSubject
      else this.qSubject = "Mathamatrix"

    if(obj.qUserID)   this.qUserID = obj.qUserID
      else            this.qUserID = "22222"

    if(obj.qGroupID)  this.qGroupID = obj.qGroupID;
      else            this.qGroupID = "aaaaaaaaaa"

    if(obj.qComments) this.qComments = obj.qComments
      else            this.qComments = ["5555555555", "6666666666"]

    if(obj.qHelpers)  this.qHelpers = obj.qHelpers
      else            this.qHelpers = ["11111", "22222"]

    if(obj.qStatus)   this.qStatus = obj.qStatus
      else            this.qStatus = "yellow"

    if(obj.qInTime)   this.qInTime = obj.qInTime;
    if(obj.qUUID)     this.qUUID = obj.qUUID;
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


class user {
  constructor() {
    this.uInTime = new Date().getTime(),
    this.uUUID = randomString(10)
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


    toString(){
      return `uEmail = ${this.uEmail} \n
              uPassword = ${this.uPassword}   \n
              myUUID = ${this.uUUID} \n `
    }
} //user



class comment {
  constructor() {
    this.cInTime = new Date().getTime(),
    this.cUUID = randomString(10)
  }

      setComment( obj ) {

        if(obj.cTopic)  this.cTopic = obj.cTopic
          else this.cTopic = "Mathamatrix"

        if(obj.cUserID)   this.cUserID = obj.cUserID
          else            this.cUserID = "22222"

        if(obj.cText)    this.cText = obj.cText
          else           this.cText = "comment"


        if(obj.cInTime)   this.cInTime = obj.cInTime;
        if(obj.cUUID)     this.cUUID = obj.cUUID;
      }


      toString(){
        return `cUserID = ${this.cUserID} \n
                cTopic = ${this.cTopic} \n
                cText = ${this.cText} \n
                cTime = ${this.cTime} \n
                cUUID = ${this.cUUID} \n `
      }
} // comment
