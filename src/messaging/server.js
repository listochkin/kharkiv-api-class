/* jshint node:true */
'use strict';

var http = require('http'),
    browserify = require('browserify'),
    path = require('path'),
    es = require("engine.io-stream");

var server = http.createServer(function (req, res) {
  if (req.url == '/') {
    res.end('<script src="bundle.js"></script>');
  } else if (req.url == '/bundle.js') {
    browserify([path.join(__dirname, 'client.js')]).bundle().pipe(res);
  }
});

var engine = es(function (stream) {
  var n = 0;
  setInterval(function () {
    stream.write(n++);
  }, 50);

  stream.on('data', function (data) {
    console.log(data);
  });
});

engine.attach(server, "/messages");

server.listen(3000);
