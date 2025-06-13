const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

const db = require('./config/mongoose_connect');
const ownerRouter = require('./routes/ownerRouter');
const usersRouter = require('./routes/usersRouter');
const productRouter = require('./routes/productRouter');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use('/owner', ownerRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);


app.listen(5000);