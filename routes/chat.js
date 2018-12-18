var express = require('express');
var uuid = require('uuid');
var router = express.Router();

// mock users
var users = [];

router.post('/join', function(req, res) {
	var isUserExist = users.find(function(user) {
		return user.name === req.body.name;
	});

	if (isUserExist) {
        res.status(500).send();
	} else {
		var user = {
			name: req.body.name,
			userId: uuid(),
			timestamp: new Date().getTime(),
			avatar: 'https://ptetutorials.com/images/user-profile.png'
		};
		users.push(user);
        res.status(200).send(user);
	}
});

router.post('/leave', function(req, res) {
	users = users.filter(function(user) {
		return user.userId !== req.body.userId
	});
    res.status(200).send();
});

router.get('/users', function(req, res) {
	res.status(200).send(users);
});

module.exports = router;