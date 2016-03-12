var BaseController = require('../../base'),
    Constants = require('../../../helpers/constants'),
    ProductModel = require('./../../../models/product');

module.exports = BaseController.extend({
    name: 'product_create',
    run: function(req, res, next) {
        var categories = [],
            productModel;

        req.body.categories.forEach(function(index, element) {
            categories.push({id: element._id, name: element.name});
        });

        productModel = new ProductModel({
            name: req.body.name,
            sku: req.body.sku,
            price: { base: req.body.price.base || 0.00, tax: 0.23 },
            categories: categories,
            description: req.body.description,
            availability: req.body.availability,
            created: new Date(),
            updated: new Date()
        });

        productModel.save(function(err, product) {
            var response;
            if (err) {
                response = {
                    status  : 400,
                    message : 'Error ocurred - ' + err
                };
            } else {
                response = {
                    status  : 200,
                    message : 'Created successfully'
                };
            }

            res.end(JSON.stringify(response));
        });
    }
});
