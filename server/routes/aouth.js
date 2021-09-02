const express = require('express');
const { get } = require('.');
const { render } = require('../app');
const router = express.Router();
const debug = require('debug')('lab7:login');
let passport=require('passport');
const { session } = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
] }));


router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
     req.session.count=0;
     req.session.userName=req.user.username;
    res.redirect('/');
  });

 






module.exports = router;