var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<html><body><h1>API Final Project DPSI</h1><p>by Zulfan Faizun Najib</p></body></html>');
});

module.exports = router;
