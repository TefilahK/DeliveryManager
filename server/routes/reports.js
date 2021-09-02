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



//-----------reports-------------
router.post('/pieChart/:time', async (req, res) => {  
    try {
        let packages=await Package.find({});
        let time=req.params.time;//0,7,30
        console.log(time);
        let end=new Date().toLocaleDateString('en-GB') //1 FEb
        end=end.split("/")
        console.log(end)
        let start=new Date();
        
        start.setDate(start.getDate()-time);//30 Jan
        start=start.toLocaleDateString('en-GB');
        start=start.split("/")
        console.log(start)
        let sent=0;
        let notSent=0;
        packages.forEach(package =>{
            let packageTime=(package.arrivalDate).toLocaleString().split(',')[0];
            packageTime=packageTime.split("/")
            console.log(packageTime)
            if(parseInt(packageTime[2])>=parseInt(start[2]) && parseInt(packageTime[2])<=parseInt(end[2])){
                let monthForPackage=(parseInt(packageTime[2])-parseInt(start[2]))*12;
                let monthForEnd=(parseInt(end[2])-parseInt(packageTime[2]))*12;
                if(parseInt(packageTime[1])+monthForPackage>=parseInt(start[1]) && parseInt(packageTime[1])<=parseInt(end[1])+monthForEnd){
                    let daysForPackage=(parseInt(packageTime[1])-parseInt(start[1]))*30;
                    let daysForEnd=(parseInt(end[1])-parseInt(packageTime[1]))*30;
                    if(parseInt(packageTime[0])+daysForPackage>=parseInt(start[0]) && parseInt(packageTime[0])<=parseInt(end[0])+daysForEnd){
                        console.log("is in between")
                        if(package.isSent==true){
                            sent+=1
                        }else{
                            notSent+=1;
                        }

                    }
                }

            }
           
        })
        console.log("finally!!")
        console.log(sent,notSent);
        let notYetSent=packages.length-sent-notSent
        console.log(notYetSent);
       res.send({pieChart:[["sent",sent],["notSent",notSent]]})
      
    } catch (err) { debug(`get packages failure: ${err}`); }
});
router.post('/barChart/:time', async (req, res) => {  
    try {
        let packages=await Package.find({});
        let time=req.params.time;//0,7,30
        console.log(time);
        let end=new Date().toLocaleDateString('en-GB') //1 FEb
        end=end.split("/")
        console.log(end)
        let start=new Date();
        
        start.setDate(start.getDate()-time);//30 Jan
        start=start.toLocaleDateString('en-GB');
        start=start.split("/")
        console.log(start)
        let sent=0;
        let notSent=0;
        let dict={};
        packages.forEach(package =>{
            console.log(package.address.split(",")[1])
            dict[package.address.split(",")[1]]=dict[package.address.split(",")[1]]==null?[0,0]:dict[package.address.split(",")[1]]
                        
            let packageTime=(package.arrivalDate).toLocaleString().split(',')[0];
            packageTime=packageTime.split("/")
            console.log(packageTime)
            if(parseInt(packageTime[2])>=parseInt(start[2]) && parseInt(packageTime[2])<=parseInt(end[2])){
                let monthForPackage=(parseInt(packageTime[2])-parseInt(start[2]))*12;
                let monthForEnd=(parseInt(end[2])-parseInt(packageTime[2]))*12;
                if(parseInt(packageTime[1])+monthForPackage>=parseInt(start[1]) && parseInt(packageTime[1])<=parseInt(end[1])+monthForEnd){
                    let daysForPackage=(parseInt(packageTime[1])-parseInt(start[1]))*30;
                    let daysForEnd=(parseInt(end[1])-parseInt(packageTime[1]))*30;
                    if(parseInt(packageTime[0])+daysForPackage>=parseInt(start[0]) && parseInt(packageTime[0])<=parseInt(end[0])+daysForEnd){
                        console.log("is in between")
                        if(package.isSent==true){
                            dict[package.address.split(",")[1]][0]+=1
                            
                        }else{
                            dict[package.address.split(",")[1]][1]+=1;
                            
                        }

                    }
                }

            }
           
        })
        let answer=[]
        Object.keys(dict).map(function(key, index) {
            answer.push([key,dict[key][0],dict[key][1]])
        });
        console.log("finally!!")
        console.log(answer)
       res.send({barChart:answer})
      
    } catch (err) { debug(`get packages failure: ${err}`); }
});

module.exports = router;