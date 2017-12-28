var dateUtil = {};
dateUtil.getUTCUnixTime = function() {
  return new Date().getTime();
}

module.exports = dateUtil;
