var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'e - PRICE CHECK Mo', user: req.user });
});

module.exports = router;
