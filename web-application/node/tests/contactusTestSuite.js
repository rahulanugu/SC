const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
const faker = require('faker');
const { assert } = require("chai");
const app = require("../index");
const expect = chai.expect;
const should = chai.expect;
chai.use(chaiHttp);

/*
 * Testing if a random user can contact us and if the contact information
 * gets properly stored in the database.
 * 
 * Third-party Libraries used: 
 *                1. faker(), a library that is used to generate fake data.
 *                 Used for generating fake names and emails everytime a test is run.
 * 
 *                2. supertest(), a library to test backend endpoints. Used to send a
 *                   post request to the respective endpoint.
 * 
 *                3. Chai's assertion library to do the assertions.
 */
describe("/POST a query", () => {
  it("create a query", async () => {
    let queryPost = {
      FirstName: faker.name.firstName(),
      LastName: faker.name.lastName(),
      Email: faker.internet.email(),
      Message: "Hello"
    };
    var res = await request(app)
      .post("/contact_us/")
      .query({
        API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
      })
      .send(queryPost);  
      
      // assert.isNull(err);
      console.log("statuscode is ", res.statusCode);
      assert.isTrue(res.statusCode != 404);
      assert.isTrue(res.statusCode == 200);

  });
});

/*
 * Testing if the omission of certain required fields throws the proper errors
 * and response codes.
 * 
 * Third-party Libraries used: 
 * 
 *                1. supertest(), a library to test backend endpoints. Used to send a
 *                   post request to the respective endpoint.
 * 
 *                2. Chai's assertion library to do the assertions.
 */
describe("validity of input", () => {
  it("should have a response with status code 400 when any of the required fields are missing.", async () => {
    let fields = [
      {
        FirstName: "John",
        LastName: "Doe",
        Email: "johndoe@gmail.com"
      },

      {
        FirstName: "John",
        LastName: "Doe",
        Message: "Hello"
      },

      {
        LastName: "Doe",
        Email: "johndoe@gmail.com",
        Message: "Hello"
      },

      {
        FirstName: "John",
        Email: "johndoe@gmail.com",
        Message: "Hello"
      },

      {
        FirstName: "John",
        LastName: "Doe"
      },

      {
        LastName: "Doe",
        Email: "johndoe@gmail.com"
      },

      {
        Email: "johndoe@gmail.com",
        Message: "Hello"
      },

      {
        FirstName: "John",
        Email: "johndoe@gmail.com"
      },

      {
        FirstName: "John",
        Message: "Hello"
      },

      {
        LastName: "Doe",
        Message: "Hello"
      },

      {
        FirstName: "John"
      },

      {
        LastName: "Doe"
      },

      {
        Email: "johndoe@gmail.com"
      },

      {
        Message: "Hello"
      },
    ];

    for (var i = 0; i < fields.length; i++) {
      var res = await request(app)
        .post("/contact_us/")
        .query({
          API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
        })
        .send(fields[i])

        // assert.isNull(err);
        assert(res.statusCode == 400);
    }
  });
});
