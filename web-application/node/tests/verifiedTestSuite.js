const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.expect;
chai.use(chaiHttp);

describe('/verfies the jwttoken', () => {
  it('check the tokens', () => {
    let queryPost = {
      "jwtToken":"rXHqKySTNjtZrXcb"
      }
      chai.request('http://localhost:8080')
          .post('/verified')
          .send(queryPost)
          .end((err, res) => {
          });
      });
    });
