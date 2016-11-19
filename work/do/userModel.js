var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    SALT_INDEX = 10,    // the larger this value is, the stronger the encryption,
                        // but the longer it will take to compare hashes

    UserSchema = mongoose.Schema({
        uName: {type: String},
        uEmail: {type: String},
        uPassword: {type : String},
        uInterestArray :   {type : Array, default : []},
        uExpertArray :   {type : Array, default : []},
        uCreated: { type: Number, default: () => Date.now() }
});

UserSchema.pre('save', function(next) {
    var user = this; // new User(req.body);
    // user.email = user.email.toLowerCase();

    // only hash the password if modified or a new user
    if( !user.isModified('uPassword') ) {
      console.info("Saving user: Password NOT modified");
        return next();
    }

    // generate a salt value to encrypt our password
    bcrypt.genSalt(SALT_INDEX, (saltErr, salt) => {
        if( saltErr ) {
            console.error(saltErr);
            return next(saltErr);
        }
        console.info('SALT GENERATED', salt);

        // hashing this bad boy!
        bcrypt.hash(user.uPassword, salt, (hashErr, hashedPassword) => {
            if( hashErr ) {
                console.error(hashErr);
                return next(hashErr);
            }
            // override the plain text password with the hashed one.
            user.uPassword = hashedPassword;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);
