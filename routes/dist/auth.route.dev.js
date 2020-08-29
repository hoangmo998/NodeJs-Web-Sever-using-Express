"use strict";

var express = require('express');

var db = require('../db');

var controller = require('../controllers/auth.controller');

var router = express.Router();
router.get('/login', controller.login);
router.post('/login', controller.postLogin);
module.exports = router;