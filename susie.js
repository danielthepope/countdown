var fs = require('fs');
var util = require('util');
var sprintf = require('sprintf-js').sprintf;
var words = {};

var Susie = function() {
	console.log('loading word file');
	var wordData = fs.readFileSync('resources/words.txt', 'utf8');
	var allWords = wordData.split(' ');
	var letterCount = [];
	allWords.forEach(function(element, index, array) {
		var len = element.length;
		if (words[len] === undefined) {
			words[len] = [];
			letterCount.push(len);
		}
		words[len].push(element);
	});
	console.log(util.format('%d words in the word file:', allWords.length));
	letterCount.sort(numberSort).forEach(function(element, index, array) {
		console.log(sprintf('%6d %2s letter words', words[element].length, element));
	});	
	console.log('ready');
};

function numberSort(a,b) {
	return a - b;
}

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
Susie.prototype.solve = function(anagram) {
	var sortedAnagram = anagram.toUpperCase().split('').sort();
	function existsInAnagram(element) {
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
	// Check the longest words first
	for (i = sortedAnagram.length; i >= 1; i--) {
		if (words[i] === undefined) continue;
		words[i].forEach(function(element) {
			if (existsInAnagram(element)) possibilities.push(element);
		});
		countedWords += words[i].length;
		if (possibilities.length !== 0) {
			break;
		}
	}
	console.log(util.format('%d words searched', countedWords));
	return possibilities.sort();
}

module.exports = new Susie();
