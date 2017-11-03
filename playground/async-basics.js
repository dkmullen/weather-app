/*jshint esversion: 6 */

console.log('Starting app');

setTimeout(() => {
  console.log('Inside first setTimeout');
}, 2000);

setTimeout(() => {
  console.log('Inside second setTimeout');
}, 0);

console.log('Finishing up');
