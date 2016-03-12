var constants = require('./helpers/constants')
    adminController = require('./controllers/admin/index');
    indexController = require('./controllers/index'),
    productsApiGetAllController = require('./controllers/api/product/getAll'),
    productsApiGetController = require('./controllers/api/product/get'),
    productApiCreateController = require('./controllers/api/product/create'),
    productApiEditController = require('./controllers/api/product/edit'),
    productApiDeleteController = require('./controllers/api/product/delete'),
    categoryApiCreateController = require('./controllers/api/category/create'),
    categoryApiGetAllController = require('./controllers/api/category/getAll'),
    mongoose = require('mongoose');

module.exports = function(app, passport) {
    // GET
    app.get('/', function(req, res, next) {
        indexController.run(req, res, next);
    });

    app.get('/login', function(req, res, next) {
        res.render('login', {
            title: constants.DEFAULT_TITLE,
            loginMessage: {
                username: req.flash('loginUsername'),
                password: req.flash('loginPassword')
            }
        });
    });

    // POST
    app.post('/login', passport.authenticate('local', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // html5 mode angular
    /*
    app.get('/admin/*', isLoggedIn, function(req, res) {
        adminController.run(req, res, next);
    });
    */

    app.get('/admin', isLoggedIn, function(req, res, next) {
        adminController.run(req, res, next);
    });

    // static files (rendering templates)
    app.get('/components/*', function (req, res) {
        var name = req.params.name;
        res.render(req.path.substring(1));
    });

    app.get('/admin/partials/*', function(req, res) {
        res.render(req.path.substr(1));
    });

    // rest api
    /* PRODUCT */
    app.post('/api/v1/product/create', function(req, res, next) {
        productApiCreateController.run(req, res, next);
    });
    app.post('/api/v1/product/edit/:sku', function(req, res, next) {
        productApiEditController.run(req, res, next);
    });
    app.get('/api/v1/product/delete/:sku', function(req, res, next) {
        productApiDeleteController.run(req, res, next);
    });
    app.get('/api/v1/product/getAll', function(req, res, next) {
        productsApiGetAllController.run(req, res, next);
    });
    app.get('/api/v1/product/get/:sku', function(req, res, next) {
        productsApiGetController.run(req, res, next);
    });

    /* CATEGORY */
    app.get('/api/v1/category/getAll', function(req, res, next) {
        categoryApiGetAllController.run(req, res, next);
    });
    app.post('/api/v1/category/create', function(req, res, next) {
        categoryApiCreateController.run(req, res, next);
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
