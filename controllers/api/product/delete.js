var BaseController = require('../../base'),
    Constants = require('../../../helpers/constants'),
    ProductModel = require('./../../../models/product');

module.exports = BaseController.extend({
    name: 'product_delete',
    run: function(req, res, next) {
        ProductModel.remove(
            { sku: req.params.sku },
            function(err) {
                var response;
                if (err) {
                    response = {
                        status  : 400,
                        success : 'Error ocurred - ' + err
                    };
                } else {
                    response = {
                        status  : 200,
                        success : 'Updated successfully'
                    };
                }

                res.end(JSON.stringify(response));
            }
        );
    }
});
