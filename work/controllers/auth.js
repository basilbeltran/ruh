var User = require('../do/userModel.js'),
    bcrypt = require('bcryptjs');

module.exports = {
    login: ( req, res ) => { // POST login
        //console.info('LOGIN::POST::PAYLOAD::', req.body);

        User.findOne({ uEmail: req.body.uEmail }, (err, user) => {
            if( err ) { // this will trigger the error .then callback on the frontend
                console.error('MongoDB error:', err);
                res.status(500).json(err);
            }
            if( !user ) {
                console.warn('No user found!');
                res.status(403).json({ message: 'Invalid username or password' });
            } else {
                //console.info('DB FOUND: ', user);

                bcrypt.compare(req.body.uPassword, user.uPassword, (compareErr, matched) => {
                    if( compareErr ) { // this will trigger the error .then callback on the frontend
                        console.error('compareErr error:', compareErr);
                        res.status(500).json(err);
                    } else if( !matched ) {
                        console.log('Password mismatch!');
                        res.status(403).json({ message: 'Invalid username or password' });
                    } else {
                        req.session.userId = user._id;
                        res.send(user);
                        // res.send({ message: 'Login success!' });
                        console.info('LOGIN::sending user', user);
                    }
                })
            }

        })
    },

    register: ( req, res ) => {
        var newUser = new User(req.body);
        // when this function fires, it is going to hit the pre save middleware
        newUser.save((err, user) => {
            if(err){
                console.log(`error on save ${err}`);
                return res.send(err);
            }
            console.log(`ADDED / SENDING NEW USER ${user} `);
            res.send(user);
        });
    },

    logout: (req, res ) => {
        req.session.reset();
         res.redirect('/login.html');
    },

    whoami: (req, res ) => {
        //res.send(req.session.userId);
        User.findById(req.session.userId, (err, user) => {
          if(err){
            console.error('MongoDB error:', err);
            res.status(500).json(err);
          }
          console.log('whoami sending', user);
          res.send(user);
        })
    },

    middlewares: {
        session: (req, res, next) => { // this will be the middleware that checks for a loggedin user
            if( req.session.userId ) {
                next();
            } else {
                res.redirect('/login.html');
            }
        }
    }
}
