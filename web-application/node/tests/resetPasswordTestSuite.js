const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.expect;
chai.use(chaiHttp);

describe('Verify the jwt token and return the if valid or not', () => {
  it('verifies the token for patient', () => {
    let queryPost = {
      "email":"m@gmail.com"
      }
      chai.request('http://localhost:8080')
          .post('/reset_password/check')
          .send(queryPost)
          .end((err, res) => {
          });
      });
    });
describe('/Generate a JWT token for user/patient object and save it in db', () => {
      it('reset password for patient', () => {
        let queryPost = {
          "email":"m@gmail.com"
          }
          chai.request('http://localhost:8080')
              .post('/reset_password')
              .send(queryPost)
              .end((err, res) => {
              });
          });
        });
describe('change password for patient', () => {
          it('password change', () => {
            let queryPost = {
              "token":"rXHqKySTNjtZrXcb"
              }
              chai.request('http://localhost:8080')
                  .post('/reset_password/change_password')
                  .send(queryPost)
                  .end((err, res) => {
                  });
              });
            });
