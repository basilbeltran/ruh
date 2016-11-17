var mongoose = require('mongoose');

var QuestionSchema = mongoose.Schema({
  // qUser : {
  //     type : mongoose.schema.Objectid
  //     ref: 'User'
  //   },
    qUser :     {type : String, default : 'basil8.beltran@gmail.com'},
    qText :     {type : String},
    qGoal :     {type : String},
    qTrying :   {type : String},
    qSubject :  {type : String, default : 'JAVASCRIPT'},
    qStatus :   {type : String, default : 'yellow'},
    qCommentArray :   {type : Array, default : []},
    qUsersInterested :{type : Array, default : []},
    qInTime:          {type: Number, default: () => Date.now() }
});

module.exports = mongoose.model('Question', QuestionSchema, 'questions');
