//create webserver
var http = require('http'); 
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = require('./comments');
var mime = require('mime');
var cache = {};

