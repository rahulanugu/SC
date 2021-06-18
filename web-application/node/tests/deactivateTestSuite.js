const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const request = require("supertest");
const { assert } = require("chai");
const expect = chai.expect;
const should = chai.expect;
chai.use(chaiHttp);

/*
 * This test file is used to test deactivation of accounts. It searches for the given email in the database and then
 * deactivates the associated account. If an account with the associated email address is not found, a response
 * with status code 404 is returned.
 * 
 * Third-party libraries used:
 *                              1. Supertest -> A library for testing backend endpoints. Used to send a post request to the
 *                                              deactivate endpoint.
 * 
 *                              2. Chai Assertion Library: Used to do the assertions.
 */

describe("/POST a query", () => {
  it("create a query", () => {
    let queryPost = {
      email: "johndoe@gmail.com",
    };
    request(app)
      .post("/backend/deactivate/patient")
      .query({
        API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
      })
      .send(queryPost)
      .end((err, res) => {
        assert.isNull(err);
      });
    });
  });

  describe("/POST a query", () => {
    it("create a query", () => {
      let queryPost = {
        email: "johndoe@gmail.com",
      };
      request(app)
      .post("/backend/deactivate/healthcare")
      .query({
        API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
      })
      .send(queryPost)
      .end((err, res) => {
        console.log("status code is ", res.statusCode);
        assert.isNull(err);
      });
  });
});
