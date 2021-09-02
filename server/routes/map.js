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

//--------------map----------------------------

router.post('/getMarkermap', async (req, res) => {
    console.log('request Package list')
   //  createPackage();
    try {
        let packages=await Package.find({});
        const isadmin=req.body.admin
        const email=req.body.email
        let user= await User.findOne({email:email});
        let givenDate=new Date(req.body.date)
           console.log(givenDate.toLocaleString().split(',')[0]);
        if(user.admin==true){
           console.log('isadmin')
           // packages.forEach(el=>{
           //    console.log( (new Date(el.arrivalDate)).toLocaleString().split(',')[0])
           // })
           packages=packages.filter(package=> (new Date(package.arrivalDate)).toLocaleString().split(',')[0]== givenDate.toLocaleString().split(',')[0]).map(package =>
            ({address:package.address, isSent: package.isSent,arrivalDate:package.arrivalDate,lon:package.lon,lat:package.lat,volunteerId:package.volunteerId}));
        }else{
           console.log('volunteer')
           packages=packages.filter(package=>package.volunteerId==user.id && (new Date(package.arrivalDate)).toLocaleString().split(',')[0]== givenDate.toLocaleString().split(',')[0]).map(package =>
           ({address:package.address,isSent: package.isSent,arrivalDate:package.arrivalDate,lon:package.lon,lat:package.lat,volunteerId:package.volunteerId }));         }
       // console.log(packages);
       res.send({packages});
      
      
    } catch (err) { debug(`get packages failure: ${err}`); }
});


router.post('/assignVolunteers', async (req, res) => {
    console.log('assignVolunteers')
    //אשכולות 
    let packages = await Package.find({});
    const volunteers = await User.find({workingToday:true,admin:false});
    let data=[]
    packages.forEach(el=>{
        console.log((new Date (req.body.date)).toLocaleDateString('en-GB'),(el.arrivalDate).toLocaleString().split(',')[0])
        if((el.arrivalDate).toLocaleString().split(',')[0]==(new Date (req.body.date)).toLocaleDateString('en-GB')){
            data.push(el)
        }
    })
    console.log(data)
      // Create the data 2D-array (vectors) describing the data
    let vectors = new Array();
    for (let i = 0 ; i < data.length ; i++) {
        // console.log(parseFloat(data[i]['lon']), parseFloat(data[i]['lat']))
    vectors[i] = [ parseFloat(data[i]['lat']) , parseFloat(data[i]['lon'])];
    }
    
    const kmeans = require('node-kmeans');
    const haversine = require('haversine')
    let k=data.length>4?4:data.length;
    kmeans.clusterize(vectors, {k: k}, async (err,res) => {
    if (err) console.error(err);
    else {
        console.log('%o',res);     
        res.forEach(cluster=>{
            let min=Number.MAX_SAFE_INTEGER;
            let minVolunteer={}
            volunteers.forEach((volunteer)=>{
                let distance=haversine({latitude: cluster.centroid[0],longitude:cluster.centroid[1]}, {latitude: parseFloat(volunteer.lat) , longitude: parseFloat(volunteer.lon)})
                if(distance<min){
                    min=distance
                    minVolunteer=volunteer.id
                }
            })
            cluster.clusterInd.forEach(index=>{
                console.log(data[index])
                try {
                    Package.updateOne(
                        {id: data[index].id},
                        {volunteerId:minVolunteer},
                        (err, docs)=>{
                            if (err){
                                console.log(err)
                            }
                        })
                    .exec();
                    } catch (err) {
                        console.log(`get user for adding failure: ${err}`);
                    }
            })
        })
    }
    });
 });


 module.exports = router;