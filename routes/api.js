
// Dependencies
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Facebook = require('facebook-node-sdk');
var path = require('path');

// Models
var Events = require('../models/event');
var Chokes = require('../models/choke');
var User = require('../models/user');

// Routes
Events.methods(['get', 'put', 'post', 'delete']);
Events.register(router, '/events');
Chokes.methods(['get', 'put', 'post', 'delete']);
Chokes.register(router, '/chokes');

  //Fail & Success
  router.get('/index', function(req, res){
    res.json({
      content : "Autentication success !"
    });
  });

  router.get('/fail', function(req, res){
    res.json({
      content : "Autentication failed ! "
    });
  })

  //Passport
  router.get('/auth/facebook', passport.authenticate('facebook', {scope : ['email'] } ));

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/api/index',
                                        failureRedirect: '/api/fail' }));

  //Facebook SDK
  router.get('/facebook', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
  });

// Return router
module.exports = router;
