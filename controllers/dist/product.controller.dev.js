"use strict";

var db = require('../db'); // module.exports.get = (req, res) => {
//     var id = req.params.id;
//     var user = db.get('products').find({ id: id }).value();
//     res.render('products/index', {
//         product: product
//     });
// };


module.exports.index = function (req, res) {
  var page = parseInt(req.query.page) || 1;
  var perPage = 8;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  res.render('products/index', {
    //truyền mảng
    products: db.get('products').value().slice(start, end)
  });
};