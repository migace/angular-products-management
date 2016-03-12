var baseController = require('../../base'),
    constants = require('../../../helpers/constants'),
    categoryModel = require('./../../../models/category');

module.exports = baseController.extend({
    name: 'category_create',
    res: null,

    run: function(req, res, next) {
        this.res = res;

        var response = this.createOne(req.body);
        res.end(JSON.stringify(response));
    },

    createOne: function(element) {
        var response;

        if (!this.isExists(element)) {
            var category = new categoryModel({
                name: element.name,
                created: new Date()
            });

            category.save(function(err, product) {
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

                this.res.end(JSON.stringify(response));
            });
        } else {
            response = {
                status  : 200,
                success : 'Category already exists'
            };
        }

        return response;
    },

    createMassive: function(elements) {

    },

    isExists: function(element) {
        if (typeof element.hasOwnProperty('id')) {
            categoryModel.find({ _id: element.id }, function(err, doc) {
                if (doc) {
                    return true;
                }
            });
        }

        if (typeof element.hasOwnProperty('name')) {
            categoryModel.find({ name: element.name }, function(err, doc) {
                if (doc) {
                    return true;
                }
            });
        }

        return false;
    }
});
