const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const request = require("supertest");
const { assert } = require("chai");
// const mongoose = require('mongoose');
const expect = chai.expect;
// const should = chai.expect;
let should = chai.should();
chai.use(chaiHttp);
const APIKey = "?API_KEY=TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==";
const execSync = require('child_process').execSync;
var net = require('net');
const sec_utils = require('../utils/security_utils');
/*
var portInUse = function(port, callback) {
  var server = net.createServer(function(socket) {
  socket.write('Echo server\r\n');
  socket.pipe(socket);
  });

  server.on('error', function (e) {
  callback(true);
  });
  server.on('listening', function (e) {
  server.close();
  callback(false);
  });

  server.listen(port, '127.0.0.1');
};
*/

// The test case will create a job
describe("/POST Create a job", () => {
  it("Create job testing", async () => {
    const password = "password123"
    const hashpassword = await sec_utils.encryptPassword(password);
    console.log("PASSWORD", hashpassword);
    let jobPost = {
      title: "Project Intern",
      description:
        "Theyre in charge of determining what features the development team should build, working with UI and UX to figure out how to streamline the interface and overall user experience, and ensuring the product makes it to market.",
      salary: "unpaid",
      location: "remote",
      email: "anithanarnavaram7@gmail.com",
      category: "Design",
      link: "link",
    };
    // chai
    //   .request(app)
    //   .post("/careers/jobposting")
    //   .query({
    //     API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
    //   })
    //   .send(jobPost)
    //   .end((err, res) => {
    //     console.log("status code is ", res.statusCode);
    //     assert.isNull(err);
    //     assert.isTrue(res.status != 404);
    //     assert.isTrue(res.status == 200);
    //   });

    // execSync('kill $(lsof -t -i:3000)', { encoding: 'utf-8' });
    request(app)
      .post('/careers/jobposting')
      .query({
        API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
      })
      .send(jobPost)
      .end((err, res) => {
        assert.isNull(err);
        console.log("status code is ", res.statusCode);
        assert.isTrue(res.status != 404);
        assert.isTrue(res.status == 200);
      });
    
  });
});

describe("get all job openings", () => {
  it("should return all job openings without an error", async () => {
    // portInUse(3000, value => console.log("val is ", value));
    request(app)
      .get("/careers/jobposting")
      .query({
        API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.isTrue(res.status != 404);
        assert.isTrue(res.status == 200);
      });
  });
});

//   // describe('get all job openings', () => {
//   //   it('should return all job openings without an error', () => {
//   //     let jobPost = {
//   //       'title': 'Project Intern',
//   //       'description': 'Theyre in charge of determining what features the development team should build, working with UI and UX to figure out how to streamline the interface and overall user experience, and ensuring the product makes it to market.',
//   //       'salary': 'unpaid',
//   //       'location': 'remote',
//   //       'email': 'anithanarnavaram7@gmail.com',
//   //       'category': 'Design'
//   //     }
//   //     request(app).post('/jobposting').end((err, res) => {
//   //       assert.isNull(err);
//   //       assert.isTrue(res.status != 404);
//   //       assert.isTrue(res.status == 200);
//   //     });
//   //   });
//   // });

//   describe('get all job categories', () => {
//     it('should return all job categories without an error', () => {
//       request(app)
//       .get('careers/jobcategory')
//       .query({
//         API_KEY: 'TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA=='
//       })
//       .end((err, res) => {
//         assert.isNull(err);
//         assert(res.statusCode == 200);
//       });
//     });
//   });

//   // Test suite for  the job openings
// // describe('test case for the job openings', () => {
// //   it('Should have been jobopening page', (done) => {
// //       chai.request('http://localhost:8080')
// //       .get('/jobposting')
// //       .end((err, res) => {
// //           // if (err) {
// //           //     done(err)
// //           // }
// //           // expect(res.status).to.equal(200);
// //           res.body.should.have.property('title')
// //           res.should.have.status(200)
// //           done();
// //       });
// //   });
// // });

// describe('/POST Create jobcategory', () => {
//   it('Create job category', () => {
//     let jobPost = {
//       'title': 'Project Intern',
//       'description': 'Theyre in charge of determining what features the development team should build, working with UI and UX to figure out how to streamline the interface and overall user experience, and ensuring the product makes it to market.',
//       }
//       chai.request(app)
//           .post('careers/jobcategory')
//           .query({
//             API_KEY: 'TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA=='
//           })
//           .send(jobPost)
//           .end((err, res) => {
//           });
//       });
//   });
// // Test suite for posting jobapplication to the database
// describe('/POST jobapplication', () => {
//   it('Create jobapplication', () => {
//     let jobApplication = {
//       'jobId': 'SDE Intern',
//       'firstName': 'John' ,
//       'lastName': 'Doe' ,
//       'address': '32 SW',
//       'state': 'Massachusetts',
//       'city': 'Boston',
//       'zipcode': '02117',
//       'email': 'johndoe@gmail.com',
//       'contactNumber': '123456789',
//       'resume': 'johnresume.pdf'
//       }
//       chai.request(app)
//       .post("careers/jobapplication")
//       .send(jobApplication)
//       .end((err, res) => {
//           });
//         });
//     });
// // test case for the job openings by category
// // describe('test case for the job openings by category', () => {
// //   it('Should have been particular job category page ', (done) => {
// //       chai.request('http://localhost:8080')
// //       .get('/jobposting/:jobcategory')
// //       .end((err, res) => {
// //           if (err) {
// //               done(err)
// //           }
// //           expect(res).to.have.status(200);
// //           done()
// //       })
// //   })
// // })

// // //Test suite for the careers controller to get category function
// // describe('test case for the jobcategory', () => {
// //   it('Should have been categorypage', (done) => {
// //       chai.request('http://localhost:8080')
// //       .get('/jobcategory')
// //       .end((err, res) => {
// //           if (err) {
// //               done(err)
// //           }
// //           expect(res).to.have.status(200);
// //           done()
// //       })
// //   })
// // })

// // // Test suite to retrieve the job by id
// // describe('test case to retrieve the job by id', () => {
// //   it('Should have been particular job category page ', (done) => {
// //       chai.request('http://localhost:8080')
// //       .get('/jobposting/job/:jobid')
// //       .end((err, res) => {
// //           if (err) {
// //               done(err)
// //           }
// //           expect(res).to.have.status(200);
// //           done()
// //       })
// //   })
// // })

// // // Test suite to retrieve a specific resume of application
// // describe('to retrieve a specific resume of application', () => {
// //   it('Should have been resume of particular job applicant', (done) => {
// //       chai.request('http://localhost:8080')
// //       .get("/jobapplication/:filename")
// //       .end((err, res) => {
// //           if (err) {
// //               done(err)
// //           }
// //           expect(res).to.have.status(200);
// //           done()
// //       })
// //   })
// // })

// // // Test case for the list of all the resumes
// // describe('to retrieve the list of resumes', () => {
// //   it('Should have all the resumes', (done) => {
// //       chai.request('http://localhost:8080')
// //       .get("/files")
// //       .end((err, res) => {
// //           if (err) {
// //               done(err)
// //           }
// //           expect(res).to.have.status(200);
// //           done()
// //       })
// //   })
// // })
