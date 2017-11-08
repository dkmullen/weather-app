/*jshint esversion: 6 */

let geoCodeAddress = (address) => {

};

geocodeAddress('37763').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
