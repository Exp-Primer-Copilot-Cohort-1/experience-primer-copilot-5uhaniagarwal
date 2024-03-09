//create web server
//npm install express
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
//npm install body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//npm install path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/comments', function(req, res) {
	fs.readFile('comments.json', function(err, data) {
		res.setHeader('Content-Type', 'application/json');
		res.send(data);
	});
});

app.post('/comments', function(req, res) {
	fs.readFile('comments.json', function(err, data) {
		var comments = JSON.parse(data);
		comments.push(req.body);
		fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(comments));
		});
	});
});

app.listen(3000, function() {
	console.log('Server is running on port 3000');
});