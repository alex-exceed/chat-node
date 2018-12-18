var socket = require('socket.io'),
	redis  = require('redis');

function createConnection(server) {
	var io     = socket(server);
	var client = redis.createClient();

	io.on('connection', function (socket) {
		var subscribe = redis.createClient();
		subscribe.subscribe('pubsub');

		subscribe.on('message', function (channel, message) {
			socket.send(JSON.parse(message));
		});


		socket.on('message', function (msg) {
			client.publish('pubsub', msg);
		});

		socket.on('disconnect', function () {
			subscribe.quit();
		});
	});
}

module.exports = { createConnection };