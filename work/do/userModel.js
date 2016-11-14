var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    SALT_INDEX = 10,    // the larger this value is, the stronger the encryption,
                        // but the longer it will take to compare hashes

    UserSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true
        },
        name: String,
        password: String,
        created: {
            type: Number,
            default: () => Date.now()
        }
});
