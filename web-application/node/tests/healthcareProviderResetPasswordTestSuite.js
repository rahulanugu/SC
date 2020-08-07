const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.expect;
chai.use(chaiHttp);

describe('/It is used for generating a JWT token to initiate a password reset request for healthcareProvider portal', () => {
  it('JWT password reset', () => {
    let createPost = {
      'email':'anithanarnavaram7@gmail.com'
      }
      chai.request('http://localhost:8080')
          .post('/backend/healthcare/reset_password')
          .send(createPost)
          .end((err, res) => {
          });
      });
    });

  describe('/Verify the jwt token and return the if valid or not', () => {
      it('verifies the JWT token', () => {
        let queryPost = {
          "token":"xeKw6fIjwH7nJPph"
          }
          chai.request('http://localhost:8080')
              .post('/backend/healthcare/reset_password/check')
              .send(queryPost)
              .end((err, res) => {
              });
          });
        });
  describe('/change password for healthcareprovider', () => {
      it('It is used for the changing password', () => {
        let queryPost = {
          "token":"xeKw6fIjwH7nJPph",
          "password":"$2a$10$k2kDfbaiqJFLVV9FQrbs5euEC1ybn8xfDe1"
          }
          chai.request('http://localhost:8080')
              .post('/backend/healthcare/reset_password/change_password')
              .send(queryPost)
              .end((err, res) => {
              });
          });
        });

