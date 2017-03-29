var express = require('express');
var router = express.Router();
var LINEBot = require('line-messaging');

var bot = LINEBot.create({
	channelID: '1499098268',
	channelSecret: '347ab0e4feda826bc266828dba9cdca7',
	channelToken: 'zxr7Rjgp5Z1fBXsDRm4AlRAbBYlgSkbCtFjQhuFfVGHtsb+2lG/xMQT7Wb/EuswgqwtDau3EARfAwzghvtXTvBPs0NGN65+O4ZF+Ns1hr38n6H2+BB20LeLFsZu+nmZORMMTC1AA0WaEyeB5+nkgAAdB04t89/1O/w1cDnyilFU='
});
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/sendMsg', function(req, res, next) {
	let msg = "test 1 "
	let userId = "U3727f363a9782fb3b93b59b77d454433"
	bot.pushTextMessage(userId, msg)
	res.send({ status: 0, data: msg })
})

router.get('/sendSticker', (req, res, next) => {
	let userId = "U3727f363a9782fb3b93b59b77d454433"
	bot.pushStickerMessage(userId, 1, 1);
	res.send({ status: 0, data: "sendSticker" })
})

router.get('/getProfile', function(req, res, next) {
	let msg = "test 1 "
	let userId = "U3727f363a9782fb3b93b59b77d454433"
	bot.getProfile(userId)
		.then((data) => {
			console.log(data)
			res.send(data)
		}).catch((err) => {
			console.log(err)
		})
})

router.post('/', function(req, res, next) {
	let data = req.body.events[0]
	console.log(data)
	console.log(data.source)
	let replyToken = data.replyToken
	let userId = data.source.userId
	bot.getProfile(userId)
		.then(data => {
			return new Promise((resolve, reject) => {
				try {
					console.log(data.displayName)
					resolve(data.displayName)
				} catch (err) {
					reject(err)
				}
			})
		})
		.then(name => {
			bot.replyTextMessage(replyToken, 'สวัสดีค่ะ ' + name + ' ^^')
				.then(function(data) {
					bot.pushStickerMessage(userId, 2, 34)
						.then()
						.catch(err => console.log(err));
				})
				.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
	res.send({ test: "test" })
})



module.exports = router;
