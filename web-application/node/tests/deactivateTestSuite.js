const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.expect;
chai.use(chaiHttp);

describe('/POST a query', () => {
  it('create a query', () => {
    let queryPost = {
      'fname': 'John',
      'lname': 'Doe',
      'email': 'johndoe@gmail.com',
      'message': 'Hello'
      }
      chai.request('http://localhost:8080')
          .post('/patient')
          .send(queryPost)
          .end((err, res) => {
          });
      });
    });
