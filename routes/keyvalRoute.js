/**
 ** KeyValue Routing
 ** author: https://github.com/tanpugi/
*/
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const KeyValModel = require('../model/keyval');
const DateUtil = require('../utils/dateutil');
const ValidateUtil = require('../utils/validateutil');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method
      delete req.body._method
      return method
    }
}))

router.route('/:key')
    .get(function(req, res, next) {
        let key = req.params.key;
        let timestamp = req.query.timestamp;

        let successfn = function(val) {
          if (val) {
            res.json({
              key: val.key,
              value: val.value || '',
              timestamp: val.timestamp || ''
            });
          } else {
            next();
          }
        };

        ValidateUtil.build()
          .then(function(v) { return v.validate(key, {required: true, min: 1}); })
          .then(function(v) { return v.validate(timestamp, {type: 'number'}); })
          .then(function(v) {
            KeyValModel
              .findByKey(key, {timestamp: timestamp})
              .then(successfn)
              .catch(next);
            }
          )
          .catch(function(err) {
            err.status = 400;
            next(err);
          });
    });

router.route('/')
    .post(function(req, res, next) {
        let key = req.body.key;
        let value = req.body.value;
        let timestamp = DateUtil.getUTCUnixTime();

        let successfn = function(val) {
          res.status(201)
          res.json({
            key: val.key,
            value: val.value || '',
            timestamp: val.timestamp || ''
          });
        };

        ValidateUtil.build()
          .then(function(v) { return v.validate(key, {required: true, min: 1}); })
          .then(function(v) {
            KeyValModel
              .createNew({
                key: key,
                value: value,
                timestamp: timestamp
              })
              .then(successfn)
              .catch(next);
            }
          )
          .catch(function(err) {
            err.status = 400;
            next(err);
          });
    });

module.exports = router;
