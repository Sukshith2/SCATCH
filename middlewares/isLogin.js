const jwt = require('jsonwebtoken');
const userModel = require('../models/user_model');
const ownersModel = require('../models/owners_model');

module.exports = async (req, res, next) => {
  const token = req.cookies?.token; 

  if (!token) {
    req.flash("error", "You need to login first");
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Find user or owner
    const user = await userModel.findOne({ email: decoded.email }).select("-password");
    const owner = await ownersModel.findOne({ email: decoded.email }).select("-password");

    req.user = user;
    req.owner = owner;

    next();

  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
};
