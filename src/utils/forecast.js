const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
    const url = 'https://api.weatherstack.com/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

    console.log(url)
    request({ url, json: true }, (error, { body }) => {
        const temperature = 20
        const precipProbability = 20
        callback(undefined, ' It is currently ' + temperature + ' degress out. There is a ' + precipProbability + '% chance of rain.')
        // if (error) {
        //     callback('Unable to connect to weather service!', undefined)
        // } else if (body.error) {
        //     callback('Unable to find location', undefined)
        // } else {
        //     callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        // }
    })
}

module.exports = forecast