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
module.exports.createUser = (newUser, callback) => {
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (error, hash) => {
            const newUserResource = newUser;
            newUserResource.password = hash;
            newUserResource.save(callback);
        })
    })
}
module.exports.getUserByEmail = (email, callback) => {
    const query = { email };
    console.log("in model user,getUserByEmail,query:", query);
    var result = User.findOne(query, callback);
    console.log("in model user,getUserByEmail:", result);
}
module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcryptjs.compare(candidatePassword, hash, (error, isMatch) => {
        if (error) { throw error; }
        console.log("in model user,comparepassord:", isMatch)
        callback(null, isMatch);
    })
}