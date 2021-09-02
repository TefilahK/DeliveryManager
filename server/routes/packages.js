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

function createPackage(package){
    var users_ ={
        id: package.id,
        products: package.products,
        address: package.address,
        arrivalDate:package.arrivalDate,
        isSent:package.isSent,
        volunteerId:package.volunteerId,
        lon:package.lon,
        lat:package.lat
    };

    Package.CREATE([
         users_.id,
         users_.products,
         users_.address,
         users_.arrivalDate,
         users_.isSent,
         users_.volunteerId,
         users_.lon,
         users_.lat,
    ]);
}
router.post('/addPackage', async (req, res) => {
    console.log('add package');
    if (req.body.products === undefined || req.body.products === null || req.body.products === "")
        debug("Missing products to add!!!");
    else if (req.body.address === undefined || req.body.address === null || req.body.address === "")
        debug("Missing address for  package!!!");
    else {
        let package;
        try {
            package = await Package.findOne({id: req.body.id}).exec();
        } catch (err) {
            console.log(`get package for adding failure: ${err}`);
        }
        if (package === null) 
            try {
               console.log('in create package');
            //    let closestVolunteer='111'//בחירה לפי אשכולות 
                let newId=Math.floor(10000000 + Math.random() * 90000000)
                   let filledPackage={
                      id:newId,
                      products: req.body.products,
                      address:req.body.address,
                      arrivalDate:req.body.arrivalDate,
                      isSent:Boolean.parseBoolean(req.body.isSent),
                      volunteerId:null,
                      lon:req.body.lon,
                      lat:req.body.lat,
                     
                 }
                createPackage(filledPackage)
               res.send({status:200,packages:filledPackage})
            } catch (err) {
                debug("Error creating a package: " + err);
            }
            else{ debug("package with that mail already exist");}
    }
});


router.post('/updatePackage' , async (req, res) => {
    console.log('update package');
    if (req.body.products === undefined || req.body.products === null || req.body.products === "")
         console.log("Missing products to add!!!");
    else if (req.body.id === undefined || req.body.id === null || req.body.id === "")
         console.log("Missing id for package add!!!");
    else {
        try {
            packagewithId = await Package.findOne({id: req.body.id}).exec();
            
        } catch (err) {
         console.log(`get user for adding failure: ${err}`);
        }
       if(packagewithId!=null){
           Package.updateOne(
                   {id: req.body.id},
                   {products:req.body.products,address:req.body.address,arrivalDate:req.body.arrivalDate,isSent:req.body.isSent},
                   (err, docs)=>{
                       if (err){
                           console.log(err)
                       }
                   })
               .exec();
       }
    }
});



router.delete('/deletePackage', async (req, res) => {
    
    Package.deleteOne({id: req.body.id}).then(function(){
    }).catch(function(error){
        console.log(error); // Failure
    });
});

//-------list

router.post('/listPackages', async (req, res) => {
    console.log('request Package list')
   //  createPackage();
    try {
        let packages=await Package.find({});
        const isadmin=req.body.admin
        const email=req.body.email
        if(isadmin=="true"){
           console.log('isadmin')
           packages=packages.map(package =>
            ({id: package.id, products: package.products,address:package.address,isSent:package.isSent, arrivalDate:package.arrivalDate,volunteerId:package.volunteerId,lon:package.lon,lat:package.lat }));
        }else{
           console.log('volunteer')
           let volunteer= await User.findOne({email:email});
           packages=packages.filter(package=>package.volunteerId==volunteer.id && package.isSent==false).map(package =>
               ({id: package.id, products: package.products,address:package.address,isSent:package.isSent.toString(), arrivalDate:package.arrivalDate,volunteerId:package.volunteerId,lon:package.lon,lat:package.lat }));
        }
       // console.log(packages);
       res.send({packages});
      
      
    } catch (err) { debug(`get packages failure: ${err}`); }
});


router.post('/sentPackage' , async (req, res) => {
    console.log("in sentPackages")
    if (req.body.id === undefined || req.body.id === null || req.body.id === "")
          console.log("Missing id to add!!!");
     else if (req.body.isSent === undefined || req.body.isSent === null || req.body.isSent === "")
          console.log("Missing isSent!!!");
    else {
        try {
        Package.updateOne(
            {id: req.body.id},
            {isSent:req.body.isSent},
            (err, docs)=>{
                if (err){
                    console.log(err)
                }
            })
        .exec();
        } catch (err) {
            console.log(`get user for adding fai