const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.expect;
chai.use(chaiHttp);

describe('/the creation of a new healthcareprovider user', () => {
  it('create a healthcare user', () => {
    let createPost = {
      "firstName":"Anitha",
      "lastName":"Nav",
      "companyName":"ScriptChainLLC",
      "roleInCompany":"Intern",
      "email":"anithanarnavaram7@gmail.com","password":"$2a$10$AJRFiZGSv/DuphwOTjcnue3Y0Ztq4Kph4lOL335pbhucB1auxcQby",
      "phone":"(352) 745-4724"
      }
      chai.request('http://localhost:8080')
          .post('/backend/healthcare/account/create')
          .send(createPost)
          .end((err, res) => {
          });
      });
    });

  describe('/Create a new healthcare provider in the db', () => {
      it('verifies the healthcare', () => {
        let queryPost = {
          "jwtToken":"xeKw6fIjwH7nJPph"
          }
          chai.request('http://localhost:8080')
              .post('/backend/healthcare/account/verify')
              .send(queryPost)
              .end((err, res) => {
              });
          });
        });
