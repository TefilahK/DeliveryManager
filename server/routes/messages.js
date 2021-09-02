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

//---------message-----------------
router.post("/messages/", async (req, res) => {
    try {
        Message.CREATE([req.body.date,req.body.sender,req.body.receiver,req.body.text,false])
        res.send({data:{date:req.body.date,sender: req.body.sender,text: req.body.text}});
    } catch (err) {
        debug("Error creating a package: " + err);
    }
  });
  
  
  router.post("/Listmessages", async (req, res) => {
     
    try {
      let messages = await Message.find({
      });
      console.log(req.body.receiverId)
    messages= messages.filter(message=> message.sender==req.body.receiverId && message.receiver==req.body.contactId || message.receiver==req.body.receiverId && message.sender==req.body.contactId ).map(message=>{ 
        try {
            Message.updateMany(
                {_id:message._id},
                {read:true},
                (err, docs)=>{
                    if (err){
                        console.log(err)
                    }
                })
            .exec();
            } catch (err) {
                console.log(`get user for adding failure: ${err}`);
            }
         
    return message})
    res.send({data:messages})
    } catch (err) {
    res.status(500).json(err);
    }
    
  });
  router.post("/findUnreadMessages", async (req, res) => {
     
    try {
      let messages = await Message.find({});
      
      messages= messages.filter(message=> message.read==false && message.receiver==req.body.userId).map(message=> message)
      res.send({data:messages})
    } catch (err) {
      res.status(500).json(err);
    }
  });


  module.exports = router;