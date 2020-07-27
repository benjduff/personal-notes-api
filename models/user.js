const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    } 
})

const User = module.exports = mongoose.model('User', UserSchema);


//register user
module.exports.registerUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

//check username exists
module.exports.validateUsername = function(username, callback){
    User.find({username: username}, callback);
}
//check email exists
module.exports.validateEmail = function(email, callback){
    User.find({email: email}, callback);
}

//find a user by their username, 
module.exports.findUserByUsername = function(username, callback){
    User.find({username: username}, callback);
}