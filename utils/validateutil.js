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
      if (pattern.required) {
        return validateRequired(val) ? resolve(_this) : reject(new Error("required value"));
      }
      if (pattern.type) {
        return validateType(val, pattern.type) ? resolve(_this) : reject(new Error("invalid type of value"));
      }
      if (pattern.max || pattern.min) {
        return validateLength(val, pattern.max, pattern.min) ?
          resolve(_this) : reject(new Error("invalid length of value"));
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
