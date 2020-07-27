const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Session = require('../models/sessions');

//check username already exists and set query callback
exports.validateUsername = function (req, res, next) {
    const username = req.body.username;
    User.validateUsername(username, (err, userArr) => {
        if (err) {
            res.status(400).json({ msg: 'Error: ' + err });
        } else {
            userArr.length >= 1 ? res.status(409).json({ msg: 'Username taken' }) : next();
        }
    })
}

//check email already exists and set query callback
exports.validateEmail = function (req, res, next) {
    const email = req.body.email;

    User.validateEmail(email, (err, userArr) => {
        if (err) {
            res.status(400).json({ msg: 'Error: ' + err });
        } else {
            userArr.length >= 1 ? res.status(409).json({ msg: 'An account is already registered with this email.' }) : next();
        }
    })
}

//register user and set query callback
exports.register = function (req, res) {
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    //pass newUser object to user model registerUser func
    User.registerUser(newUser, (err) => {
        //check for error otherwise redirect
        if (err) {
            res.status(400).json({ msg: 'Error: ' + err });
        } else {
            //res.status(201).json({msg: 'User registered successfully'});
            const token = jwt.sign({
                username: newUser.username
            },
                config.JWT_KEY,
                {
                    expiresIn: "2hr"
                })
            res.status(200).json({ token: token });
        }
    })
}

//Authenticate existing user and set query callback
exports.login = function (req, res) {
    //Use username as unique id to find account in db
    User.findUserByUsername(req.body.username, (err, matchedUser) => {
        if (err || matchedUser < 1) {
            res.status(401).json({ msg: 'Incorrect username or password.' });
        } else {
            //compare password to hashed password, assign 2hr auth token if match
            bcrypt.compare(req.body.password, matchedUser[0].password, (err, isMatch) => {
                if (err || isMatch < 1) res.status(401).json({ msg: 'Incorrect username or password.' });
                if (isMatch) {
                    const token = jwt.sign({
                        username: matchedUser.username
                    },
                        config.JWT_KEY,
                        {
                            expiresIn: "30m"
                        });
                    const newSession = new Session({
                        user: matchedUser[0]._id,
                        token: token
                    });
                    //POST TOKEN TO USER DOC
                    Session.createSession(newSession, (err) => {
                        if (err) { 
                            res.status(401).json({ msg: 'Authentication failed.'}); 
                        } else {
                            res.status(200).json({ token: token });
                        }
                    });
                }
            })
        }
    })
}