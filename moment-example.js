var moment = require('moment');

var now = moment();

console.log(now.format());

// now.subtract(1, 'year');
// console.log(now.format());
// console.log(now.format('MMM Do YYYY, h:mma'));

// //now i want to print unix timestamp


//display seconds since that moment


console.log(now.format('X')); //seconds since 1970
console.log(now.format('x')); //milliseconds since 1970
console.log(now.valueOf()); //this returns javascript timestamp

var timestamp = 1508908726

var timestampMoment = moment.utc(timestamp)

console.log(timestampMoment.local().format('h:mm a'));