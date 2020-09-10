var express = require('express');
var router = express.Router();
const {BigQuery} = require('@google-cloud/bigquery');
const options = {
    keyFilename: '/Users/srikarpothumahanti/Desktop/scriptchain/web-application/node/serviceAccountKeys/scriptchain-259015-689b82dcb0fe.json',
    projectId: 'scriptchain-259015'

};
const bigquery = new BigQuery(options);
createTable();
async function createTable() {

    const datasetId = "dataset1";
    const tableId = "newUsers";
    const schema = '_id:string,fname:string,lname:string,email:string,typeOfUser:string';


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