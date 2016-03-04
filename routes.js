var constants = require('./helpers/constants')
    adminController = require('./controllers/admin/index');
    indexController = require('./controllers/index'),
    productApiGetController = require('./controllers/api/get/product'),
    productApiPostController = require('./controllers/api/post/product'),
    categoryApiGetController = require('./controllers/api/get/category'),
    categoryApiPostController = require('./controllers/api/post/category'),
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
    /* PRODUCTS */
    app.get('/api/v1/products', function(req, res, next) {
        productApiGetController.run(req, res, next);
    });
    app.post('/api/v1/product', function(req, res, next) {
        productApiPostController.run(req, res, next);
    });

    /* CATEGORIES */
    app.get('/api/v1/categories', function(req, res, next) {
        categoryApiGetController.run(req, res, next);
    });
    app.post('/api/v1/category', function(req, res, next) {
        categoryApiPostController.run(req, res, next);
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
