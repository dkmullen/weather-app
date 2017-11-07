/*jshint esversion: 6 */

let somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hey, it worked.');
    // reject('Unable to fulfil promise');
  }, 2500);

});

somePromise.then((message) => {
  console.log('Success: ' + message);
}, (errorMessage) => {
  console.log('Error: ' + errorMessage);
});
