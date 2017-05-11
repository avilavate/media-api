var http = require('http');
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