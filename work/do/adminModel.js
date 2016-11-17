var mongoose = require('mongoose');

var AdminSchema = mongoose.Schema({
    categories : {type : Array},
});

module.exports = mongoose.model('Admin', AdminSchema, 'admin');
