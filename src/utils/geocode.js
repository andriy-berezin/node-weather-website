const request = require('postman-request')
const geocode = (address, callback) => {
    const token = 'pk.eyJ1IjoiYW5kcmV3YmVyZXppbiIsImEiOiJja3JiNXU1MTM0cWFjMnd0OW1vYmt5eW11In0.yPmJpM0EkbaRJ8w297Ovlg'
    const geo_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=` + token
 
    request({url:geo_url, json:true}, (error, response)=> {
       const {place_name, center} = response.body.features[0]
       const latitude = center[1]
       const longitude = center[0]
       callback(error, {latitude, longitude, place:place_name})
    })
 }

 module.exports = {geocode}