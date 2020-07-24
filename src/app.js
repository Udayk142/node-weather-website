const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//setup handlers engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title:"Weather App",
        name: "Uday"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:"About Me",
        name:"Uday"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:"Help Page",
        message: "this page will show some helpful text.",
        name: "Uday"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        })
    }

    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send( { error })
        }
        
        forecast( latitude, longitude, (error, forecaseData) => {
            if (error) {
                return res.send( { error })
            }
            
            res.send({
                forecast: forecaseData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title:"404",
        message: "Help document not found",
        name: "Uday"
    })
})


app.get('*', (req, res)=> {
    res.render('error', {
        title: "404 Error",
        message: "Page not found",
        name: "Uday"
    })
})


app.listen(3000,() => {
    console.log("Server is up on port 3000")
})