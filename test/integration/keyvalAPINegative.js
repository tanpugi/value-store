/**
 ** KeyValue API tests (negative scenarios)
 ** author: https://github.com/tanpugi/
*/
let apptest = require('../../app-test');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let KeyvalAPINegative = function(server) {
  const logger = require("../../utils/logutil");
  const DateUtil = require('../../utils/dateutil');

  describe('Cleans test collection.', () => {
    beforeEach((done) => { //Before each test we empty the database
      KeyValModel.remove({}, (err) => {
         done();
      });
    });
  });

  describe('/POST object(error 400)', () => {
      it('it should not POST an object with invalid required fields', (done) => {
        let keyval = {
            key: "",
            value: "J.R.R. Tolkien"
        };
        chai.request(global.server)
            .post('/object')
            .send(keyval)
            .end((err, res) => {
                res.should.have.status(400);
              done();
            });
      });
  });

  describe('/GET /object(error 404)', () => {
    it('it should say not found', (done) => {
      chai.request(global.server)
          .get('/object/')
          .end((err, res) => {
              res.should.have.status(404);
            done();
          });
      });
  });

  describe('/GET /object/:key?timestamp={timestamp}(error 400)', () => {
    it('it should not get object as timestamp is invalid', (done) => {
      chai.request(global.server)
          .get('/object/key1?timestamp=x')
          .end((err, res) => {
              res.should.have.status(400);
            done();
          });
      });
  });
};

module.exports = KeyvalAPINegative;
