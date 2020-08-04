const chai = require("chai");
const chaiHttp = require("chai-http");
// const mongoose = require('mongoose');
const expect = chai.expect;
// const should = chai.expect;
let should=chai.should();
chai.use(chaiHttp);

// The test case will create a job
describe('/POST Create a job', () => {
  it('Create job testing', () => {
    let jobPost = {
      'title': 'Project Intern',
      'description': 'Theyre in charge of determining what features the development team should build, working with UI and UX to figure out how to streamline the interface and overall user experience, and ensuring the product makes it to market.',
      'salary': 'unpaid',
      'location': 'remote',
      'email': 'anithanarnavaram7@gmail.com',
      'category': 'Design'
      }
      chai.request('http://localhost:8080')
          .post('/jobposting')
          .send(jobPost)
          .end((err, res) => {
          });
      });
  });

  // Test suite for  the job openings
// describe('test case for the job openings', () => {
//   it('Should have been jobopening page', (done) => {
//       chai.request('http://localhost:8080')
//       .get('/jobposting')
//       .end((err, res) => {
//           // if (err) {
//           //     done(err)
//           // }
//           // expect(res.status).to.equal(200);
//           res.body.should.have.property('title')
//           res.should.have.status(200)
//           done();
//       });
//   });
// });

describe('/POST Create jobcategory', () => {
  it('Create job category', () => {
    let jobPost = {
      'title': 'Project Intern',
      'description': 'Theyre in charge of determining what features the development team should build, working with UI and UX to figure out how to streamline the interface and overall user experience, and ensuring the product makes it to market.',
      }
      chai.request('http://localhost:8080')
          .post('/jobcategory')
          .send(jobPost)
          .end((err, res) => {
          });
      });
  });
// Test suite for posting jobapplication to the database
describe('/POST jobapplication', () => {
  it('Create jobapplication', () => {
    let jobApplication = {
      'jobId': 'SDE Intern',
      'firstName': 'John' ,
      'lastName': 'Doe' ,
      'address': '32 SW',
      'state': 'Massachusetts',
      'city': 'Boston',
      'zipcode': '02117',
      'email': 'johndoe@gmail.com',
      'contactNumber': '123456789',
      'resume': 'johnresume.pdf'
      }
      chai.request('http://localhost:8080')
      .post("/jobapplication")
      .send(jobApplication)
      .end((err, res) => {
          });
        });
    });
