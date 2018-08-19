var expect = require('chai').expect;

var sharedSteps = module.exports = function(){
  this.World = require('../support/world');

  this.Given(/^I am on the home page$/, function(next) {
    this.visit('/', next);
  });

  this.Given(/^I visit "([^"]*)"$/, function (page, next) {
    this.visit(page, next);
  });

  this.Given(/^I replace the anagram with "([^"]*)"$/, function (text, next) {
    this.browser.fill('#board', text);
    next();
  });

  this.When(/^I press the "([^"]*)" button$/, function (buttonText, next) {
    this.browser.pressButton(buttonText, next);
  });

  this.Then(/^I should see "([^"]*)"$/, function(text, next) {
    expect(this.browser.text('body')).to.contain(text);
    next();
  });

  this.Then(/^I should see (\d+) letters in the anagram box$/, function (letterCount, next) {
    this.originalBoardValue = this.browser.query('#board').value;
    expect(this.originalBoardValue).to.have.lengthOf(letterCount);
    next();
  });

  this.Then(/^I should see some answers$/, function (next) {
    expect(this.browser.evaluate("document.querySelectorAll('p.result').length")).to.be.greaterThan(0);
    next();
  });

  this.Then(/^I should not see any answers$/, function (next) {
    expect(this.browser.evaluate("document.querySelectorAll('p.result').length")).to.equal(0);
    next();
  });

  this.Then(/^the anagram box should have different letters$/, function (next) {
    var newBoardValue = this.browser.query('#board').value;
    expect(newBoardValue).not.to.equal(this.originalBoardValue);
    next();
  });
}
