const path = require('path')
const express = require('express')
//const hbs = require('hbs')

const app = express()

// Define paths for Express config
const public = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

// Handlebars setup
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to server
app.use(express.static(public))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: 'Andrew Berezin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Help Message"
    })
})

app.get('/weather', (req, res) => res.send({
    location: "LA",
    forecast: "Sunny"
}))

app.listen(3001, ()=> {console.log('Server started on port 3001');})
// app.com
// app.com/help
// app.com/about