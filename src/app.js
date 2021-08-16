const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { resolveSoa } = require('dns')

const { geocode } = require('./utils/geocode')
const { forecast } = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3001

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handlebars setup
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Andrew Berezin'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Andrew Berezin'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Andrew Berezin',
    message: 'Help Message'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Please provide an address' })
  }

  geocode(req.query.address, (error, response) => {
    if (error) {
      res.send({ error })
    }
    forecast(
      response.longitude,
      response.latitude,
      response.place,
      (error, data) => {
        res.send({
          forecast: data,
          address: req.query.address
        })
      }
    )
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'Please provide a search tem' })
  }

  res.send({
    location: 'LA111',
    forecast: 'Sunny'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Help Error',
    name: 'Andrew Berezin',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    name: 'Andrew Berezin',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server started on port ', port)
})
