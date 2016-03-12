var mongoose = require('mongoose');

var userShema = new mongoose.Schema({
    name: String,
    sku: {type: String, unique: true, required: true},
    price: { base: Number, tax: Number },
    categories: Array,
    description: String,
    availability: Date,
    created: Date,
    updated: Date
});

module.exports = mongoose.model('Product', userShema);
