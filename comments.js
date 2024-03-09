//create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mean-demo', { useNewUrlParser: true });

var Comment = mongoose.model('Comment', {
  title: String,
  content: String,
  date: Date
});

app.get('/api/comments', function (req, res) {
  Comment.find(function (err, comments) {
    if (err) return console.error(err);
    res.json(comments);
  });
});

app.post('/api/comments', function (req, res) {
  var comment = new Comment(req.body);
  comment.save(function (err, comment) {
    if (err) return console.error(err);
    res.json(comment);
  });
});

app.listen(3000, function () {
  console.log('Server is running on http://localhost:3000');
});

