const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User=require('../model')("User");


passport.use(new GoogleStrategy({
  clientID: '89937054961-pjirtcn32cn53prhutk1u8n60p547vvo.apps.googleusercontent.com',
  clientSecret: 'S0KcDdq1Ou9xl8zQBi8IiJkS',
  // callbackURL: "/aouth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("in google passport")
    User.findOne({googleId: profile.id}).then((currentUser)=>{
      console.log("in google passport")
      if(currentUser){
        //if we already have a record with the given profile ID
        done(null, currentUser);
      } else{
          let password=Math.floor(10000000 + Math.random() * 90000000);//random
          console.log(password);
           //if not, create a new user 
          new User({
            id: uuidv4(),
            name: profile.name.givenName,
            password:password.toString(),
            email: profile.emails[0].value,
            googleId:profile.id,
            admin: false,
            address:null,
            resetcode: "111",
            phoneNumber:null,
 
          }).save().then((newUser) =>{
            console.log("new user")
            done(null, newUser);
          });
       } 
    
  });
      }
    ));
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
      User.findById(id).then(user => {
        done(null, user);
      });
    });
    
    