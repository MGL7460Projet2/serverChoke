
// Dependencies
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Wreck = require('wreck');
var Ajax = require('simple-ajax');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


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

  // Here we deal with redirections. If it's a success, need to go to the dashboard route. Else, on the login with fail message.
  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/api/myEvents',
                                        failureRedirect: '/api/fail' }));

  //Facebook SDK
  router.get('/facebook', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
  });

/*  **************  Data handling for user  ************** */
  //Here, we need a session. It's EXTREMELY important !
  router.get('/myEvents', function(req, res){
    sessionID = "10206500617488421"; //TEMPORARY, WE NEED THAT SESSION SYSTEM to get the user id & token (cookie?)
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

  // Gives all infos about an event
  router.get('/event/:id', function(req, res){
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
              res.json(JSON.parse(xhr.responseText));
          }
          else {
              console.log('Request failed.  Returned status of ' + xhr.status);
          }
      };
      xhr.send();
    });
  });

  //Give all attendingUsers on the event corresponding to the ID in URL
  router.get('/event/attending/:id', function(req, res){
    var eventID = req.params.id;
    var sessionID = "10206500617488421";
    User.findOne({'fbID': sessionID}, function(err, user){
      console.log(user.token);
      var uri = "https://graph.facebook.com/"+eventID+"/attending?access_token="+user.token;
      console.log(uri);

      // GET Request in native JavaScript
      var xhr = new XMLHttpRequest();
      xhr.open('GET', encodeURI(uri));
      xhr.onload = function() {
          if (xhr.status === 200) {
              res.json(JSON.parse(xhr.responseText));
          }
          else {
              console.log('Request failed.  Returned status of ' + xhr.status);
          }
      };
      xhr.send();
    });
  });

  //Gives all user who denied the Event
  router.get('/event/declined/:id', function(req, res){
    var eventID = req.params.id;
    var sessionID = "10206500617488421";
    User.findOne({'fbID': sessionID}, function(err, user){
      console.log(user.token);
      var uri = "https://graph.facebook.com/"+eventID+"/declined?access_token="+user.token;
      console.log(uri);

      // GET Request in native JavaScript
      var xhr = new XMLHttpRequest();
      xhr.open('GET', encodeURI(uri));
      xhr.onload = function() {
          if (xhr.status === 200) {
              res.json(JSON.parse(xhr.responseText));
          }
          else {
              console.log('Request failed.  Returned status of ' + xhr.status);
          }
      };
      xhr.send();
    });
  });

  //Gives all user who said maybe to the Event
  router.get('/event/maybe/:id', function(req, res){
    var eventID = req.params.id;
    var sessionID = "10206500617488421";
    User.findOne({'fbID': sessionID}, function(err, user){
      console.log(user.token);
      var uri = "https://graph.facebook.com/"+eventID+"/maybe?access_token="+user.token;
      console.log(uri);

      // GET Request in native JavaScript
      var xhr = new XMLHttpRequest();
      xhr.open('GET', encodeURI(uri));
      xhr.onload = function() {
          if (xhr.status === 200) {
              res.json(JSON.parse(xhr.responseText));
          }
          else {
              console.log('Request failed.  Returned status of ' + xhr.status);
          }
      };
      xhr.send();
    });
  });

  //Gives all user who didn't respond to the Event
  router.get('/event/noreply/:id', function(req, res){
    var eventID = req.params.id;
    var sessionID = "10206500617488421";
    User.findOne({'fbID': sessionID}, function(err, user){
      console.log(user.token);
      var uri = "https://graph.facebook.com/"+eventID+"/noreply?access_token="+user.token;
      console.log(uri);

      // GET Request in native JavaScript
      var xhr = new XMLHttpRequest();
      xhr.open('GET', encodeURI(uri));
      xhr.onload = function() {
          if (xhr.status === 200) {
              res.json(JSON.parse(xhr.responseText));
          }
          else {
              console.log('Request failed.  Returned status of ' + xhr.status);
          }
      };
      xhr.send();
    });
  });

  //Gives all user who didn't respond to the Event
  router.get('/event/interested/:id', function(req, res){
    var eventID = req.params.id;
    var sessionID = "10206500617488421";
    User.findOne({'fbID': sessionID}, function(err, user){
      console.log(user.token);
      var uri = "https://graph.facebook.com/"+eventID+"/interested?access_token="+user.token;
      console.log(uri);

      // GET Request in native JavaScript
      var xhr = new XMLHttpRequest();
      xhr.open('GET', encodeURI(uri));
      xhr.onload = function() {
          if (xhr.status === 200) {
              res.json(JSON.parse(xhr.responseText));
          }
          else {
              console.log('Request failed.  Returned status of ' + xhr.status);
          }
      };
      xhr.send();
    });
  });

  //Gives the picture of the Event
  router.get('/event/picture/:id', function(req, res){
    var eventID = req.params.id;
    var sessionID = "10206500617488421";
    User.findOne({'fbID': sessionID}, function(err, user){
      console.log(user.token);
      var uri = "https://graph.facebook.com/"+eventID+"/picture?type=large&access_token="+user.token;
      console.log(uri);

      // GET Request in native JavaScript
      var xhr = new XMLHttpRequest();
      xhr.open('GET', encodeURI(uri));
      xhr.onload = function() {
          if (xhr.status === 200) {
              res.json(JSON.parse(xhr.responseText));
          }
          else {
              console.log('Request failed.  Returned status of ' + xhr.status);
          }
      };
      xhr.send();
    });
  });

  //Gives the photos published on the Event
  router.get('/event/photos/:id', function(req, res){
    var eventID = req.params.id;
    var sessionID = "10206500617488421";
    User.findOne({'fbID': sessionID}, function(err, user){
      console.log(user.token);
      var uri = "https://graph.facebook.com/"+eventID+"/photos?access_token="+user.token;
      console.log(uri);

      // GET Request in native JavaScript
      var xhr = new XMLHttpRequest();
      xhr.open('GET', encodeURI(uri));
      xhr.onload = function() {
          if (xhr.status === 200) {
              res.json(JSON.parse(xhr.responseText));
          }
          else {
              console.log('Request failed.  Returned status of ' + xhr.status);
          }
      };
      xhr.send();
    });
  });

  //Gives the videos published on the Event
  router.get('/event/videos/:id', function(req, res){
    var eventID = req.params.id;
    var sessionID = "10206500617488421";
    User.findOne({'fbID': sessionID}, function(err, user){
      console.log(user.token);
      var uri = "https://graph.facebook.com/"+eventID+"/videos?access_token="+user.token;
      console.log(uri);

      // GET Request in native JavaScript
      var xhr = new XMLHttpRequest();
      xhr.open('GET', encodeURI(uri));
      xhr.onload = function() {
          if (xhr.status === 200) {
              res.json(JSON.parse(xhr.responseText));
          }
          else {
              console.log('Request failed.  Returned status of ' + xhr.status);
          }
      };
      xhr.send();
    });
  });

  //Gives the roles on the Event's staff
  router.get('/event/roles/:id', function(req, res){
    var eventID = req.params.id;
    var sessionID = "10206500617488421";
    User.findOne({'fbID': sessionID}, function(err, user){
      console.log(user.token);
      var uri = "https://graph.facebook.com/"+eventID+"/roles?access_token="+user.token;
      console.log(uri);

      // GET Request in native JavaScript
      var xhr = new XMLHttpRequest();
      xhr.open('GET', encodeURI(uri));
      xhr.onload = function() {
          if (xhr.status === 200) {
              res.json(JSON.parse(xhr.responseText));
          }
          else {
              console.log('Request failed.  Returned status of ' + xhr.status);
          }
      };
      xhr.send();
    });
  });

  //Gives all admins of the event
  router.get('/event/admins/:id', function(req, res){
    var eventID = req.params.id;
    var sessionID = "10206500617488421";
    User.findOne({'fbID': sessionID}, function(err, user){
      console.log(user.token);
      var uri = "https://graph.facebook.com/"+eventID+"/admins?access_token="+user.token;
      console.log(uri);

      // GET Request in native JavaScript
      var xhr = new XMLHttpRequest();
      xhr.open('GET', encodeURI(uri));
      xhr.onload = function() {
          if (xhr.status === 200) {
              res.json(JSON.parse(xhr.responseText));
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
