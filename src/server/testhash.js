import hashutil from './hashutil.js';
//const hashutil = require('./hashutil.js');

let first_name = "Harry";
let last_name = "Chung";
let pw = "abc123";
const passhash = hashutil(first_name,
			  last_name,
			  pw);

console.log ('Passhash: ' + passhash);

	     
