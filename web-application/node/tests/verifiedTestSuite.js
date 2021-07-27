const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../index');
const sec_utils = require('../security_utils');
const request = require('supertest');
chai.use(chaiHttp);

const password = "password123";
const hashpassword = new Promise((resolve) => {
  sec_utils.encryptPassword(password).then(res => {
    if (res.statusCode === 200) return resolve(res.body);
    resolve(res)
  });
});

const testData = {
  'email':'testeremail@gmail.com',
  'password': hashpassword
}
const testToken = sec_utils.EncryptToken(testData);

describe('/verfies the jwttoken', () => {
  it('check the tokens', () => {
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
