const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../index');
const Utility = require('../utility');
const request = require('supertest');
chai.use(chaiHttp);

describe('/verfies the jwttoken', () => {
  it('check the tokens', () => {
      const testData = {
        'emailAddress':'shahvidit39@gmail.com',
        'password':"$2a$10$AJRFiZGSv/DuphwOTjcnue3Y0Ztq4Kph4lOL335pbhucB1auxcQby"
      }
      const testToken = Utility.EncryptToken(testData);
      let queryPost = {
        "jwtToken": testToken
      }
      request(app)
          .post('/verified')
          .query({
            API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
          })
          .send(queryPost)
          .end((err, res) => {
            assert.isNull(err);
            assert.isTrue(res.statusCode != 404);
            assert.isTrue(res.statusCode == 200);
          });
      });
    });
