
hashutil.js

This is some javascript code to help generate a hash of the user's firstname, lastname, and password. It uses a javascript crypto library (crypto-js). There may be minor settings changes needed in package.json. Hopefully, the type setting in package.json will not conflict with other needs in yoru code base.

First, you need to install crypto-js:

npm install crypto-js

Now:
In package.json, make sure type is set to module:

 "type": "module",

This should be all that is needed. You can use testhash.js and verify the hashutil module works by typing:

node testhash.js

It should produce a hash code for one of the users in the database.



