const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../index');
const request = require('supertest');
chai.use(chaiHttp);

describe('/verfies the jwttoken', () => {
  it('check the tokens', () => {
    let queryPost = {
      "jwtToken":"rXHqKySTNjtZrXcb"
      }
      request(app)
          .post('/verified')
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
