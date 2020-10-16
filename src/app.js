const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))```

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Diego Pena'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Diego Pena'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Diego Pena'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.adress){
        return res.send({
            error: "A location quary must be put in."
        })
    }

    geocode(req.query.adress, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude,  (error, forecast = {})  => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast,
                location,
                //Location is carried over from geocode()
                address: req.query.adress
            })
        })

    })
})

app.get("/products", (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must have a search term."

        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})