/* jshint node:true */
'use strict';

var http = require('http'),
    browserify = require('browserify'),
    path = require('path'),
    es = require("engine.io-stream"),
    levelup = require('levelup'),
    multilevel = require('multilevel'),
    liveStream = require('level-live-stream');

var db = levelup('/path/to/file', {
  valueEncoding: 'json',
  db: require('memdown')
});

db.put('key', 'hahaha!', function (error) {
  db.get('key', function (error, value) {
    console.log(value);
  });
});

liveStream.install(db);
multilevel.writeManifest(db, __dirname + '/manifest.json');

var server = http.createServer(function (req, res) {
  if (req.url == '/') {
    res.end('<script src="bundle.js"></script>');
  } else if (req.url == '/bundle.js') {
    browserify([path.join(__dirname, 'client.js')]).bundle().pipe(res);
  }
});

var engine = es(function (stream) {
  var magicStream = multilevel.server(db);
  stream.pipe(magicStream).pipe(stream);
});

engine.attach(server, "/messages");

server.listen(3000);
