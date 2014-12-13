/* jshint node:true, mocha:true, eqnull:true */
'use strict';

var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

var request = require('request');
var jsdom = require("jsdom");

describe('Simple Node tests', function () {

  it('should pass', function () {
//     assert(1 === '1', 'WHA?');
    expect(1).to.equal(1);
  });

  it('Should load a page', function (done) {
    request('https://www.npmjs.org/', function (error, response, body) {
      assert(error == null, 'Error connecting to host');
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('Http tests', function () {

// <div id="home-stats">
//       <div class="stat icon-package-hex">
//         <strong class="pretty-number">112023</strong>
//         total packages
//       </div>

  it('Should load # of packages', function (done) {
    request('http://nodejs.org/dist/', function (error, response, body) {
      assert(error == null, 'Error connecting to host');
      expect(response.statusCode).to.equal(200);
      jsdom.env(response.body, function (error, window) {
        var releaseCount = window.document.querySelectorAll("a").length;
        expect(releaseCount).to.be.greaterThan(200);
        done();
      });
    });
  });

  var promisify = require('bluebird').promisify,
      http = promisify(function (options, cb) {
        request(options, function (error, response, body) {
          cb(error, response);
        })
      }),
      dom = promisify(jsdom.env);

  it('Should load # of packages with Promises', function (done) {
    http('http://nodejs.org/dist/').then(function (response) {
      expect(response.statusCode).to.equal(200);
      return dom(response.body);
    }).then(function (window) {
      var releaseCount = window.document.querySelectorAll("a").length;
      expect(releaseCount).to.be.greaterThan(200);
      done();
    });
  });
});