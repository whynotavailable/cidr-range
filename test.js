const CIDR = require('./index.js').getCIDR;

let range = CIDR("192.126.0.0/24");

console.log(range.inRange("192.126.0.1") === true);
console.log(range.inRange("192.126.1.1") === false);
