const express = require('express');

const db = require('../db');
const controller = require('../controllers/user.controller')
const validate = require("../validate/user.validate")
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware')
router.get('/', controller.index);

router.get('/cookie', (req, res, next) => {
    res.cookie("user-id", 12345);
    res.send("hello")
})
router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;