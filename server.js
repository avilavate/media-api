var http = require('http');
var https = require('https');
var express = require('express');
var app = express();

app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');

http.createServer(app).listen(app.get('port'), app.get('ip'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function (req, res) {

    res.setHeader('content-type', 'text/javascript');
    res.send('Hello World!');
});

app.get('/tracks', function (req, res) {
    let tracks = 'default';
    return https.get('https://api.spotify.com/v1/artists/1c22GXH30ijlOfXhfLz9Df/top-tracks?country=us'
        , function (response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {

                // Data reception is done, do whatever with it!
                tracks = JSON.parse(body);
                res.send(tracks);
            });
        });

});

app.get("/test", function (req, res) {
    console.dir(req.query);
    var body = '';
    if (req.query.post === undefined || parseInt(req.query.post) !== NaN) res.send(400, 'invalid query');
    else {
        return https.get(`https://jsonplaceholder.typicode.com/posts/${req.query.post}`, function (response) {

            response.on('data', function (d) {
                body += d;
            });

            response.on('end', function () {

                // Data reception is done, do whatever with it!
                return res.send(200, body);
            });
        });
    }
});