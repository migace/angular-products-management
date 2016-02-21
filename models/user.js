var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

var userShema = new mongoose.Schema({
    username: String,
    password: String
});

userShema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password);
};

userShema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userShema);
