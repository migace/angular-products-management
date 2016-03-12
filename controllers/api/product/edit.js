var BaseController = require('../../base'),
    Constants = require('../../../helpers/constants'),
    ProductModel = require('./../../../models/product');

module.exports = BaseController.extend({
    name: 'product_edit',
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
            updated: new Date()
        });

        if (req.body._id) {
            productModel._id = req.body.id;
            ProductModel.findOneAndUpdate(
                { _id: req.body._id },
                productModel,
                function(err, product) {
                    var response;
                    if (err) {
                        response = {
                            status  : 400,
                            message : 'Error ocurred - ' + err
                        };
                    } else {
                        response = {
                            status  : 200,
                            message : 'Updated successfully'
                        };
                    }

                    res.end(JSON.stringify(response));
                }
            );
        }
    }
});
