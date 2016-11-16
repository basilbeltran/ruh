var Question = require('../do/questionModel');

function create (req, res) {
    var newDoc = new Question(req.body);
    newDoc.save((err, doc)=>{
        if(err){
            return res.send(err);
        }
        res.send(doc);
    });
}

function get (req, res) {
    // get One
    if(req.params.id){
        Question.findOne({_id : req.params.id}, (err, document)=>{
            if(err){
                // if(err.name === "CastError" && err.kind === "ObjectId"){
                //     return res.send(`That ain't no ID`)
                // }

                return res.send(err);
            }
            if(!document){
                return res.send('No question with that id')
            }
            res.send(document);
        });
    }
    // get Many
    else{
        Question.find({}, (err, documents)=>{
            // res.send(err || documents)
            if(err){
                return res.send(err);
            }
            res.send(documents);
        });
    }
}

module.exports = {
    create : create,
    get    : get
}
