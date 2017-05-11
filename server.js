var express = require('express');
var app = express();
var http = require('http');

var fs = require("fs");

app.get('/listUsers', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

app.get('/tracks', function (req, res) {
    let options = {
        host: 'api.spotify.com',
        path: '/v1/artists/1c22GXH30ijlOfXhfLz9Df/top-tracks'
    };
    let callback = function (response) {
        let str = '';
        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });
        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            console.log(str);
        });
    };

    http.get(options, callback).end();
})

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port
    console.log(host, port);

    console.log("Example app listening at http://%s:%s", host, port)

})