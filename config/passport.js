var userModel = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        userModel.findById(id, function(err, user) {
            done(err, user);
        });
    });
}
