const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require('supertest');

const app = require('../index');
const sec_utils = require('../utils/security_utils');
chai.use(chaiHttp);

/*
 * This file tests the reactivation of different types of accounts once deactivated.
 * 
 * Third-party libraries used:
 *                            1. Supertest: Used to test the end points.
 *                            2. Chai's assertion library to do the assertions.
 *                            3. Mocha: The testing framework in which the tests are written.
 */

function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxxxx'.replace(/[x]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

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

describe('/request reactivation of a patient account', () => {
  it('patient reactivation', () => {
    let queryPost = {
      'email': 'testeremail@gmail.com',
    }
    request(app)
    .post('/backend/reactivate/patient/request')
    .query({
      API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
    })
    .send(queryPost)
    .end((err, res) => {
      console.log('/backend/reactivate/patient/request', res.body);
      assert.isNull(err);
      assert.isTrue(res.statusCode != 404);
      assert.isTrue(res.statusCode == 200);
    });
  });
});

describe('/request reactivation of a Healthcareprovider account', () => {
  it('Healthcare reactivation', () => {
    let queryPost = {
      'email': 'testeremail@gmail.com',
    }
    request(app)
    .post('/backend/reactivate/healthcare/request')
    .query({
      API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
    })
    .send(queryPost)
    .end((err, res) => {
      console.log('/backend/reactivate/healthcare/request', res.body);
      assert.isNull(err);
      assert.isTrue(res.statusCode != 404);
      assert.isTrue(res.statusCode == 200);
    });
  });
});

describe('/move a patient object from DeactivatedPatient', () => {
  it('insert patient object', () => {
    let queryPost = {
      "jwtToken": testToken
    }
    request(app)
    .post('/backend/reactivate/patient/activate')
    .query({
      API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
    })
    .send(queryPost)
    .end((err, res) => {
      console.log('/backend/reactivate/patient/activate', res.body);
      assert.isNull(err);
      assert.isTrue(res.statusCode != 404);
      assert.isTrue(res.statusCode == 200);
    });
  });
});

describe('/move a healthcare provider object from DeactivatedHealthcareProvider database to HealthcareProvider database', () => {
  it('Insert healthcare object', () => {
    let queryPost = {
      "jwtToken": testToken
    }
    request(app)
    .post('/backend/reactivate/healthcare/activate')
    .query({
      API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
    })
    .send(queryPost)
    .end((err, res) => {
      console.log('/backend/reactivate/healthcare/activate', res.body);
      assert.isNull(err);
      assert.isTrue(res.statusCode != 404);
      assert.isTrue(res.statusCode == 200);
    });
  });
});


