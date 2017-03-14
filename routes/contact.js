var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

router.get('/',function(req, res, next) {
	res.render('contact', {title: 'Contact'});
});

router.post('/send', function(req, res, next){
	smtpTransport = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'archay30@gmail.com',
			pass: '09302016'
		},
		tls: {
			rejectUnathorized: false
		}
	});

	var mailOptions = {
		from: ''+req.body.first_name+'<johndoe@outlook.com>',
		to: 'archay30@gmail.com',
		subject: 'Customers comments and suggestions',
		text: 'A new message has arrived. Check it out..First Name: '+req.body.first_name+ ' Last Name: '+req.body.last_name+' Email: '+req.body.email+' Message: '+req.body.message+'',
		html: '<p>You got new message</p><ul><li>First Name: '+req.body.first_name+'</li><li>Last Name: '+req.body.last_name+'</li><li>Email: '+req.body.email+'</li><li>Content: '+req.body.message+'</li></ul>'
	};

	smtpTransport.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/contact');
		}
	smtpTransport.close();
	});
});

module.exports = router;