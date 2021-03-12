require('../Model/userModel');
var passport = require('passport');
var localPassport = require('passport-local').Strategy;
const mongoose = require('mongoose');
var user = mongoose.model('user');

passport.use(
    new localPassport({usernameField: 'email'}, 
    (username, password, done) => {
        user.findOne({email: username}, (err, user) => {
            if(err)
            return done(err);
            else if(!user)
            return done(null, false, {message: "Username not found"});
            else if(!user.verifyPassword(password))
            return done(null, false, {message:"Wrong Password"});
            else
            return done(null ,user);
        });
    })
);
