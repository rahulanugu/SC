const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require('supertest');
const sec_utils = require('../security_utils');
const { assert } = require("chai");

const app = require('../index');

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

describe('/It is used for generating a JWT token to initiate a password reset request for healthcareProvider portal', () => {
  it('JWT password reset', () => {
    let createPost = {
      'email':'testeremail@gmail.com'
      }
      request(app)
          .post('/backend/healthcare/reset_password')
          .query({
            API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
          })
          .send(createPost)
          .end((err, res) => {
            assert.isNull(err);
            assert.isTrue(res.statusCode != 404);
            assert.isTrue(res.statusCode == 200);
          });
      });
    });


describe('/Verify the jwt token and return the if valid or not', () => {
  it('verifies the JWT token', () => {
    let queryPost = {
      "token": testToken
    }
    request(app)
      .post('/backend/healthcare/reset_password/check')
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

describe('/change password for healthcareprovider', () => {
  it('It is used for the changing password', () => {
    let queryPost = {
      "token":"xeKw6fIjwH7nJPph",
      "password":"$2a$10$k2kDfbaiqJFLVV9FQrbs5euEC1ybn8xfDe1"
    }
    request(app)
      .post('/backend/healthcare/reset_password/change_password')
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

