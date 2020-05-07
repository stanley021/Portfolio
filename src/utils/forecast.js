const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f1e88124533815db25c56db3bc5253e8/' + latitude + ',' + longitude
    

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. The humidity is currently '+ body.daily.data[0].humidity+ '. There is a ' + body.currently.precipProbability + '% chance of rain.')
            
        }
    })
}

module.exports = forecast