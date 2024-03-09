//create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = require('./comments');
var mime = require('mime');

var server = http.createServer(function(request, response){
    var urlObj = url.parse(request.url, true);
    var pathname = urlObj.pathname;
    //console.log(pathname);
    if(pathname == '/'){
        pathname = '/index.html';
    }
    if(pathname == '/index.html'){
        fs.readFile('./index.html', 'utf8', function(err, data){
            if(err){
                console.log(err);
                response.end('404');
            }else{
                response.end(data);
            }
        });
    }else if(pathname == '/comments'){
        var data = comments.get();
        response.end(data);
    }else{
        fs.readFile('.' + pathname, function(err, data){
            if(err){
                response.end('404');
            }else{
                response.setHeader('content-type', mime.lookup(pathname));
                response.end(data);
            }
        });
    }
});
server.listen(8080, function(){
    console.log('listening on 8080');
});
// Path: comments.js
var fs = require('fs');
var path = './data.json';
function get(){
    var data = fs.readFileSync(path, 'utf8');
    return data;
}
function add(comment){
    var data = JSON.parse(fs.readFileSync(path, 'utf8'));
    data.push(comment);
    fs.writeFileSync(path, JSON.stringify(data));
}
module.exports = {
    get: get,
    add: add
};
