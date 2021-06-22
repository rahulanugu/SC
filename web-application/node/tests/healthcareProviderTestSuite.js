const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require('supertest');

const app = require('../index');

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

describe('/the creation of a new healthcareprovider user', () => {
  it('create a healthcare user', () => {
    let createPost = {
      "firstName":"Anitha",
      "lastName":"Nav",
      "companyName":"ScriptChainLLC",
      "roleInCompany":"Intern",
      "email":"anithanarnavaram7@gmail.com","password":"$2a$10$AJRFiZGSv/DuphwOTjcnue3Y0Ztq4Kph4lOL335pbhucB1auxcQby",
      "phone":"(352) 745-4724",
      "password": "234",
      "ehr": "ehr"
      }
      request(app)
          .post('/backend/healthcare/account/create')
          .query({
            API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
          })
          .send(createPost)
          .end((err, res) => {
            console.log('statusCode: ', res.statusCode);
            assert.isNull(err);
            assert.isTrue(res.statusCode != 404);
            assert.isTrue(res.statusCode == 200);
          });
      });
    });

  describe('/Create a new healthcare provider in the db', () => {
      it('verifies the healthcare', () => {
        let queryPost = {
          "jwtToken":"xeKw6fIjwH7nJPph"
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
