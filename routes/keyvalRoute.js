var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var KeyValModel = require('../model/keyval');
var Utils = require('../utils');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method
      delete req.body._method
      return method
    }
}))

router.route('/:key')
    .get(function(req, res, next) {
        var key = req.params.key;
        var timestamp = req.query.timestamp;

        var successfn = function(val) { res.json(val); };
        KeyValModel.findByKey(key, {timestamp: timestamp}, successfn, next);
    });

router.route('/')
    .post(function(req, res, next) {
        var key = req.body.key;
        var value = req.body.value;
        var timestamp = Utils.Date.getUTCUnixTime();

        var successfn = function(val) { res.json(val); };
        KeyValModel.createNew({
            key: key,
            value: value,
            timestamp: timestamp
        }, successfn, next);
    });

module.exports = router;
