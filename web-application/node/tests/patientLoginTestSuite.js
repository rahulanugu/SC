const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.expect;
chai.use(chaiHttp);

describe('/validates the user/patient to log in to the portal', () => {
  it('check the users', () => {
    let queryPost = {
      "email":"m@gmail.com",
      "password":"crass"
      }
      chai.request('http://localhost:8080')
          .post('/patient-login')
          .send(queryPost)
          .end((err, res) => {
          });
      });
    });
