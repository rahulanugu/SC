const mysql = require('mysql');
/**
 * Interface for MySQL DB functionality.
 * Includes a connection variable, as well as methods for getting, adding, 
 * updating, and deleting data in the db.
 */

/* DB connection instance */

 var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'admin',
    password: process.env.DB_PASS,
    port: process.env.PORT,
    database: 'scriptchain'
  });

/* General helpers */

// JSON response generator to pass DB responses up to controllers
function jsonResponse(code, message, body={}) {
  return {'statusCode': code, 'message': message, 'body': body}
}

// Synchronous SQL query wrapper; extracts the result of an SQL query from its callback function into a JS Promise
function queryDB(query, data) {
  return new Promise((resolve, reject) => {
    connection.query(query, data, (err, data) => {
      if (err) return reject(jsonResponse(500, 'DB Error'));
      resolve(jsonResponse(200, 'Success', data));
    });
  });
}

/**
 * DB helpers 
 * Each helper returns a JavaScript Promise. The promise can be consumed asynchronously from the controllers.
 * Response (jsonResponse) objects passed up to controller to be used in API response; { statusCode, message, body }
 * The data from a successful SQL query (statusCode = 200) is located in the response body
 */ 

async function getAllRowsFromTable(table) {
  const query = 'SELECT * FROM ??';
  const data = [table];
  const response = await queryDB(query, data);
  return response;
}

async function getRowFromTableWhere(table, where = {email: ''}) {
  const query = 'SELECT * FROM ?? WHERE ??=?';
  const data = [table];
  for (const key in where) {
    data.push(key);
    data.push(where[key]);
    break;
  }

  const response = await queryDB(query, data);
  return response;
}

async function getRowByEmail(table, userEmail) {
  return getRowFromTableWhere(table, {'email': userEmail});
}

async function getRowByID(table, _id) {
  return getRowFromTableWhere(table, {'_id': _id});
}

async function checkForUserInDB(table, userEmail) {
  const response = await getRowByEmail(table, userEmail);
  return response.statusCode === 200;
}

async function deleteUserFromDB(table, userEmail) {
  const query = 'DELETE FROM ?? WHERE email=?';
  const data = [table, userEmail];
  const response = await queryDB(query, data);
  return response;
}

async function insertUserIntoDB(table, user) {
  let query = 'INSERT INTO ?? (';
  let values = ' VALUES ('
  const data1 = [];
  const data2 = [];
  for (const key in user) {
    query += '??,';
    values += '?,';
    data1.push(key);
    data2.push(user[key]);
  }
  if (data1.length == 0) return jsonResponse(400, 'User object must not be empty.');
  
  query = query.slice(0, query.length - 1) + ')' + values.slice(0, values.length - 1) + ')';
  const data = [table, ...data1, ...data2];
  const response = await queryDB(query, data);
  return response;
}

async function updateUserInfoInDB(table, user) {
  const data = [table];
  let query = 'UPDATE ?? SET ';
  for (const key in user) {
    if (key == '_id' || user[key] === null) continue;
    data.push(key);
    data.push(user[key]);
    query += '??=?, ';
  }
  if (data.length <= 1) return jsonResponse(400, 'User object must not be empty.');

  query = query.slice(0, query.length - 2) + ' WHERE _id=?';
  data.push(user._id);
  
  const response = await queryDB(query, data);
  return response;
}


module.exports.connection = connection;
module.exports.getAllRowsFromTable = getAllRowsFromTable;
module.exports.getRowFromTableWhere = getRowFromTableWhere;
module.exports.getRowByEmail = getRowByEmail;
module.exports.getRowByID = getRowByID;
module.exports.checkForUserInDB = checkForUserInDB;
module.exports.deleteUserFromDB = deleteUserFromDB;
module.exports.insertUserIntoDB = insertUserIntoDB;
module.exports.updateUserInfoInDB = updateUserInfoInDB;