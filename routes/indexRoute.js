var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    title: 'Value Store API',
    author: 'github.com/tanpugi',
    created: '2017Dec28'
  });
});

module.exports = router;
