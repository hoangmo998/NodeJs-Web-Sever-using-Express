"use strict";

var express = require('express');

var multer = require('multer'); // const db = require('../db');


var controller = require('../controllers/user.controller');

var validate = require("../validate/user.validate");

var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();
var upload = multer({
  dest: './public/uploads/'
});
router.get('/', controller.index);
router.get('/cookie', function (req, res, next) {
  res.cookie("user-id", 12345);
  res.send("hello");
});
router.get('/search', controller.search);
router.get('/create', controller.create);
router.get('/:id', controller.get);
router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate);
module.exports = router;