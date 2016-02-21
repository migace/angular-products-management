var baseController = require('./base'),
    constants = require('../helpers/constants');

module.exports = baseController.extend({
    name: 'index',
    run: function(req, res, next) {
        res.render('frontend/index', { title: constants.DEFAULT_TITLE });
    }
});
