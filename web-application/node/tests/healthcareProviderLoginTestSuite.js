const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require('supertest')

const app = require('../index');

chai.use(chaiHttp);

describe('/Authenticate the healthcare user login attempt', () => {
  it('Login into healthcareportal', () => {
    let createPost = {
      'emailAddress':'shahvidit39@gmail.com',
      'password':"$2a$10$AJRFiZGSv/DuphwOTjcnue3Y0Ztq4Kph4lOL335pbhucB1auxcQby"
      }
      request(app)
          .post('/backend/healthcare-login')
          .query({
            API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
          })
          .send(createPost)
          .end((err, res) => {
            console.log(res);
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
          let queryPost = {
            "jwtToken":"NXziw97D12Aglf0D"
            }
          request(app)
              .post('/backend/healthcare-login/verifytokenintegrity')
              .query({
                API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
              })
              .send(queryPost)
              .end((err, res) => {
                console.log(res.statusCode);
                assert.isNull(err);
                assert.isTrue(res.statusCode != 404);
                assert.isTrue(res.statusCode == 200);
              });
          });
        });
