var express = require('express');
var pug = require('pug');
var susie = require('./susie.js');

var config = require('./countdownconfig.js');

var app = express();

var pugOptions = { doctype: 'html' };

function compile(locals) {
  var fn = pug.compileFile('resources/template.pug', pugOptions);
  return fn(locals);
}

app.get('/', function (request, response) {
  response.send(compile({ anagram: '' }));
});

app.get('/:anagram(\\w+)', function (request, response) {
  var anagram = request.params.anagram;
  var bestAnswers = susie.solve(anagram, 1);
  response.setHeader('Cache-Control', 'public, max-age=3600');
  response.send(compile({ bestAnswers: bestAnswers, anagram: anagram }));
});

app.get('/api/solve/:anagram(\\w+)', function (request, response) {
  var anagram = request.params.anagram;
  var variance = parseInt(request.query.variance) || 0;
  console.log(request.headers);
  if (variance === -1) variance = undefined;
  response.setHeader('Cache-Control', 'public, max-age=3600');
  return response.send(susie.solve(anagram, variance));
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
