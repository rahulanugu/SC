const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
const app = require("..");
chai.use(chaiHttp);

/*
 * Tests the creation of a new user. The first test creates a sample user and checks if the user has been
 * created succesfully. The second test checks the status code of the responsee when one or more of the
 * required fields to create a new user are missing.
 * 
 * Third-party libraries used:
 *                            1. Supertest: Used to test the endpoints
 *                            2. Chai's assertion library to do the assertions
 *                            3. Mocha: The testing framework in which the tests are written
 */

describe('/To save a new request access user', () => {
  
  it('creates new user', () => {
    let queryPost = {
      "fname":"teest",
      "lname":"Vedulla",
      "email":"rohin@gmail.com",
      "typeOfUser":"Potential_Patient"
      }
      request(app)
          .post('/request_access')
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

    it('should have status code of 400 if any of the fields are missing', () => {
      let fields = [
        {
          "fname":"teest",
          "lname":"Vedulla",
          "email":"rohin@gmail.com",
        },

        {
          "fname":"teest",
          "lname":"Vedulla",
          "typeOfUser":"Potential_Patient"
        },

        {
          "lname":"Vedulla",
          "email":"rohin@gmail.com",
          "typeOfUser":"Potential_Patient"
        },

        {
          "fname":"teest",
          "email":"rohin@gmail.com",
          "typeOfUser":"Potential_Patient"
        },

        {
          "fname":"teest",
          "lname":"Vedulla",
        },

        {
          "lname":"Vedulla",
          "email":"rohin@gmail.com",
        },

        {
          "email":"rohin@gmail.com",
          "typeOfUser":"Potential_Patient"
        },

        {
          "fname":"teest",
          "email":"rohin@gmail.com",
        },

        {
          "fname":"teest",
          "typeOfUser":"Potential_Patient"
        },

        {
          "lname":"Vedulla",
          "typeOfUser":"Potential_Patient"
        },

        {
          "fname":"teest"
        },

        {
          "lname":"Vedulla"
        },

        {
          "email":"rohin@gmail.com"
        },

        {
          "typeOfUser":"Potential_Patient"
        }

      ];

      for (var i = 0; i < fields.length; i++) {
        request(app)
            .post('/request_access')
            .query({
              API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
            })
            .send(fields[i])
            .end((err, res) => {
              assert(res.statusCode == 400);
            });
      }
    });
  });
  

