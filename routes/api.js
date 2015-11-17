
// Dependencies
var express = require('express');
var router = express.Router();
var passport = require('passport');

// Models
var Events = require('../models/event');
var Chokes = require('../models/choke');

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

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/index',
                                      failureRedirect: '/fail' }));

// Return router
module.exports = router;
