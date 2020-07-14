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
    const tableId = "resumesFiles";
    const schema = 'id:string, length:integer, chunkSize:integer, uploadDate:string, filename:string,md5:string,contentType:string';

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
