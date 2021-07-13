const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
const expect = chai.expect;
chai.use(chaiHttp);

const app = require("../index");
/*
describe("/To save a new request access user", () => {
  it("creates new user", () => {
    let queryPost = {
      fname: "Sai",
      lname: "Sirigiri",
      email: "miketyke699@gmail.com",
      address: "244 Manning Boulevard, Albany, NY, United States 12206",
      city: 'New York City',
      state: 'New York',
      zip: '12206',
      country: 'USA',
      street: 'France St.',
      phone: "(516) 336-7927",
      birthday: "2020-03-04",
      sex: "male",
      ssn: "210-82-1098",
      allergies: "None",
      ec: "jbfjkn fnjfknn",
      ecPhone: "(290) 238-9028",
      ecRelationship: "iubfibiub",
      password: "$2a$10$k2kDfbaiqJFLVV9FQrbs5euEC1ybn8xfDe1.ecjUKZK0YTALIP7wq",
      anemia: false,
      asthma: false,
      arthritis: false,
      cancer: false,
      gout: false,
      diabetes: false,
      emotionalDisorder: false,
      epilepsy: false,
      fainting: false,
      gallstones: false,
      heartDisease: false,
      heartAttack: false,
      rheumaticFever: false,
      highBP: false,
      digestiveProblems: false,
      ulcerative: false,
      ulcerDisease: false,
      hepatitis: false,
      kidneyDiseases: false,
      liverDisease: false,
      sleepApnea: false,
      papMachine: false,
      thyroid: false,
      tuberculosis: false,
      venereal: false,
      neurologicalDisorders: false,
      bleedingDisorders: false,
      lungDisease: false,
      emphysema: false,
      none: true,
      drink: "noDrink",
      smoke: "noSmoke"
    };
    request(app)
      .post("/patient")
      .query({
        API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
      })
      .send(queryPost)
      .end((err, res) => {
        console.log('res.statusCode: ', res.statusCode);
        assert.isNull(err);
        assert.isTrue(res.statusCode != 404);
        assert.isTrue(res.statusCode == 200);
      });
  });
});
*/

describe("/To create a new patient", () => {
  it("creates new patient user", () => {
    let queryPost = {
      'fname': "John",
      'lname': "Sirigiri",
      'email': "miketyke69950@gmail.com",
      'password': 'password123',
      'photo': './assets/IMG_0005',
      'agreement-signed': true,
      'user-verified': false
    };
    request(app)
      .post("/patientnew")
      .query({
        API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
      })
      .send(queryPost)
      .end((err, res) => {
        console.log('res: ', res.body);
        assert.isNull(err);
        assert.isTrue(res.statusCode != 404);
        assert.isTrue(res.statusCode == 200);
      });
  });
});

describe("/To get patient data", () => {
  it("should give no error while retrieving patient data", () => {
    request(app)
      .get("/patient")
      .query({
        API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.isTrue(res.statusCode != 404);
        assert.isTrue(res.statusCode == 200);
      });
  });
});

describe("/To get patient data with ID", () => {
  it("should give no error while retrieving patient data", () => {
    request(app)
      .get("/patient/100")
      .query({
        API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
      })
      .end((err, res) => {
        assert.isNull(err);
      });
  });

  // it('should give an error when an invalid ID is passed', () => {
  //   request(app)
  //       .get('/patient/amdmdmdm')
  //       .end((err, res) => {
  //         assert.isNotNull(err);
  //       });
  // });
});

describe("/Check if subscriber exists in db", () => {
  it("should not allow bad requests", () => {
    let queryPost = {
      user: "abc@gmail.com",
    };

    request(app)
      .post("/patient/this_is_verify")
      .query({
        API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
      })
      .send(queryPost)
      .end((err, res) => {
        assert.isNull(err);
        assert.isTrue(res.statusCode != 404);
        assert.isTrue(res.statusCode == 400);
      });
  });
    
  it("should allow valid requests", () => {
    let queryPost = {
      user: "abc@gmail.com",
    };
    
    request(app)
    .post("/patient/verify")
    .query({
      API_KEY: "TiKY7Md2dHpcZo1ih4KbkinTHh7CNTSjseg2ZB3ZiaEC2x1bFA==",
    })
    .send(queryPost)
    .end((err, res) => {
      assert.isNull(err);
      assert.isTrue(res.statusCode != 404);
      assert.isTrue(res.statusCode == 200);
    });
  });
});
