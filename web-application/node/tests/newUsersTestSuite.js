const chai = require("chai");
const chaiHttp = require("chai-http");
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
    });

