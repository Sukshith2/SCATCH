const express = require('express');
const { productauth } = require('../controllers/productsAuth');
const isLogin = require('../middlewares/isLogin');
const router = express.Router();

router.post("/create", productauth);

router.get("/products/create", isLogin, (req, res) => {
  let success = req.flash("success");
  let error = req.flash("error");
  res.render("createproduct", { success, error });
});


module.exports = router;
