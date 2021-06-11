const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
const app = require("..");
const expect = chai.expect;
const should = chai.expect;
chai.use(chaiHttp);

describe('/To save a new request access user', () => {
  it('creates new user', () => {
    let queryPost = {
      "fname":"teest",
      "lname":"Vedulla",
      "email":"rohin@gmail.com",
      "typeOfUser":"Potential_Patient"
      }
      chai.request('http://localhost:8080')
          .post('/request_access')
          .send(queryPost)
          .end((err, res) => {
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
            .send(fields[i])
            .end((err, res) => {
              assert(res.statusCode == 400);
            });
      }
    });
  });
  

