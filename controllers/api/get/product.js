var baseController = require('../../base'),
    constants = require('../../../helpers/constants'),
    productModel = require('./../../../models/product');

module.exports = baseController.extend({
    name: 'product',
    run: function(req, res, next) {
        var products = productModel.find({}, function(err, docs) {
            return res.json(docs);
        });
    }
});
