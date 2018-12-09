const MovieSchema = require('../models/Movie.js');

module.exports.controller = (app) => {
    app.post('/movies', (req, res) => {
        const newMovie = new MovieSchema({
            name: req.body.name,
            description: req.body.description,
            release_year: req.body.release_year,
            genre: req.body.genre,
        })
    });
    newMovie.save((error, movie) => {
        if (error) {
            console.log("in controller log error:", error);
        }
        res.send(movie);
    })
}