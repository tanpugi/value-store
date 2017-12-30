/**
 ** KeyValue API tests (positive scenarios)
 ** author: https://github.com/tanpugi/
*/
let apptest = require('../../app-test');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let KeyvalAPI = function() {
  const logger = require("../../utils/logutil");
  const DateUtil = require('../../utils/dateutil');

  describe('Cleans test collection.', () => {
    beforeEach((done) => { //Before each test we empty the database
      KeyValModel.remove({}, (err) => {
         done();
      });
    });
  });

  describe('/POST object', () => {
      it('it should POST an object with required fields', (done) => {
        let keyval = {
            key: "key1",
            value: "J.R.R. Tolkien"
        };
        chai.request(global.server)
            .post('/object')
            .send(keyval)
            .end((err, res) => {
                res.should.have.status(201);
              done();
            });
      });
  });

  describe('/GET /object/:key', () => {
    it('it should GET the object based on key', (done) => {
      chai.request(global.server)
          .get('/object/key1')
          .end((err, res) => {
              res.should.have.status(200);
            done();
          });
      });
  });

  describe('/GET /object/:key?timestamp={timestamp}', () => {
    it('it should GET the object based on key', (done) => {
      chai.request(global.server)
          .get('/object/key1?timestamp='+DateUtil.getUTCUnixTime())
          .end((err, res) => {
              res.should.have.status(200);
            done();
          });
      });
  });
};

module.exports = KeyvalAPI;
