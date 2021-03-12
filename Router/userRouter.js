var userControl = require('../Controller/userControl');
var express = require('express');
var jwthelper = require('../Config/jwtHelper');
var routes = express.Router();

routes.post('/newUser', userControl.addNewUser);
routes.post('/auth', userControl.authenticate);
routes.get('/profile', jwthelper.verifyToken, userControl.userProfile);

module.exports = routes;
