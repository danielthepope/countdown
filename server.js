var express = require('express');
var pug = require('pug');
var susie = require('./susie.js');

var config = require('./countdownconfig.js');

var app = express();

var pugOptions = { doctype: 'html' };

var answerCache = {};

function compile(locals) {
  var fn = pug.compileFile('resources/template.pug', pugOptions);
  return fn(locals);
}

function solveAndAddToCache(anagram) {
  answerCache[anagram] = susie.solve(anagram, 1);
  console.log('Added %s to the cache', anagram);
  setTimeout(function () { delete answerCache[anagram]; }, 600000);
  return answerCache[anagram];
}

app.get('/', function (request, response) {
  response.send(compile({ anagram: '' }));
});

app.get('/cache/:anagram(\\w+)', function (request, response) {
  var anagram = request.params.anagram;
  solveAndAddToCache(anagram);
  response.sendStatus(200);
});

app.get('/:anagram(\\w+)', function (request, response) {
  var anagram = request.params.anagram;
  var bestAnswers = answerCache[anagram] || solveAndAddToCache(anagram);
  response.send(compile({ bestAnswers: bestAnswers, anagram: anagram }));
});

app.get('/api/solve/:anagram(\\w+)', function (request, response) {
  var anagram = request.params.anagram;
  var variance = parseInt(request.query.variance) || 0;
  console.log(request.headers);
  if (variance === -1) variance = undefined;
  return response.send(susie.solve(anagram, variance));
});

app.get('/api/cache', function (request, response) {
  response.send(answerCache);
});

app.get('/api/words', function (request, response) {
  response.send(susie.words);
});

app.get('/api/words/:length', function (request, response) {
  response.send(susie.words[request.params.length]);
});

app.use(express.static('public'));

var server = app.listen(config.port, function () {
  console.log('server listening on port %s', config.port);
});
