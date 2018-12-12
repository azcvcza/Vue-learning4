const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
//
const passportJWT = require('passport-jwt');
const extractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = extractJWT.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'movieratingapplicationsecretkey';
//
const serveStatic = require('serve-static');
//
const history = require('connect-history-api-fallback');
//console.log("cors required", cors);
const app = express();
const router = express.Router();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(history());
//console.log("use finished");
mongoose.connect('mongodb://localhost/movie_rating_app', function() {
    console.log("db connected");
}).catch(err => {
    console.err("App starting err:", err.stack);
    process.exit(1);
})

fs.readdirSync('controllers').forEach(function(file) {
    if (file.substr(-3) == ".js") {
        const route = require("./controllers/" + file);
        route.controller(app);
    }

})
app.use(serveStatic(__dirname + "/dist/"))
router.get('/', function(req, res) {
        res.json({
            message: 'API INIT'
        })
    })
    //before dealing with message
const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function() {
    console.log('api running on port ${port}', port)
})