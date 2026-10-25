var expect = require('chai').expect;

var sharedSteps = module.exports = function(){
  this.World = require('../support/world');

  this.After(function () {
    return this.browser
      .then(function (browser) {
        return browser.close();
      });
  });

  this.Given(/^I am on the home page$/, function(next) {
    this.visit('/', next);
  });

  this.Given(/^I visit "([^"]*)"$/, function (page, next) {
    this.visit(page, next);
  });

  this.Given(/^I replace the anagram with "([^"]*)"$/, function (text, next) {
    this.currentPage
      .$eval('#board', function (board, value) {
        board.value = value;
      }, text)
      .then(function () {
        next();
      }).catch(next);
  });

  this.When(/^I press the "([^"]*)" button$/, function (buttonText, next) {
    var page = this.currentPage;
    var clickButton = function () {
      return page.$$eval('button', function (buttons, text) {
        var button = buttons.find(function (candidate) {
          return candidate.textContent.trim() === text;
        });

        if (!button) {
          throw new Error('Could not find button "' + text + '"');
        }

        button.click();
      }, buttonText);
    };

    var action = buttonText === 'Solve'
      ? Promise.all([page.waitForNavigation(), clickButton()])
      : clickButton();

    action.then(function () {
      next();
    }).catch(next);
  });

  this.Then(/^I should see "([^"]*)"$/, function(text, next) {
    this.currentPage
      .$eval('body', function (body) {
        return body.innerText;
      })
      .then(function (bodyText) {
        expect(bodyText).to.contain(text);
        next();
      }).catch(next);
  });

  this.Then(/^I should see (\d+) letters in the anagram box$/, function (letterCount, next) {
    var world = this;
    this.currentPage
      .$eval('#board', function (board) {
        return board.value;
      })
      .then(function (value) {
        world.originalBoardValue = value;
        expect(world.originalBoardValue).to.have.lengthOf(parseInt(letterCount, 10));
        next();
      }).catch(next);
  });

  this.Then(/^I should see some answers$/, function (next) {
    this.currentPage
      .$$eval('p.result', function (results) {
        return results.length;
      })
      .then(function (resultCount) {
        expect(resultCount).to.be.greaterThan(0);
        next();
      }).catch(next);
  });

  this.Then(/^I should not see any answers$/, function (next) {
    this.currentPage
      .$$eval('p.result', function (results) {
        return results.length;
      })
      .then(function (resultCount) {
        expect(resultCount).to.equal(0);
        next();
      }).catch(next);
  });

  this.Then(/^the anagram box should have different letters$/, function (next) {
    var world = this;
    this.currentPage
      .$eval('#board', function (board) {
        return board.value;
      })
      .then(function (newBoardValue) {
        expect(newBoardValue).not.to.equal(world.originalBoardValue);
        next();
      }).catch(next);
  });
}
