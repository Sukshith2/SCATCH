const ownerModel = require('../models/owners_model');
const bcrypt = require('bcrypt');
const { generateownerToken } = require('../utilits/generateToken');


module.exports.adminAuth = async(req, res)=>{ 
    let {name, email, password, product, picture, gstn} = req.body;
   let onwers = await ownerModel.find();
   if(onwers.length > 0){
    req.flash("error", "you dont have permission to create");
   }
     bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(password, salt, async (err, hash)=>{
          if(err){
              return res.send(err.message); 
          }else {
                req.flash("success", "Admin Created Sucessfully");

                  let owner = await ownerModel.create({ name, email, password:hash, gstn});
                  let token = generateownerToken(owner);
              res.cookie("token", token);
              res.redirect("/");
          }
              });
     });
   
   
}

module.exports.adminlogAuth  = async (req, res)=>{
    let {email, password} = req.body;
    let owner = await ownerModel.findOne({email});
    if(!owner){
        req.flash("error", "Please register First");
    }
    bcrypt.compare(password, owner.password, (err, result)=>{
        if(result){
             req.flash("success", "Admin Login Sucessfully");
            let token = generateownerToken(owner);
            res.cookie("token", token);
            res.redirect('/owner/admin')
                                  
        }else{
        req.flash("error", "Admin Password and Email Wrong");

        }


    })



}

