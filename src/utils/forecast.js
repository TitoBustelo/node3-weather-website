const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a01ac638d7dd27089eb9e1ce79321155&query=${latitude},${longitude}&units=f`

    request({ url, json: true }, (error, {body:response}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.error) {
            callback('Unable to find location', undefined)
        } else {``
            callback(undefined, `${response.current.weather_descriptions[0]}. The temperature is ${response.current.temperature} degress. The wind speed its ${response.current.wind_speed}`)

            //location, response.current.weather_descriptions[0], response.current.temperature
        }
    })

}

module.exports = forecast