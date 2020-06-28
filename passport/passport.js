const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../Models/Users");
const { Strategy } = require("passport");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// Authorisation
passport.use(
  new Strategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "eatPizza",
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

// Authenticated local strategy using email and passport
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!err) return done(null, false);
      user.comparePassword(password, done);
    });
  })
);
