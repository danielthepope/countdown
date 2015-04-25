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
		var startTime = new Date();
		var result = susie.solve(anagram);
		if (result.length > 0) {
			console.log(util.format('%dms, best answer has %d letters:',
				new Date() - startTime, result[0].length));
			console.log(result);
		} else {
			console.log('No results found.');
		}
		console.log('another? type EXIT to exit');
	}
});
