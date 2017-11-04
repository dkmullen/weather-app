/*jshint esversion: 6 */

const request = require('request'),
  yargs = require('yargs');

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

  let encodedAddress = encodeURIComponent(argv.a);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true
  /* below, error is
     response is status code (200 is ok), body, headers, request data, the node headers sent with the req
     body is the JSON that comes back
  */
}, (error, response, body) => {
  /* 1st property, below, is the body of the req, in this case some JSON
     2nd property, used to filter out objects, is undefined;
     third property is spaces to indent */
  // console.log(JSON.stringify(body, undefined, 2));
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});

/* 'request' is a node package that makes it easy to make API requests. Above,
    the function named 'request' takes as its first argument an object with our chosen options,
    and as its second argument another function with three properties (error, response, body)
    which are specified by the request module (as seen in the npm docs). That second
    function is a callback function; won't run till the request comes back.
*/
