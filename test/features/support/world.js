var puppeteer = require('puppeteer');
var port = process.env.PORT || 3000;

require('../../../server'); // Start server

var World = module.exports = function () {
  this.browser = puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  this.page = function (path) {
    return "http://localhost:" + port + path
  };

  this.visit = function (path, callback) {
    var world = this;
    this.browser
      .then(function (browser) {
        return browser.newPage();
      })
      .then(function (page) {
        world.currentPage = page;
        return page.goto(world.page(path));
      })
      .then(function (response) {
        callback(null, world.currentPage, response.status());
      })
      .catch(callback);
  };
};
