module.exports.controllers = (app) => {
    app.get('/', (req, res) => {
        res.render('index', { title: 'express' })
    })
}