const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require('supertest');
const { assert } = require("chai");
const sec_utils = require('../security_utils');
const app = require("../index");

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

describe('Verify the jwt token and return the if valid or not', () => {
  it('verifies the token for patient', () => {
    let queryPost = {
      // email:"m@gmail.com",
      token: testToken
    }
    request(app)
      .post('/reset_password/check')
      .query({
        API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
      })
      .send(queryPost)
      .end((err, res) => {
        console.log(res.statusCode);
        assert.isNull(err);
        assert.isTrue(res.statusCode != 404);
        assert.isTrue(res.statusCode == 200);
      });
    });
});

describe('/Generate a JWT token for user/patient object and save it in db', () => {
  it('reset password for patient', () => {
    let queryPost = {
      "email":"testeremail@gmail.com",
    }
    request(app)
      .post('/reset_password')
      .query({
        API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
      })
      .send(queryPost)
      .end((err, res) => {
        console.log(res.statusCode);
        assert.isNull(err);
        assert.isTrue(res.statusCode != 404);
        assert.isTrue(res.statusCode == 200);
      });
  });
});

describe('change password for patient', () => {
  it('password change', () => {
    let queryPost = {
      "token": testToken
    }
    request(app)
      .post('/reset_password/change_password')
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
