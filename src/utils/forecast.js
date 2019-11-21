const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c66dc1a44b4c4e76ceb6903a11243b9d/' + latitude + ',' + longitude + '?exclude=minutely,hourly&lang=fr&units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            forecast_call = body.daily.data[0].summary 
            forecast_call = forecast_call + ' Il fait actuellement ' + body.currently.temperature + ' degrés dehors.' 
            forecast_call = forecast_call + ' Il y a ' + body.currently.precipProbability + '% de chance de pluie.'
            forecast_call = forecast_call + ' La température oscillera de ' + body.daily.data[0].temperatureLow + ' comme minimum et ' + body.daily.data[0].temperatureHigh + ' comme maximum cette journée.'
            callback(undefined, forecast_call)
        }
    })
}

module.exports = forecast