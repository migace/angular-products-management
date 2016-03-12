var baseController = require('../../base'),
    constants = require('../../../helpers/constants'),
    productModel = require('./../../../models/product');

module.exports = baseController.extend({
    name: 'product_get_all',
    run: function(req, res, next) {
        productModel.find({}, function(err, docs) {
            return res.json(docs);
        });
    }
});
