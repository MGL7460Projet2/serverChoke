var configAuth = require('./auth');

module.exports = function(passport){
  passport.use(new FacebookStrategy({
      clientID: configAuth.clientID,
      clientSecret: configAuth.clientSecret,
      callbackURL: configAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate(..., function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
    }
  ));
}
