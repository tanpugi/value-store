/**
 ** Application Properties extractor
 ** TODO: must use environment variables instead for added security/portability(as suggested for a 12Factor Application Manifesto).
 ** author: https://github.com/tanpugi/
*/
const appProps = require("./app-properties.json");
const appPropsTest = require("./app-properties-test.json");

let environment = process.env.NODE_ENV;
let appPropsFinal = appProps;
if (environment === 'test') {
  appPropsFinal = appPropsTest;
}

module.exports = appPropsFinal;
