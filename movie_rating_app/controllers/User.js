const User = require('../models/User.js');
module.exports.controller = (app) => {
    app.post('/users/register', (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const newUser = new User({
            name,
            email,
            password,
        });
        User.createUser(newUser, (error, user) => {
            if (error) {
                console.log("in controller user.js createUser:", error)
                res.status(422).json({ message: 'something went wrong,try again on sometime' })
            }
            res.send({ user })
        })
    })
}