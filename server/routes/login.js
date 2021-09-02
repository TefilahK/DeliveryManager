const express = require('express');
const router = express.Router();
const User = require('../model')("User");
const Package = require('../model')("Package");
const Post = require('../model')("Post");
const Message = require('../model')("Message");
var nodemailer = require('nodemailer');

const debug = require('debug')('lab7:login');
let passport=require('passport');
const { session } = require('passport');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { get } = require('.');
const bodyParser = require("body-parser");
const { request } = require('../app');
const user = require('../model/user');

//----------login----------------------------
router.post('/', async  function (req, res, next) {
    const isadmin=req.body.admin
    // createUser();
    passport.authenticate('local',
     function (err, user, info) {
    if (err) {  
       console.log('error');
         res.sendStatus(404) }
    else if (!user) {
         console.log('bad');
         res.sendStatus(404);
        }
    else {
         req.login(user, function (err) {
             console.log('good');
             if (err) {  res.sendStatus(404); }
             console.log(user.admin)
           res.send({ status:200, type:user.admin,id:user.id});
    });
    }
   })(req, res, next);}
);
router.use(bodyParser.json());
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
    res.send({ status:200, type:req.user.admin})
 });

 module.exports = router;