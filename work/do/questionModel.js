var mongoose = require('mongoose');

var QuestionSchema = mongoose.Schema({
  // qUser : {
  //     type : mongoose.schema.Objectid
  //     ref: 'User'
  //   },
    qUser :     {type : String},
    qText :     {type : String},
    qGoal :     {type : String},
    qTrying :   {type : String},
    qSubject :  {type : String},
    qStatus :   {type : String, default : 'yellow'},
    qCommentArray : {type : Array, default : []},
    qUsersInterested :   {type : Array, default : []},
    qCreated:       { type: Number, default: () => Date.now() }
});

module.exports = mongoose.model('Question', QuestionSchema, 'questions');
