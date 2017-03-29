var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
	var data = req.body.events
	console.log(data)
	console.log(data.source)
	res.send({ test: "test" })
})

module.exports = router;
