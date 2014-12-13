/* jshint node:true, mocha:true, eqnull:true, esnext:true */
'use strict';

var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

var request = require('request');

describe.only('blog app', function () {

  var port = process.env.PORT || 3000,
      baseUrl = 'http://0.0.0.0:' + port,
      server;

  before(function (done) {
    var app = require('../../src/blog/app.js');
    server = require('http').createServer(app);
    server.listen(port, function () {
      done();
    });
  });

  after(function () {
    server.close();
  });
  it('should login', function (done) {
    request({
      method: 'POST',
      url: baseUrl + '/login',
      form: {
        username: 'john',
        password: 's3cret'
      }
    }, function (error, response) {
      assert(error == null, 'Error connecting to host');
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});