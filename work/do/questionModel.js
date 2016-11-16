var mongoose = require('mongoose');

var QuestionSchema = mongoose.Schema({
    qText :     {type : String},
    qSubject :  {type : String},
    qStatus :   {type : String, default : 'yellow'},
    // qUser : {
    //     type : mongoose.schema.Objectid
    //     ref: 'User'
    //   },
    qUser :         {type : String},
    qCommentArray : {type : Array, default : []},
    qInterested :   {type : Array, default : []},
    qCreated:       { type: Number, default: () => Date.now() }
});

module.exports = mongoose.model('Question', QuestionSchema, 'questions');
