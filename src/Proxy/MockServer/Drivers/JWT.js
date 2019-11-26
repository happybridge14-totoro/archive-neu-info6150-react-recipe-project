
let jsSHA = require("jssha");
var shaObj = new jsSHA("SHA-512", "TEXT");
shaObj.update("This is a ");
shaObj.update("test");
var hash = shaObj.getHash("HEX");
console.log(hash);
let JWT = {

};

export default JWT;
