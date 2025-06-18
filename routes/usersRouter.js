const express = require('express');
const router = express.Router();
const userModel = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const { newRegist, loginUsers, logOut } = require('../controllers/userAuth');
const isLogin = require('../middlewares/isLogin');


router.get("/", (req, res)=>{
    let success = req.flash("success");
    let error = req.flash("error");
    res.render("index", {error, success, loggedin:false});
})
router.post("/register", newRegist)
router.post("/login", loginUsers)
router.get('/logout', logOut)


module.exports = router;