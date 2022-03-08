var EMail = require('./src/EMail');

const fs = require('fs');

var am = JSON.parse(fs.readFileSync('test/assets/kmart2.json'));
var email = new EMail(am);

console.log(email.getRawHTMLAbstracted());
