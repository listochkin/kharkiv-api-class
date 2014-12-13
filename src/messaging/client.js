console.log('HELLO');

var engine = require("engine.io-stream")

// attach to an engine.io server at url '/numbers'
var stream = engine("/messages")

stream.on('data', function(data) {
  console.log(data)
  stream.write('ack')
});

var n = 0;
setInterval(function () {
  stream.write(n++);
}, 100)

