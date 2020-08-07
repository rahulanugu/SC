const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.expect;
chai.use(chaiHttp);

describe('/request reactivation of a patient account', () => {
  it('patient reactivation', () => {
    let queryPost = {
      'email': 'johndoe@gmail.com',
      }
      chai.request('http://localhost:8080')
          .post('/backend/reactivate/patient/request')
          .send(queryPost)
          .end((err, res) => {
          });
      });
    });
  describe('/request reactivation of a Healthcareprovider account', () => {
      it('Healthcare reactivation', () => {
        let queryPost = {
          'email': 'johndoe@gmail.com',
          }
          chai.request('http://localhost:8080')
              .post('/backend/reactivate/healthcare/request')
              .send(queryPost)
              .end((err, res) => {
              });
          });
        });
  describe('/move a patient object from DeactivatedPatient', () => {
    it('insert patient object', () => {
      let queryPost = {
        "token":"xeKw6fIjwH7nJPph"
      }
      chai.request('http://localhost:8080')
      .post('/backend/reactivate/patient/activate')
      .send(queryPost)
      .end((err, res) => {
      });
     });
    });
describe('/move a healthcare provider object from DeactivatedHealthcareProvider database to HealthcareProvider database', () => {
      it('Insert healthcare object', () => {
        let queryPost = {
          "token":"xeKw6fIjwH7nJPph"
        }
        chai.request('http://localhost:8080')
        .post('/backend/reactivate/healthcare/activate')
        .send(queryPost)
        .end((err, res) => {
        });
       });
      });


