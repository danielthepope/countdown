var expect = require('chai').expect;

var sharedSteps = module.exports = function(){
  this.World = require('../support/world');

  this.Given(/^I am on the home page$/, function(next) {
    this.visit('/', next);
  });

  this.Then(/^I should see "([^"]*)"$/, function(text, next) {
    expect(this.browser.text('body')).to.contain(text);
    next();
  });
}
