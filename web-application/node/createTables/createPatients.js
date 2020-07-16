var express = require('express');
var router = express.Router();
const {BigQuery} = require('@google-cloud/bigquery');
const options = {
    keyFilename: '/Users/srikarpothumahanti/Desktop/scriptchain/web-application/node/serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};
const bigquery = new BigQuery(options);
createTable();
async function createTable() {

    const datasetId = "ScriptChain";
    const tableId = "patients";
    const schema = '_id:string, fname:string, lname:string, Email:string, address:string,phone:string,\
    birthday:string,sex:string,ssn:string,allergies:string,ec:string,ecPhone:string,ecRelationship:string,\
    password:string,anemia:boolean,asthma:boolean,arthritis:boolean,cancer:boolean,gout:boolean,diabetes:boolean,\
    emotionalDisorder:boolean,epilepsy:boolean,fainting:boolean,gallstones:boolean,heartDisease:boolean,\
    heartAttack:boolean,rheumaticFever:boolean,highBP:boolean,digestiveProblems:boolean,ulcerative:boolean,\
    ulcerDisease:boolean,hepatitis:boolean,kidneyDiseases:boolean,liverDisease:boolean,sleepApnea:boolean,\
    papMachine:boolean,thyroid:boolean,tuberculosis:boolean,venereal:boolean,neurologicalDisorders:boolean,\
    bleedingDisorders:boolean,lungDisease:boolean,emphysema:boolean,none:boolean,drink:string,smoke:string';

  const options = {
    schema: schema,
    location: 'US',
  };

  // Create a new table in the dataset
  const [table] = await bigquery
    .dataset(datasetId)
    .createTable(tableId, options);
  console.log(`Table ${table.id} created.`);
}