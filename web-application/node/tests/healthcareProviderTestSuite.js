const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require('supertest');
const bcrypt = require('bcryptjs');

const app = require('../index');
const sec_utils = require('../utils/security_utils');
chai.use(chaiHttp);

/*
 * Testing the creation of a new healthcare provider user. The first test creates the account and the second test
 * verifies whether the details have been stored in the database successfully.
 * 
 * Third-party libraries used:
 *                            1. Supertest: Used to test the end point.
 *                            2. Chai's assertion library to do the assertions.
 *                            3. Mocha: The testing framework in which the tests are written
 */
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
/*
describe('/the creation of a new healthcareprovider user', () => {
  it('create a healthcare user', () => {
    let createPost = {
      "firstName":"Anitha",
      "lastName":"Nav",
      "companyName":"ScriptChainLLC",
      "roleInCompany":"Intern",
      "email":"testeremail@gmail.com",
      "password": "password123",
      "phone":"(352) 745-4724",
      "photo": "../images/IMG_00000",
      "ehr": "ehr"
    }
    request(app)
      .post('/backend/healthcare/account/create')
      .query({
        API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
      })
      .send(createPost)
      .end((err, res) => {
        console.log('/healthcare/account/create statusCode: ', res.statusCode);
        assert.isNull(err);
        assert.isTrue(res.statusCode != 404);
        assert.isTrue(res.statusCode == 200);
      });
    });
  });


describe('/Create a new healthcare provider in the db', () => {
    it('verifies the healthcare', () => {
      const testData = {
        'email':'testeremail@gmail.com',
        'password': hashpassword
      }
      const testToken = sec_utils.EncryptToken(testData);
      let queryPost = {
        "jwtToken": testToken
      }
      request(app)
          .post('/backend/healthcare/account/verify')
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
*/