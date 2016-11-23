var User = require('../do/userModel.js'),
    bcrypt = require('bcryptjs');

module.exports = {

    updateUser: (req, res) => {
        var id = req.params.id;   // you can pass the id in a param if available
        var user = req.body;
        console.error('updateUser', req.params.id); 
        if (user && user._id !== id) {
            return res.status(500).json({
                err: "Ids don't match"
            });
        }
        User.findByIdAndUpdate(id, user, { new: true }, function(err, user) {
            if (err) {
                console.error('MongoDB User.findByIdAndUpdate error:', err);
                return res.status(500).json({
                    err: err.message
                });
            }
            res.json({
                'user': user,
                message: 'User Updated'
            });
        });
    },


    whoami: (req, res ) => {
        //res.send(req.session.userId);
        User.findById(req.session.userId, (err, user) => {   // use the session that comes with all reqs
          if(err){
            console.error('MongoDB error:', err);
            res.status(500).json(err);
          }
          console.log('whoami sending', user);
          res.send(user);
        })
    }
}
