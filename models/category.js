var mongoose = require('mongoose');

var categoryShema = new mongoose.Schema({
    name: String,
    created: Date
});

module.exports = mongoose.model('Category', categoryShema);
