/// <reference path="typings/node/node.d.ts"/>

var express = require('express');
var extend = require('extend');
var jade = require('jade');
var util = require('util');
var susie = require('./susie.js');

var port = process.env.PORT || 3000;

var app = express();

var jadeOptions = {doctype:'html'};
var jadeGlobals = {pageTitle:'Countdown'};

function compile(locals) {
	var fn = jade.compileFile('resources/template.jade', jadeOptions);
	return fn(extend({}, jadeGlobals, locals));
}

app.get('/', function(request, response) {
	var anagram = susie.createAnagram();
	response.send(compile({bestAnswers:['Hit Solve to find out!'],anagram:anagram}));
});

app.get('/:anagram(\\w+)', function(request, response) {
	var anagram = request.params.anagram;
	var bestAnswers = susie.solve(anagram);
	response.send(compile({bestAnswers:bestAnswers,anagram:anagram}));
});

app.use(express.static('public'));

var server = app.listen(port, function() {
	console.log('server listening on port %s', port);
});
