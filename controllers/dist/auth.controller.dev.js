"use strict";

var db = require('../db');

var express = require('express');

var md5 = require('md5');

module.exports.login = function (req, res) {
  res.render('auth/login');
};

module.exports.postLogin = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var user = db.get('users').find({
    email: email
  }).value();

  if (!user) {
    res.render('auth/login', {
      errors: ["Không tồn tại user"],
      values: res.body
    });
    return;
  }

  var hashedPassword = md5(password); //mã hóa password

  if (user.password !== hashedPassword) {
    res.render('auth/login', {
      errors: ["Sai mật khẩu"],
      values: res.body
    });
    return;
  }

  res.cookie('userId', user.id, {
    signed: true
  });
  res.redirect('/users');
};