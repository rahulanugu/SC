const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require('supertest');
const { assert } = require("chai");
const app = require('../index');
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
          .post('/')
          .send(queryPost)
          .end((err, res) => {
          });
      });
  });

  describe('validity of input', () => {
    it('should have a response with status code 400 when any of the required fields are missing.', () => {
        let fields = [
          {
            "fname":"John",
            "lname":"Doe",
            "email":"johndoe@gmail.com",
          },
  
          {
            "fname":"John",
            "lname":"Doe",
            "message":"Hello"
          },
  
          {
            "lname":"Doe",
            "email":"johndoe@gmail.com",
            "message":"Hello"
          },
  
          {
            "fname":"John",
            "email":"johndoe@gmail.com",
            "message":"Hello"
          },
  
          {
            "fname":"John",
            "lname":"Doe",
          },
  
          {
            "lname":"Doe",
            "email":"johndoe@gmail.com",
          },
  
          {
            "email":"johndoe@gmail.com",
            "message":"Hello"
          },
  
          {
            "fname":"John",
            "email":"johndoe@gmail.com",
          },
  
          {
            "fname":"John",
            "message":"Hello"
          },
  
          {
            "lname":"Doe",
            "message":"Hello"
          },
  
          {
            "fname":"John"
          },
  
          {
            "lname":"Doe"
          },
  
          {
            "email":"johndoe@gmail.com"
          },
  
          {
            "message":"Hello"
          }
  
        ];
  
        for (var i = 0; i < fields.length; i++) {
          request(app)
              .post('/contact_us')
              .send(fields[i])
              .end((err, res) => {
                assert(res.statusCode == 400);
              });
        }
      
    });
  })
