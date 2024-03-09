//create webserver
var http = require('http');
var url = require('url');

//create server
http.createServer(function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var name = query.name;
  var comment = query.comment;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Name: ' + name + ', Comment: ' + comment);
}).listen(8080, '