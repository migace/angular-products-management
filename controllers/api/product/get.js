var baseController = require('../../base'),
    constants = require('../../../helpers/constants'),
    productModel = require('./../../../models/product');

module.exports = baseController.extend({
    name: 'product_get',
    run: function(req, res, next) {
        var sku = req.params.sku;
        productModel.find({ 'sku':sku }, function(err, docs) {
            return res.json(docs);
        });
    }
});
