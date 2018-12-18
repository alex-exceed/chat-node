var app        = require('express')();
var http       = require('http');
var bodyParser = require('body-parser');
var socket     = require('./lib/socket');
var chat       = require('./routes/chat');

var server = http.createServer(app);

socket.createConnection(server);
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.use(bodyParser.json());
app.use('/chat', chat);

server.listen(8080, function () {
	console.log('Running server on port %s', 8080);
});
