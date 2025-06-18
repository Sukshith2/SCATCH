const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/mongoose_connect');
const ownerRouter = require('./routes/ownerRouter');
const usersRouter = require('./routes/usersRouter');
const productRouter = require('./routes/productRouter');
const shopRouter = require('./routes/shopRouter');
const profileRouter = require('./routes/profileRouter');
const expressSession = require('express-session');
const flash= require('connect-flash');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_KEY,
}));
app.use(flash());

app.use('/', usersRouter);
app.use('/owner', ownerRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/shop', shopRouter);
app.use('/profile', profileRouter);


connectDB.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

connectDB.once("open", () => {
  console.log("MongoDB connection open ✅");
  app.listen(5000, () => {
    console.log("Server started on http://localhost:5000");
  });
});