var baseController = require('../../base'),
    constants = require('../../../helpers/constants'),
    categoryModel = require('./../../../models/category');

module.exports = baseController.extend({
    name: 'category_get_all',
    run: function(req, res, next) {
        categoryModel.find({}, function(err, docs) {
            return res.json(docs);
        });
    }
});
