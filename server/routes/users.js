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
let cron = require('node-cron');
const keys=require('../keys')

cron.schedule('0 0 * * *', () => {
    try{
    User.updateMany({admin:false},{workingToday:false},
        (err, docs)=>{
        if (err){
            console.log(err)
        }
    })
.exec();
    console.log('running a task every minute');
    } catch (err) {
        console.log('cant restart working today');
    }
});

function createUser(user){
    var users_ ={
         id: user.id,
         name: user.name,
         password: user.password,
         email: user.email,
         // googleId:{ type: String, unique: true,required:false },
         admin:user.admin,
         googleId:user.googleId,
         address:user.address,
         resetcode:user.resetcode,
         phoneNumber:user.phoneNumber,
         lon:user.lon,
         lat:user.lat,
         workingToday:user.workingToday,
         img:user.img,
    };

    User.CREATE([
         users_.id,
         users_.name,
         users_.password,
         users_.email,
         users_.googleId,
         users_.admin,
         users_.address,
         users_.resetcode,
         users_.phoneNumber,
         users_.lon,
         users_.lat,
         users_.workingToday,
         users_.img,
    ]);
}
var transporter = nodemailer.createTransport({
    tls: {
        rejectUnauthorized: false
    },
     host: 'smtp.gmail.com',
    secure: false,
    service: 'gmail',
    auth: {
      user: 'internetengineer55@gmail.com',
      pass: keys.USER_PASSWORD,
    }
});

router.post('/addUser', async (req, res) => {
    debug('add user');
    if (req.body.email === undefined || req.body.email === null || req.body.email === "")
        debug("Missing email to add!!!");
    else if (req.body.name === undefined || req.body.name === null || req.body.name === "")
        debug("Missing name for  userto add!!!");
    else {
        let user;
        let a;
        if(req.body.admin=="on"){a=true;}
        else{a=false;}
        try {
            user = await User.findOne({email: req.body.email}).exec();
          
        } catch (err) {
            debug(`get user for adding failure: ${err}`);
        }
       
        if (user === null) 
            try {
                let password=Math.floor(10000000 + Math.random() * 90000000);//random
                console.log("add email")
                let resetCode=Math.floor(Math.random()*100000000);
                var mailOptions = {
                from: 'internetengineer55@gmail.com',
                to: req.body.email,
                subject: 'This is your new password',
                text: 'Welcome to Deliver4You!! this is your new password:'+password.toString()
                };
                User.updateOne({email:req.body.email},{ updated_at:Date.now() },function(err) {
                    if (err) throw err;
                    else
                    {
                        function callback(error, info){
                            if (error) {
                            console.log(error);
                            } else {
                                // res.render('resetPassword',{title:'Reset Password'});
                            console.log('Email sent: ' + info.response);
                            
                            }}
                        transporter.sendMail(mailOptions,callback);
                    
                            
                    }
                })
                console.log(password);
                bcrypt.hash(password, 10,function(err, hash) {
                   createUser({
                        id: req.body.id,
                        name: req.body.name,
                        password: password.toString(),
                        email: req.body.email,
                        googleId:null,
                        admin: false,
                        address:req.body.address,
                        resetcode: "111",
                        phoneNumber:req.body.phoneNumber,
                        lon:req.body.lon,
                        lat:req.body.lat,
                        workingToday:false,
                        img:req.body.img,
                   })
                });
            } catch (err) {
                debug("Error creating a user: " + err);
            }
            else{ debug("user with that mail already exist");}
    }
});
router.post('/updateUser' , async (req, res) => {
    console.log('update user');
    console.log(req.body);
    if (req.body.email === undefined || req.body.email === null || req.body.email === "")
         console.log("Missing email to add!!!");
    else if (req.body.name === undefined || req.body.name === null || req.body.name === "")
         console.log("Missing name for  userto add!!!");
    else {
        try {
            userwithId = await User.findOne({id: req.body.id}).exec();
            
        } catch (err) {
         console.log(`get user for adding failure: ${err}`);
        }
        User.updateOne(
                {id: req.body.id},
                {name:req.body.name, email:req.body.email, phoneNumber:req.body.phoneNumber,address:req.body.address,img:req.body.img},
                (err, docs)=>{
                    if (err){
                        console.log(err)
                    }
                })
            .exec();
    }
});

router.delete('/deleteUser', async (req, res) => {
    
    User.deleteOne({id: req.body.id}).then(function(){
    }).catch(function(error){
        console.log(error); // Failure
    });
});
//-----------list 
router.post('/listUsers', async (req, res) => {
    debug('request user list');
    console.log('request user list')
    try {
        let users=await User.find({});
        users=users.filter(user=>user.admin==false).map(user =>
            ({id: user.id, name: user.name,phoneNumber:user.phoneNumber, email: user.email,address:user.address,workingToday:user.workingToday,img:user.img}));
        res.send({users});
      
      
    } catch (err) { debug(`get users failure: ${err}`); }
});
router.post('/getUserByEmail', async (req, res) => {
    console.log('request user by email')
    try {
       console.log(req.body.email)
       let user=await User.findOne({email:req.body.email});
       console.log(user)
       res.send({user:user}); 
    } catch (err) { debug(`get user failure: ${err}`); }
});
router.post('/getUserById', async (req, res) => {
    console.log('request user by id')
    try {
       let user=await User.findOne({id:req.body.id});
       console.log(user)
       res.send({user:user}); 
    } catch (err) { debug(`get user failure: ${err}`); }
});
//----------other



router.post('/updateWorkingToday' , async (req, res) => {
    console.log('update user');
    console.log(req.body);
    if (req.body.email === undefined || req.body.email === null || req.body.email === "")
         console.log("Missing email to add!!!");
    else if (req.body.name === undefined || req.body.name === null || req.body.name === "")
         console.log("Missing name for  userto add!!!");
    else {
        try {
            userwithId = await User.findOne({id: req.body.id}).exec();
            
        } catch (err) {
         console.log(`get user for adding failure: ${err}`);
        }
        User.updateOne(
                {id: req.body.id},
                {name:req.body.name, email:req.body.email, phoneNumber:req.body.phoneNumber,address:req.body.address,workingToday:req.body.workingToday},
                (err, docs)=>{
                    if (err){
                        console.log(err)
                    }
                })
            .exec();
    }
});
router.get("/friends/:userId", async (req, res) => {
    try {
        console.log(req.params.userId)
      const user = await User.findOne({id:req.params.userId});
      let friends = await User.find({});
      if(user.admin==true){//friends of admin-all
        friends=friends.filter(user=>user.id!=req.params.userId).map(user =>
            ({id: user.id, username: user.name,img:user.img}));
      }else{//friends of volunteer-managers-admin
        friends=friends.filter(user=>user.admin==true && user.id!=req.params.userId).map(user =>
            ({id: user.id, username: user.name,img:user.img}));
      }
      res.send({data:friends})
    } catch (err) {
      res.status(500).json(err);
    }
  });


  module.exports = router;