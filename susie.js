var fs = require('fs');
var util = require('util');
var words = [];

console.log('loading word file');

var init = function() {
	var wordData = fs.readFileSync('resources/words.txt', 'utf8');
	var aAllwords = wordData.split(' ');
	console.log(util.format('%d words in the word file', aAllwords.length));
	// Valid words are 9 letters or less
	function is9LettersOrLess(element, index, array) {
		return element.length <= 9;
	}
	var aFiltered = aAllwords.filter(is9LettersOrLess);
	console.log(util.format('%d filtered words', aFiltered.length));
	words = aFiltered;
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
		for (i = 0; i < 9; i++) {
			if (sortedWord[0] === sortedAnagram[i]) sortedWord = sortedWord.slice(1);
			if (sortedWord.length === 0) return true;
		}
		return false;
	}
	function sortByLength(a, b) {
		return b.length - a.length;
	}
	var possibilities = words.filter(existsInAnagram).sort(sortByLength);
	var longestWordLength = possibilities[0].length;
	var output = [];
	var i;
	for (i = 0; i < possibilities.length; i++) {
		if (possibilities[i].length === longestWordLength) output.push(possibilities[i]);
		else break;
	}
	console.log(util.format('%dms', new Date() - startTime));
	return output;
}

exports.solve = solve;
