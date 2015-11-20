
// Dependencies
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Wreck = require('wreck');
var Ajax = require('simple-ajax');



// Models
var Events = require('../models/event');
var Chokes = require('../models/choke');
var User = require('../models/user');

// Routes
Events.methods(['get', 'put', 'post', 'delete']);
Events.register(router, '/events');
Chokes.methods(['get', 'put', 'post', 'delete']);
Chokes.register(router, '/chokes');

router.post('/events/', function(req, res){
  var token = req.body.token;
  var id = req.body.id;
  //Call Facebook API

});

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
  router.get('/auth/facebook', passport.authenticate('facebook', {scope : ['email', 'user_events'] } ));

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/api/index',
                                        failureRedirect: '/api/fail' }));

  //Facebook SDK
  router.get('/facebook', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
  });

  //Data handling for user
  //Here, we need a session. It's EXTREMELY important !
  router.get('/myEvents', function(req, res){
    sessionID = "10206500617488421"; //TEMPORARY, WE NEED THAT SESSION SYSTEM (cookie?)
    	User.findOne({'fbID': sessionID}, function(err, user){
        if(err){
          console.log(err);
        }else if(user){
          res.json({
            events : user.events
          });
        }else{
          res.json({
            err : "No profile found"
          });
        }
      });
  });

  router.get('/attendingUsers/:id', function(req, res){
    var eventID = req.params.id;
    var sessionID = "10206500617488421";
    User.findOne({'fbID': sessionID}, function(err, user){
      console.log(user.token);
      var uri = "https://graph.facebook.com/"+eventID+"?access_token="+user.token;
      console.log(uri);

      // GET Request in native JavaScript
      var xhr = new XMLHttpRequest();
      xhr.open('GET', encodeURI(uri));
      xhr.onload = function() {
          if (xhr.status === 200) {
              console.log(xhr.responseText);
              res.json(xhr.responseText);
          }
          else {
              console.log('Request failed.  Returned status of ' + xhr.status);
          }
      };
      xhr.send();
    });
  });

// Return router
module.exports = router;
