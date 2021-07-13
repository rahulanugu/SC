const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require('supertest');
const bcrypt = require('bcryptjs');

const app = require('../index');
const Utility = require("../utility");

chai.use(chaiHttp);


const hashpassword = "$2a$10$CbaAL1HGsCTi9X.6.labkuWqeqOo6bmtKSjWyUni2n1QCbJhbr6Dy";

describe('/Authenticate the healthcare user login attempt', () => {
  it('Login into healthcareportal', () => {
    let createPost = {
      'email':'testeremail@gmail.com',
      'password':"password123"
      }
      request(app)
          .post('/backend/healthcare-login')
          .query({
            API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
          })
          .send(createPost)
          .end((err, res) => {
            console.log(res.statusCode, res.message);
            assert.isNull(err);
            assert.isTrue(res.statusCode != 404);
            assert.isTrue(res.statusCode == 200);
          });
      });
    });

describe('/Checking if the user is authorized by verifying jwt token integrity', () => {
    it('verifies the JWT token', () => {
      // let queryPost = {
      //   "jwtToken":"xeKw6fIjwH7nJPph"
      //   }
      const testData = {
        'email':'testeremail@gmail.com',
        'password': hashpassword
      }
      const testToken = Utility.EncryptToken(testData);
      let queryPost = {
        "jwtToken": testToken
      }
      
      request(app)
        .post('/backend/healthcare-login/verifytokenintegrity')
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