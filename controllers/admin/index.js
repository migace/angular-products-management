var baseController = require('../base'),
    constants = require('../../helpers/constants');

module.exports = baseController.extend({
    name: 'admin',
    run: function(req, res, next) {
        res.render('admin/index', { title: constants.DEFAULT_TITLE });
    }
});
