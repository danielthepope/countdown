var util = require('util');
var susie = require('./susie.js');

var anagram = '';
console.log('type input to solve (EXIT to exit)');

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(text) {
	var anagram = text.trim().toUpperCase();
	if (anagram === 'EXIT') {
		process.exit();
	} else {
		console.log(susie.solve(anagram));
		console.log('another? type EXIT to exit');
	}
});
