const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8ae13ef363eac80cbe4c65a21db07596&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback("Unable to connect to weather stack.", undefined)
        } else if (body.error) {
            callback("unable to find the location.", undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ": It is currently " + body.current.temperature + " degrees out. But it feels like " + body.current.feelslike + " degrees out.")
        }
    })


}

module.exports = forecast