var fs = require('fs');
var util = require('util');
var sprintf = require('sprintf-js').sprintf;
var words = {};
var vowels = ['a','a','a','a','a','a','a','a','a','e','e','e','e','e','e','e','e','e','e','e','e','i','i','i','i','i','i','i','i','i','o','o','o','o','o','o','o','o','u','u','u','u'];
var consonants = ['b','b','c','c','d','d','d','d','f','f','g','g','g','h','h','j','k','l','l','l','l','m','m','n','n','n','n','n','n','p','p','q','r','r','r','r','r','r','s','s','s','s','t','t','t','t','t','t','v','v','w','w','x','y','y','z'];

var Susie = function() {
	console.log('loading word file');
	var wordData = fs.readFileSync('resources/words.txt', 'utf8');
	var allWords = wordData.split('\r\n');
	var filteredWords = allWords.filter(function(value) {
		var matches = value.match(/[a-z]*/);
		return value.length > 1 && matches !== null && matches[0].length == value.length;
	});
	filteredWords.push('a');
	filteredWords.push('i');
	var letterCount = [];
	filteredWords.forEach(function(element, index, array) {
		var len = element.length;
		if (words[len] === undefined) {
			words[len] = [];
			letterCount.push(len);
		}
		words[len].push(element.toUpperCase());
	});
	console.log(util.format('%d words in the word file:', filteredWords.length));
	letterCount.sort(numberSort).forEach(function(element, index, array) {
		console.log(sprintf('%6d %2s letter words', words[element].length, element));
	});
	console.log('ready');
};

function numberSort(a,b) {
	return a - b;
}

Susie.prototype.createAnagram = function() {
	var numberOfLetters = 9;
	var numberOfVowels = Math.floor((Math.random() * 2) + 3);
	var numberOfConsonants = numberOfLetters - numberOfVowels;
	var anagram = [];
	for (var i = 0; i < numberOfConsonants; i++) {
		anagram.push(getRandomElement(consonants));
	}
	for (var i = 0; i < numberOfVowels; i++) {
		anagram.push(getRandomElement(vowels));
	}
	anagram = shuffle(anagram);
	return arrayToString(anagram);
};

/**
 * anagram: letters to solve (string)
 * variance: variance in solution lengths i.e. if best solution has 7 letters,
 *   a variance of 2 will also include 6 and 5 letters
 * 
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
Susie.prototype.solve = function(anagram, variance) {
	var startTime = new Date();
	var sortedAnagram = anagram.toUpperCase().split('').sort();
	function existsInAnagram(word) {
		var sortedWord = word.split('').sort();
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
	var levelsSolved = 0;
	// Check the longest words first
	for (i = sortedAnagram.length; i >= 1; i--) {
		if (words[i] === undefined) continue;
		words[i].forEach(function(word) {
			if (existsInAnagram(word)) {
				var wordObject = {
					word: word,
					length: word.length,
					conundrum: word.length === sortedAnagram.length
				};
				possibilities.push(wordObject);
			}
		});
		countedWords += words[i].length;
		if (possibilities.length !== 0) {
			if (variance !== undefined && levelsSolved >= variance) break;
			levelsSolved++;
		}
	}
	console.log(util.format('Request to solve %s\n%d words searched, %dms\n', anagram.toUpperCase(), countedWords, new Date() - startTime) + JSON.stringify(possibilities));
	return possibilities;
};

function getRandomElement(array) {
	var index = Math.floor(Math.random() * array.length);
	return array[index];
}

function shuffle(o){
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

function arrayToString(array) {
	var output = '';
	for (var i = 0; i < array.length; i++) {
		output += array[i];
	}
	return output;
}

module.exports = new Susie();
