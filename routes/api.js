
// Dependencies
var express = require('express');
var router = express.Router();
var passport = require('passport');
var facebook = require('passport-facebook');

// Models
var Events = require('../models/event');
var Chokes = require('../models/choke');
var User = require('../models/user');

// Routes
Events.methods(['get', 'put', 'post', 'delete']);
Events.register(router, '/events');
Chokes.methods(['get', 'put', 'post', 'delete']);
Chokes.register(router, '/chokes');

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

router.get('/auth/facebook', passport.authenticate('facebook', {scope : ['email'] } ));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/api/index',
                                      failureRedirect: '/api/fail' }));

// Return router
module.exports = router;
