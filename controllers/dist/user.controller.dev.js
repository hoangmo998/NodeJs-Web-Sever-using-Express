"use strict";

var db = require('../db');

var shortid = require('shortid');

var express = require('express');

module.exports.index = function (req, res) {
  res.render('users/index', {
    //truyền mảng
    users: db.get('users').value()
  });
};

module.exports.search = function (req, res) {
  var q = req.query.q;
  var matchedUsers = db.get('users').value().filter(function (user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1; //lọc kết quả
  });
  res.render('users/index', {
    //truyền mảng
    users: matchedUsers
  });
};

module.exports.create = function (req, res) {
  res.render('users/create');
};

module.exports.get = function (req, res) {
  var id = req.params.id;
  var user = db.get('users').find({
    id: id
  }).value();
  res.render('users/view', {
    user: user
  });
};

module.exports.postCreate = function (req, res) {
  req.body.id = shortid.generate();
  req.body.avatar = req.file.path.split('\\').slice(1).join("/");
  db.get('users').push(req.body).write();
  res.redirect('/users');
};