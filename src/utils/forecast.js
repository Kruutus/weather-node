const request = require("request");

const forecast = (longitude, latitude, callback) => {
    const weatherStackUrl = "http://api.weatherstack.com/current?access_key=42bcd6b94af68042034664b018cf51d5&query=" + latitude + "," + longitude;

    request({ url: weatherStackUrl, json: true }, (error, {body}) => {
        if(error) {
            callback("Unable to connect to weather service!", undefined);
        } else if(body.error) {
            callback("Unable to find location", undefined)
        } else {
            const {temperature, feelslike, weather_descriptions: [description]} = body.current;
            const formattedResponse = description + 
                ". It is currently " + 
                temperature + 
                " degrees out. It feels like " + 
                feelslike + 
                " degrees out.";
            callback(undefined, formattedResponse);
        }
    });
}

module.exports = forecast;