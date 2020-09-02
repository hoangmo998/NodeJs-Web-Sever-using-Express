const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,

});
//Schema khai báo các trường có trong object

const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product