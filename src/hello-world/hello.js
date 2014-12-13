/* jshint node:true */
'use strict';

var http = require('http');

var port = process.env.PORT || 3000;
var server = http.createServer(function (req, res) {
  res.end('Hello World!');
});

server.listen(port, function () {
  console.log('Server started on port ' + port);
});
