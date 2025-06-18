const express = require('express');

const router = express.Router();
const { adminAuth, adminlogAuth } = require('../controllers/ownerAuth');
const isLogin = require('../middlewares/isLogin');

router.get("/", (req, res)=>{
     let success = req.flash("success");
      let error = req.flash("error");
    res.render("owner", {error, success});
     
});

router.get("/admin", (req,res)=>{
     let success = req.flash("success");
      let error = req.flash("error");
    res.render("createproduct", {success, error});
})
  
router.post("/admin", adminAuth);
router.post("/login", adminlogAuth);




module.exports = router;