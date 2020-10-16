const request = require('request')

const geocode = (city, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city + '.json?access_token=pk.eyJ1IjoiamFtZXNwaWVycmUiLCJhIjoiY2tmcGp4Nzg3MGN6bDMwbGRvdDM2dzBncCJ9.gSwicFC6z-7Ig-ts9JxeVg&limit=1'

    request({ url, json: true }, (error, {body:response}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
            //Since we're expecting two agruments an error or a response, when we call back we will in that argument.
        } else if (response.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.features[0].center[1],
                longitude: response.features[0].center[0],
                location: response.features[0].place_name
            })
        }
    })
}

module.exports = geocode