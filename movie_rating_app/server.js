const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
const router = express.Router();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/movie_rating_app', function() {
    console.log("db connected");
}).catch(err => {
    console.err("App starting err:", err.stack);
    process.exit(1);
})
router.get('/', function(req, res) {
    res.json({
        message: 'API INIT'
    })
})
const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function() {
    console.log('api running on port ${port}')
})