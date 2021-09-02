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


function createPost(_post){
    console.log("in create post")
     var post ={
        title:_post.title,
        post:_post.post,
        authorName:_post.authorName,
        authorImg:_post.authorImg,
        img:_post.img,
        date:_post.date,
     };
     console.log("in create post")
     Post.CREATE([
        post.title,
        post.post,
        post.authorName,
        post.authorImg,
        post.img,
        post.date
             
     ])
     console.log("in create post")
}
router.post('/addPost', async (req, res) => {
    console.log('add post');
    if (req.body.post === undefined || req.body.post === null || req.body.post === "")
        debug("Missing products to add!!!");
    else if (req.body.title === undefined || req.body.title === null || req.body.title === "")
        debug("Missing address for  package!!!");
    else {
       let user;
       try {
           console.log(req.body.authorEmail)
           user= await User.findOne({email:req.body.authorEmail}).exec();
       }catch{
           console.log("cant find post user email!")
       }
       if(user!=null){
       try {
       console.log('in create post');
       console.log(req.body);
       console.log(user);
       let post={
           title:req.body.title,
           post:req.body.post,
           authorName: user.name,
           authorImg:user.img,
           img:req.body.postImg,
           date:new Date(),
       }
       console.log('after declare post');
       createPost(post)
       console.log('in create post');
       res.send({status:200,post})
       } catch (err) {
           debug("Error creating a package: " + err);
       }
   }
    }
});
router.post('/listPosts', async (req, res) => {
    console.log('request post list')
    try {
        let posts=await Post.find({});
        posts=posts.map(post =>
            (post));
       console.log(posts)
        res.send({posts});
      
      
    } catch (err) { debug(`get users failure: ${err}`); }
});

module.exports = router;