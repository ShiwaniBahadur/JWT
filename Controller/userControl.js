require('../Model/userModel');
require('../Config/passportConfig');
const mongoose = require('mongoose');
const passport = require('passport');
var user = mongoose.model('user');

var jwt = require('jsonwebtoken');
var _ = require('lodash');

module.exports.addNewUser = (req, res) => {
    var newUser = new user({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password
    });
    return newUser.save().then((docs)=>{
        res.status(200).json({
            success: true,
            message: "User added successfully",
            user: docs
        });
    }).catch((err)=>{
        res.status(401).json({
            success: false,
            error: err.message,
            message: "Failed to add new user"
        });
    });
};


module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return res.status(404).json(err);
        if(user) return res.status(200).json({
            "token": jwt.sign({id: user._id},
            "JWTAuthenticate",
            {
                expiresIn: "60m"
            }) 
        })
        if(info) return res.status(401).json(info);
    }) (req, res, next);
}

module.exports.userProfile = (req, res) =>{
    user.findOne({_id: req._id}).then((user)=>{
        res.status(200).json({
            success: true,
            message: "User Found",
            data: _.pick(user, ['name', 'email'])
        });
    }).catch((err)=>{
        res.status(404).json({
            succes: false,
            message: "User not Found",
            error: err.message
        });
    })
}