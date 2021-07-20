const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require('supertest');

const app = require('../index');

chai.use(chaiHttp);

/*
 * Tests whether a user trying to login to the portal is legitimate or not.
 * 
 * Third-party libraries used:
 *                            1. Supertest: Used to test the endpoints
 *                            2. Chai's assertion library to do the assertions
 *                            3. Mocha: The testing framework in which the tests are written
 */

describe('/validates the user/patient to log in to the portal', () => {
   it('check the users', () => {
     let queryPost = {
       "email":"testeremail@gmail.com",
       "password":"password123"
       }
       request(app)
           .post('/patient-login')
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
