var zombie = require('zombie');
var port = process.env.PORT || 3000;

require('../../../server'); // Start server

var World = module.exports = function () {
  this.browser = new zombie({ runScripts: true, debug: false });

  this.page = function (path) {
    return "http://localhost:" + port + path
  };

  this.visit = function (path, callback) {
    this.browser.visit(this.page(path), function (err, browser, status) {
      callback(err, browser, status);
    });
  };
};
