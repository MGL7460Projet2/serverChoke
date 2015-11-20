var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
var User = require('../models/user');

//Fonction récursive pour itérer dans l'objet retourné par l'API "Facebook Graph"
var enumerate = function(object){
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      var proto =  Object.getPrototypeOf(object[key]);
        if(proto === String.prototype){
          console.log(key + " : " + object[key]);
        }else{
          enumerate(object[key]);
        }
      }else{
        return;
      }
  }
}

module.exports = function(passport){

  passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

  passport.use(new FacebookStrategy({
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL,
      profileFields: ['emails' , 'name', 'events']
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken, profile._json);
      enumerate(profile._json);

      process.nextTick(function(){
	    		User.findOne({'id': profile.id}, function(err, user){
	    			if(err){
              return done(err);
            }else if(user){
              return done(null, user);
            }else {
	    				var newUser = new User();
	    				newUser.id = profile.id;
	    				newUser.token = accessToken;
	    				newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
	    				newUser.email = profile.emails[0].value;

              console.log(newUser);

	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				})

	    				//console.log(profile);
	    			}
	    		});
	    	});
    }

  ));
}
