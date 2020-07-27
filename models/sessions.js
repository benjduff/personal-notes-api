const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
        index: {
            expires: 1800
        }
    },
    user: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

const Session = module.exports = mongoose.model('Session', SessionSchema);

//save session to Sessions collection
module.exports.createSession = function(newSession, callback){
    newSession.save(callback);
}

//find a session with the corresponding token
module.exports.validateToken = function (token, callback){
    Session.find({token: token}, callback); 
}