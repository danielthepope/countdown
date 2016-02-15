var express = require('express');
var extend = require('extend');
var jade = require('jade');
var util = require('util');
var susie = require('./susie.js');

var config = require('./countdownconfig.js');

var app = express();

var jadeOptions = {doctype:'html'};
var jadeGlobals = {pageTitle:'Countdown'};

var answerCache = {};

function compile(locals) {
	var fn = jade.compileFile('resources/template.jade', jadeOptions);
	return fn(extend({}, jadeGlobals, locals));
}

function solveAndAddToCache(anagram) {
	answerCache[anagram] = susie.solve(anagram, 1);
	console.log('Added %s to the cache', anagram);
	setTimeout(function() {delete answerCache[anagram]}, 600000);
	return answerCache[anagram];
}

app.get('/', function(request, response) {
	response.send(compile({anagram:''}));
});

app.get('/cache/:anagram(\\w+)', function(request, response) {
	var anagram = request.params.anagram;
	solveAndAddToCache(anagram)
	response.sendStatus(200);
})

app.get('/:anagram(\\w+)', function(request, response) {
	var anagram = request.params.anagram;
	var bestAnswers = answerCache[anagram] || solveAndAddToCache(anagram);
	response.send(compile({bestAnswers:bestAnswers,anagram:anagram}));
});

app.get('/api/solve/:anagram(\\w+)', function(request, response) {
	var anagram = request.params.anagram;
	var variance = parseInt(request.query.variance) || 0;
	console.log(request.headers);
	var secret = request.headers['x-mashape-proxy-secret'];
	if (!secret) return response.status(401).send('Header X-Mashape-Proxy-Secret is not present');
	if (secret !== config.mashape_secret) return response.status(401).send('Invalid X-Mashape-Proxy-Secret');
	if (variance === -1) variance = undefined;
	return response.send(susie.solve(anagram, variance));
})

app.use(express.static('public'));

var server = app.listen(config.port, function() {
	console.log('server listening on port %s', config.port);
});
