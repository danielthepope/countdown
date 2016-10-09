var zombie = require('zombie');
var HTML5  = require('html5');
var server = require('../../../server');

var World = module.exports = function(){
  this.browser = new zombie({runScripts:true, debug:false, htmlParser: HTML5});

  this.page = function(path){
   return "http://localhost:3000" + path
  };

  this.visit = function(path, callback){
    this.browser.visit( this.page(path), function(err, browser, status){
      callback(err, browser, status);
    });
  };
};
