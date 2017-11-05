/*jshint esversion: 6 */

let getWeather = (lat, lng, callback) => {
  const request = require('request');
  request({
    url: `https://api.darksky.net/forecast/93efefa1530a728ed76c585118eb776c/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to get weather');
    } else if (!error && response.statusCode === 200) {
        callback (undefined, {
          temp: body.currently.temperature,
          feelslike: body.currently.apparentTemperature
        });
      }
    }
  );
};

module.exports.getWeather = getWeather;
