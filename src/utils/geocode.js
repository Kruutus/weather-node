const request = require("request");

const geocode = (address, callback) => {
    const mapboxToken = "pk.eyJ1Ijoia3J1dXR1cyIsImEiOiJjbDh2ZGFqM24wY3UwM3BvNDd4dHZ6cXRtIn0.nFt7jTyRCvTDs9I3Q1rE1A";
    const mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + mapboxToken + "&limit=1";

    request({ url: mapboxUrl, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            })
        }
    });
};

module.exports = geocode;