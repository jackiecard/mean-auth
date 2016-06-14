/**
 * Created by jackie on 6/14/16.
 */
// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var Profile = new Schema({
    username: { type: String, unique : true},
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String, unique : true},
    telephone: { type: String}
});

Profile.plugin(passportLocalMongoose);

module.exports = mongoose.model('profile', Profile);