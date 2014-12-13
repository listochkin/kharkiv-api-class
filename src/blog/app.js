/* jshint node:true */
'use strict';

var express = require('express');

var app = express();

module.exports = app;

app.post('/login', function (req, res) {
  res.sendStatus(200);
});

