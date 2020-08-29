"use strict";

require('dotenv').config();

var express = require('express');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');

var authRoute = require('./routes/auth.route'); // const { requireAuth } = require('./middlewares/auth.middleware');


var authMiddleware = require('./middlewares/auth.middleware'); // const db = require('./db')


var port = 3000;
var app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express["static"]('public'));
app.get('/', function (req, res) {
  res.render('index', {
    name: 'AAA'
  });
});
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute), app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});