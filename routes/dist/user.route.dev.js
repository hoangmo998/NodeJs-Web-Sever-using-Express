"use strict";

var express = require('express');

var db = require('../db');

var controller = require('../controllers/user.controller');

var validate = require("../validate/user.validate");

var router = express.Router();

var authMiddleware = require('../middlewares/auth.middleware');

router.get('/', controller.index);
router.get('/cookie', function (req, res, next) {
  res.cookie("user-id", 12345);
  res.send("hello");
});
router.get('/search', controller.search);
router.get('/create', controller.create);
router.get('/:id', controller.get);
router.post('/create', validate.postCreate, controller.postCreate);
module.exports = router;