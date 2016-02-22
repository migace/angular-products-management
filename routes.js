var constants = require('./helpers/constants')
    adminController = require('./controllers/admin/index');
    indexController = require('./controllers/index');

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

    // ALL

    app.all('/admin', isLoggedIn, function(req, res, next) {
        adminController.run(req, res, next);
    });

    // templates for angular
    app.get('/components/:name', function (req, res) {
        var name = req.params.name;
        res.render('components/' + name);
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
