/*jshint esversion: 6 */

const yargs = require('yargs');

const geocode = require('./geocode/geocode'),
  weather = require('./weather/weather');

// argv - take input var, pass it thur yargs, store it here
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

// Send req to geocode module with an address, expect either an errorMessage or valid results
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    // results, latitude and longitude are defined on the returned object in geocode.js
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temp} in ${results.address}, and
        it feels like ${weatherResults.feelslike}.`);
      }
    });
  }
});



/* 'request' is a node package that makes it easy to make API requests. Above,
    the function named 'request' takes as its first argument an object with our chosen options,
    and as its second argument another function with three properties (error, response, body)
    which are specified by the request module (as seen in the npm docs). That second
    function is a callback function; won't run till the request comes back.
*/

/* Stringify - 1st property, below, is the body of the req, in this case some JSON
   2nd property, used to filter out objects, is undefined;
   third property is spaces to indent */
// console.log(JSON.stringify(body, undefined, 2));

// Instructor says: "All app.js should do is pass an address to the function and doing something with the result."
