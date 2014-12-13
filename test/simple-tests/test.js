/* jshint node:true, mocha:true, eqnull:true */
'use strict';

var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

var request = require('request');

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
