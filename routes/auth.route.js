const express = require('express');

const db = require('../db');
const controller = require('../controllers/auth.controller')
const router = express.Router();

router.get('/login', controller.login);
router.post('/login', controller.postLogin)

module.exports = router;