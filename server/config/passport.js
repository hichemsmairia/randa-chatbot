const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/dev");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
  passport.use(
    new GoogleStrategy(
     {
      clientID: "GOOGLE_CLIENT_ID",
      clientSecret: "GOOGLE_CLIENT_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback"
     },
     function(accessToken, refreshToken, profile, done) {
      var user = {
       email: profile.emails[0].value,
       name: profile.displayName,
       token: accessToken
      };
      done(null, user);
     }
    )
   );
};
