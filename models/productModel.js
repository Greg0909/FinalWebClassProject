const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    brand: {type:String, required:false},
    weight: {type:Number, required:false},
});

module.exports = mongoose.model('ProductDB', productSchema);