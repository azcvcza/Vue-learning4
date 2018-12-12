const User = require('../models/User.js');
//12.12 edit import passport
const passport = require('passport');
const LocalStrategy = require('passport-local')
    //
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const extractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = "thisisthesecretkey";
module.exports.controller = (app) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => {
        User.getUserByEmail(email, (err, user) => {
            console.log("in user.js,user,err", user, err);
            if (err) { return done(err) }
            if (!user) { return done(null, false) }
            User.comparePassword(password, user.password, (error, isMatch) => {
                if (isMatch) {
                    console.log("comparePassword:ismatch:", isMatch, user)
                    return done(null, user);
                }
                return done(null, false);
            });
            return true;
        })
    }));
    //login a user
    app.post('/users/login', passport.authenticate('local', { failureRedirect: '/users/login' }),
        (req, res) => {
            console.log("in user controller login req,res ", req, res);
            res.redirect('/');
        }
    )
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        })
    })
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