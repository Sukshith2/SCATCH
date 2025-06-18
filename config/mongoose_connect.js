const mongoose = require('mongoose');
const dbug = require('debug')("development:mongoose");
const config = require('config');

mongoose
  .connect(`${config.get("MONGODB_URL")}/scatch`)
  .then(() => {
    console.log("database connected");
    dbug("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("❌ Database connection error:", err.message);
    dbug(err);
  });

module.exports = mongoose.connection;
