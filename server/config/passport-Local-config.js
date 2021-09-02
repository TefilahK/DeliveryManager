var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const User=require('../model')("User");
const bcrypt = require('bcrypt');


passport.use(new LocalStrategy(
{
  usernameField:'emailAddress',
  passwordField:'password',
  passReqToCallback: true
},
  function authenticateUser (req,emailAddress, password, done) {
    User.findOne({ email: emailAddress }, function(err, user) {
      if (err) { return done(err); }
      console.log("in local ")
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      console.log("in local ")
      // password=rsa.decrypt(password)
      bcrypt.compare(password, user.password, function(err, result) {
        if(result==false){
          return done(null, false, { message: 'Incorrect password.' });
        }else{
          return done(null, user);
        }

    });
    
      
       
      
     
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});