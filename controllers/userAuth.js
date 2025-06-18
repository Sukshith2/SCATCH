const userModel = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utilits/generateToken');

module.exports.newRegist = async (req, res)=>{
 try {
    let {name, email, password} = req.body;
    let user = await userModel.findOne({email});
    if(user){
       req.flash("error", "Please register First"); 
    }
    
    bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password, salt, async (err, hash)=>{
        if(err){
           req.flash("error", "Please register First"); 
        }else {
                let user = await userModel.create({ name, email, password:hash});
                 req.flash("success", "User created successfully");
                 let token =generateToken(user);
            res.cookie("token", token);
           
           res.redirect('/');
        }
            });
   });
  
 } catch (error) {
    res.send(error.message);    
 }
}



module.exports.loginUsers = async (req, res)=>{
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    if(!user){
        req.flash("error", "Please register First"); 
     }
    bcrypt.compare(password, user.password, (err, result)=>{
        if(result){
req.flash("success", "Login successfully"); 
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
             
                       
        }else{
               req.flash("error", "Password and Email are Incorrect"); 
        }


    })
}


module.exports.logOut = async (req,res)=>{
     req.flash("success", "LogOut successfully");
     res.cookie("token", "");
    res.redirect("/");
     
}