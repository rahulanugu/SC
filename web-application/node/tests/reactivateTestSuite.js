const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require('supertest');

const app = require('../index');
chai.use(chaiHttp);

/*
 * This file tests the reactivation of different types of accounts once deactivated.
 * 
 * Third-party libraries used:
 *                            1. Supertest: Used to test the end points.
 *                            2. Chai's assertion library to do the assertions.
 *                            3. Mocha: The testing framework in which the tests are written.
 */

describe('/request reactivation of a patient account', () => {
  it('patient reactivation', () => {
    let queryPost = {
      'email': 'johndoe@gmail.com',
      }
      request(app)
          .post('/backend/reactivate/patient/request')
          .query({
            API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
          })
          .send(queryPost)
          .end((err, res) => {
            assert.isNull(err);
          });
      });
    });
  describe('/request reactivation of a Healthcareprovider account', () => {
      it('Healthcare reactivation', () => {
        let queryPost = {
          'email': 'johndoe@gmail.com',
          }
          request(app)
              .post('/backend/reactivate/healthcare/request')
              .query({
                API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
              })
              .send(queryPost)
              .end((err, res) => {
                assert.isNull(err);
              });
          });
        });
  describe('/move a patient object from DeactivatedPatient', () => {
    it('insert patient object', () => {
      let queryPost = {
        "token":"xeKw6fIjwH7nJPph"
      }
      request(app)
      .post('/backend/reactivate/patient/activate')
      .query({
        API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
      })
      .send(queryPost)
      .end((err, res) => {
        assert.isNull(err);
      });
     });
    });
describe('/move a healthcare provider object from DeactivatedHealthcareProvider database to HealthcareProvider database', () => {
      it('Insert healthcare object', () => {
        let queryPost = {
          "token":"xeKw6fIjwH7nJPph"
        }
        request(app)
        .post('/backend/reactivate/healthcare/activate')
        .query({
          API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
        })
        .send(queryPost)
        .end((err, res) => {
          assert.isNull(err);
        });
       });
      });


