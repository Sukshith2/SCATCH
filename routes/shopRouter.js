const express = require('express');
const isLogin = require('../middlewares/isLogin');
const productModel = require('../models/product_model');
const userModel = require('../models/user_model');

const router = express.Router();

router.get("/", isLogin, async (req, res) => {
  try {
    let products = await productModel.find(); 
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("productshop", { products, error, success});  
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load products");
    res.redirect("/");
  }
});

router.get("/addtocart/:productid", isLogin, async (req, res) => {
  try {
    let user= await userModel.findOne({email:req.user.email});
    console.log(user); 
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Add to Cart");
    res.redirect("/shop");    
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to Add");
    res.redirect("/");
    
  }


});

router.get("/cart", isLogin, async (req, res) => {
  let user = await userModel.findOne({email:req.user.email})
  .populate("cart");
  let error = req.flash("error");
    let success = req.flash("success");
    res.render("cart", {user, error, success});  
  });

router.get("/users/logout", isLogin, async (req, res) => {
     req.flash("success", "LogOut successfully");
     res.cookie("token", "");
    res.redirect("/");
     
})






module.exports = router;