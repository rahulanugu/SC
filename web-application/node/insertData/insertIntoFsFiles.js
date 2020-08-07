var express = require('express');
var router = express.Router();
const {BigQuery} = require('@google-cloud/bigquery');
const options = {
    keyFilename: '/Users/srikarpothumahanti/Desktop/scriptchain/web-application/node/serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};
const bigquery = new BigQuery(options);
loadLocalFile();
async function loadLocalFile() {
  // Imports a local file into a table.

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
   const filename = '/Users/srikarpothumahanti/Desktop/scriptchain/web-application/node/MongoJsonNLFiles/fs.files.json';
   const datasetId = 'ScriptChain';
   const tableId = 'fsFiles';

  // Load data from a local file into the table
  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId)
    .load(filename);

  console.log(`Job ${job.id} completed.`);

  // Check the job's status for errors
  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    throw errors;
  }
}