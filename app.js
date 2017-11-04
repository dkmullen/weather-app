/*jshint esversion: 6 */

const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=800%20oak%20plaza%20kingston%20tn',
  json: true
}, (error, response, body) => {
  // 2nd property, used to filter out objects, is undefined; third property is spaces to indent
  console.log(JSON.stringify(body, undefined, 2));

});

/* 'request' is a node package that makes it easy to make API requests. Above,
    the function named 'request' takes as its first argument an object with our chosen options,
    and as its second argument another function with three properties (error, response, body)
    which are specified by the request module (as seen in the npm docs). That second
    function is a callback function; won't run till the request comes back.
*/
