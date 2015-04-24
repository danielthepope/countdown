var fs = require('fs');
var util = require('util');
var words = {};

console.log('loading word file');

var init = function() {
	var wordData = fs.readFileSync('resources/words.txt', 'utf8');
	var allWords = wordData.split(' ');
	var letterCount = [];
	console.log(util.format('%d words in the word file', allWords.length));
	allWords.forEach(function(element, index, array) {
		var len = element.length;
		if (words[len] === undefined) {
			words[len] = [];
			letterCount.push(len);
		}
		words[len].push(element);
	});
	letterCount.forEach(function(element, index, array) {
		console.log(util.format('%dx %s letter words', words[element].length, element));
	});
}();

console.log('ready');

/**
 * e.g.
 * sorted word = EHLLO
 * anagram     = AEFHLLOP
 *
 * go through every word in the word list
 *   go through each character in anagram.
 *     If anagram character equals word character 0, remove word character
 *     Remove anagram character
 *     Check word length. If 0, return true.
 *   return false
 */
function solve(anagram) {
	var startTime = new Date();
	var sortedAnagram = anagram.toUpperCase().split('').sort();
	function existsInAnagram(element, index, array) {
		var sortedWord = element.split('').sort();
		var i;
		for (i = 0; i < sortedAnagram.length; i++) {
			if (sortedWord[0] === sortedAnagram[i]) sortedWord = sortedWord.slice(1);
			if (sortedWord.length === 0) return true;
		}
		return false;
	}
	var possibilities = [];
	var i;
	var countedWords = 0;
	for (i = sortedAnagram.length; i >= 1; i--) {
		if (words[i] === undefined) continue;
		words[i].forEach(function(element, index, array) {
			if (existsInAnagram(element)) possibilities.push(element);
		});
		countedWords += words[i].length;
		if (possibilities.length !== 0) {
			console.log(util.format('%dms, searched %d words. Best answer has %d letters:',
				new Date() - startTime, countedWords, i));
			break;
		}
	}
	return possibilities.sort();
}

exports.solve = solve;
