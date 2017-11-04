/*jshint esversion: 6 */

const request = require('request');

let geocodeAddress = (address, callback) => {
  // encodeURIComponent converts our address to format needed for URI
  let encodedAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
    /* below, error is returned if the request fails
       response is status code (200 is ok), body, headers, request data, the node headers sent with the req
       body is the JSON that comes back
    */
  }, (error, response, body) => {
    // error = invalid url, for example
    if (error) {
      callback('Unable to connect to Google servers.');
      // No known address yields a valid result of ZERO_RESULTS but not what we need
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
      // A valid address yields body.status of "OK"
    } else if (body.status === 'OK') {
      callback(undefined, { //undefined b/c there is no err msg when request succeeds
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
