const express = require('express');
const isLogin = require('../middlewares/isLogin');
const userModel = require('../models/user_model');

const router = express.Router();

router.get("/", isLogin, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    console.log(user);
    res.render("profile", { user }); 

  } catch (error) {
    console.error(error);
    req.flash("error", "Profile error");
    res.redirect("/");
  }
});


module.exports = router;