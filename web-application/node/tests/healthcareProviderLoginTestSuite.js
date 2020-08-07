const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.expect;
chai.use(chaiHttp);

describe('/Authenticate the healthcare user login attempt', () => {
  it('Login into healthcareportal', () => {
    let createPost = {
      'emailAddress':'anithanarnavaram7@gmail.com',
      'password':"$2a$10$AJRFiZGSv/DuphwOTjcnue3Y0Ztq4Kph4lOL335pbhucB1auxcQby"
      }
      chai.request('http://localhost:8080')
          .post('/backend/healthcare-login')
          .send(createPost)
          .end((err, res) => {
          });
      });
    });

  describe('/Checking if the user is authorized by verifying jwt token integrity', () => {
      it('verifies the JWT token', () => {
        let queryPost = {
          "jwtToken":"xeKw6fIjwH7nJPph"
          }
          chai.request('http://localhost:8080')
              .post('/backend/healthcare-loginverifytokenintegrity')
              .send(queryPost)
              .end((err, res) => {
              });
          });
        });
