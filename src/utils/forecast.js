const request = require('postman-request')
const forecast = (longitude, latitude, place, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=deb9accfb8c8c9858d2c2ab1ee03f10d&query=${latitude},${longitude}`
    request({url, json:true}, (error, response)=> {
           const { temperature, feelslike } = response.body.current;
           const data = `It is currently ${temperature} degrees outside. It feels like ${feelslike} degrees out in ${place}.`
           callback(error,data)
        })
 }

 module.exports = {forecast}