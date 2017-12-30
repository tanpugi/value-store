/**
 ** Validation helpers(TODO: use express-validator instead)
 ** author: https://github.com/tanpugi/
*/
var Promise = require("bluebird");

function validateRequired(val) {
  if (val === undefined) { return false; }
  return true;
};
function validateLength(val, max, min) {
  if (!val) { val = 0; }
  if (!max) { max = 999999999; }
  if (!min) { min = 0; }

  if (isNaN(val)) {
    return val.length <= max && val.length >= min;
  } else {
    return val <= max && val >= min;
  }
  return false;
};
function validateType(val, type) {
  if (!type) { type = 'string'; }
  if (!val) { return true; }
  if (type === 'number') {
    return !isNaN(val);
  }
  return false;
};

function ValidateBuilder() {}
ValidateBuilder.prototype.validate = function(val, pattern) {
  var _this = this;
  return new Promise(function(resolve, reject){
    if (pattern) {
      if (pattern.required && !validateRequired(val)) {
        return reject(new Error("required value"));
      }
      if (pattern.type && !validateType(val, pattern.type)) {
        return reject(new Error("invalid type of value"));
      }
      if ((pattern.max || pattern.min) && !validateLength(val, pattern.max, pattern.min)) {
        return reject(new Error("invalid length of value"));
      }
    }
    return resolve(_this);
  });
}

const validateUtil = {
  build: function() {
    return new ValidateBuilder().validate();
  }
};

module.exports = validateUtil;
