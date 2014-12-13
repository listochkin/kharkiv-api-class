var engine = require("engine.io-stream"),
    multilevel = require('multilevel'),
    liveStream = require('level-live-stream'),
    container = require('container-el');

// attach to an engine.io server at url '/numbers'
var stream = engine("/messages")

var manifest = require('./manifest.json');
var db = multilevel.client(manifest);

stream.pipe(db.createRpcStream()).pipe(stream);

db.createLiveStream().on('data', function (record) {
  var p = document.createElement('p');
  p.innerHTML = record.value.text;
  container.appendChild(p);
});

window.db = db;
