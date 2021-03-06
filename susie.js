var fs = require('fs');
var util = require('util');
var sprintf = require('sprintf-js').sprintf;
var words = {};
var response_limit = parseInt(process.env.RESPONSE_LIMIT || 1000);

var Susie = function () {
  console.log('loading word file');
  var wordData = fs.readFileSync('resources/words.txt', 'utf8');
  var allWords = wordData.split('---')[1].split('\n');
  var filteredWords = allWords.filter(function (value) {
    var matches = value.match(/^[a-z][a-z]+$/);
    return matches !== null;
  });
  filteredWords.push('a');
  filteredWords.push('i');
  var letterCount = [];
  filteredWords.forEach(function (element, index, array) {
    var len = element.length;
    if (words[len] === undefined) {
      words[len] = [];
      letterCount.push(len);
    }
    words[len].push(element.toUpperCase());
  });
  console.log(util.format('%d words in the word file:', filteredWords.length));
  letterCount.sort(numberSort).forEach(function (element, index, array) {
    console.log(sprintf('%6d %2s letter words', words[element].length, element));
  });
  console.log('ready');
};

function numberSort(a, b) {
  return a - b;
}

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
Susie.prototype.solve = function (anagram, variance) {
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
  var i, j;
  var countedWords = 0;
  var levelsSolved = 0;
  // Check the longest words first
  for (i = sortedAnagram.length; i >= 1; i--) {
    if (words[i] === undefined) continue;
    for (j = 0; j < words[i].length; j++) {
      if (possibilities.length >= response_limit) {
        break;
      }
      if (existsInAnagram(words[i][j])) {
        var wordObject = {
          word: words[i][j],
          length: words[i][j].length,
          conundrum: words[i][j].length === sortedAnagram.length
        };
        possibilities.push(wordObject);
      }
      countedWords++;
    };
    if (possibilities.length !== 0) {
      if (variance !== undefined && levelsSolved >= variance) break;
      levelsSolved++;
    }
  }
  console.log(util.format('Request to solve %s\n%d words searched, %dms\n', anagram.toUpperCase(), countedWords, new Date() - startTime) + JSON.stringify(possibilities));
  return possibilities;
};

Susie.prototype.words = words;

module.exports = new Susie();
