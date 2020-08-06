const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.expect;
chai.use(chaiHttp);

describe('/POST a query', () => {
  it('create a query', () => {
    let queryPost = {
      'email': 'johndoe@gmail.com',
      }
      chai.request('http://localhost:8080')
          .post('/backend/deactivate/patient')
          .send(queryPost)
          .end((err, res) => {
          });
      });
    });
  describe('/POST a query', () => {
      it('create a query', () => {
        let queryPost = {
          'email': 'johndoe@gmail.com',
          }
          chai.request('http://localhost:8080')
              .post('/backend/deactivate/healthcare')
              .send(queryPost)
              .end((err, res) => {
              });
          });
        });
