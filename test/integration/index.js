let apptest = require('../../app-test');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

function importTest(name, path) {
    describe(name, function () {
        require(path)();
    });
}


global.server;
before(done => {
  apptest(done).then(
    function(app) {
      global.server = app;
    }
  )
});

importTest('keyval-api','./keyvalAPI');
importTest('keyval-api-negative','./keyvalAPINegative');

after(function () {
  //global.server.close();
});
