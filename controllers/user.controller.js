var db = require('../db');
const shortid = require('shortid');
const express = require('express');

module.exports.index = (req, res) => {
    res.render('users/index', { //truyền mảng
        users: db.get('users').value()
    });
};
module.exports.search = (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1; //lọc kết quả
    });
    res.render('users/index', { //truyền mảng
        users: matchedUsers
    });
};
module.exports.create = (req, res) => {
    res.render('users/create')
};
module.exports.get = (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: user
    });
};
module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join("/");

    db.get('users').push(req.body).write();
    res.redirect('/users')
}