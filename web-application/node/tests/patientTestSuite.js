const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.expect;
chai.use(chaiHttp);

describe('/To save a new request access user', () => {
  it('creates new user', () => {
    let queryPost = {
      "fname":"Sai","lname":"Sirigiri","Email":"miketyke699@gmail.com","address":"244 Manning Boulevard, Albany, NY, United States 12206","phone":"(516) 336-7927","birthday":"2020-03-04","sex":"male","ssn":"210-82-1098","allergies":"None","ec":"jbfjkn fnjfknn","ecPhone":"(290) 238-9028","ecRelationship":"iubfibiub","password":"$2a$10$k2kDfbaiqJFLVV9FQrbs5euEC1ybn8xfDe1.ecjUKZK0YTALIP7wq","anemia":false,"asthma":false,"arthritis":false,"cancer":false,"gout":false,"diabetes":false,"emotionalDisorder":false,"epilepsy":false,"fainting":false,"gallstones":false,"heartDisease":false,"heartAttack":false,"rheumaticFever":false,"highBP":false,"digestiveProblems":false,"ulcerative":false,"ulcerDisease":false,"hepatitis":false,"kidneyDiseases":false,"liverDisease":false,"sleepApnea":false,"papMachine":false,"thyroid":false,"tuberculosis":false,"venereal":false,"neurologicalDisorders":false,"bleedingDisorders":false,"lungDisease":false,"emphysema":false,"none":true,"drink":"noDrink","smoke":"noSmoke"}
      chai.request('http://localhost:8080')
          .post('/patient')
          .send(queryPost)
          .end((err, res) => {
          });
      });
    });

