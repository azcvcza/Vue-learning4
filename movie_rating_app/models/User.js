const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
module.exports.createUser = (newUser, error) => {
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (error, hash) => {
            const newUserResource = new User;
            newUserResource.password = hash;
            newUserResource.save(callback);
        })
    })
}