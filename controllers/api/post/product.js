var baseController = require('../../base'),
    constants = require('../../../helpers/constants'),
    productModel = require('./../../../models/product');

module.exports = baseController.extend({
    name: 'product',
    run: function(req, res, next) {
        var categories = [];
        req.body.categories.forEach(function(index, element) {
            categories.push({id: element._id, name: element.name});
        });

        var product = new productModel({
            name: req.body.name,
            sku: req.body.sku,
            price: { base: req.body.price || 0.00, tax: 0.23 },
            categories: categories,
            description: req.body.description,
            availability: req.body.availability,
            created: new Date(),
            updated: new Date()
        });

        product.save(function(err, product) {
            var response;
            if (err) {
                response = {
                    status  : 400,
                    success : 'Error ocurred - ' + err
                };
            } else {
                response = {
                    status  : 200,
                    success : 'Created successfully'
                };
            }

            res.end(JSON.stringify(response));
        })
    }
});
