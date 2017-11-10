/*jshint esversion: 6 */

const yargs = require('yargs'),
  axios = require('axios');

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

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    // ie, throw to the catch function below, skipping the success function in between
    throw new Error('Unable to find that address');
  }

  let lat = response.data.results[0].geometry.location.lat,
    lng = response.data.results[0].geometry.location.lng,
    weatherUrl = `https://api.darksky.net/forecast/93efefa1530a728ed76c585118eb776c/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  let temperature = response.data.currently.temperature,
    apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => { // e is the err object we get back - log it to see it
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers');
  } else {
    console.log(e.message); // the Error message thrown from above
  }
});

/* axios is an npm module that makes api calls easily and has Promises built in.
  One advantage of promises is that, with callbacks, you nest them, getting ever
  deeper, and with promises, you chain them at the same level
*/
