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

/* DB helpers */ 

async function getAllRowsFromTable(table) {
  const query = 'SELECT * FROM ??';
  let response;
  connection.query(query, [table], (err, rows) => {
    if (err) {
      response = jsonResponse(500, "DB Error");
      console.log(err);
      return;
    }
    response = jsonResponse(200, "Users successfully retrieved", rows);
  });
  return response;
}

async function getRowFromTableWhere(table, where = {email: ''}) {
  let query = 'SELECT * FROM ?? WHERE ';
  const data = [table];
  for (let key in obj) {
    query += '??=?,';
    data.push(key);
    data.push(obj[key]);
  }
  query = query.slice(0, query.length - 1) + ')';

  let response;
  connection.query(query, data, (err, rows) => {
    if (err) {
      response = jsonResponse(500, "DB Error");
      console.log(err);
      return;
    }
    if (rows.length == 0) {
      response = jsonResponse(404, 'No rows exist mathcing this criteria.');
      return;
    }
    response = jsonResponse(200, "DB row successfully retrieved", rows[0]);
  });
  return response;
}

async function getRowByEmail(table, userEmail) {
  return getRowFromTableWhere(table, {'email': userEmail});
}

async function getRowByID(table, _id) {
  return getRowFromTableWhere(table, {'_id': _id});
}

async function checkForUserInDB(table, userEmail) {
  let found = true;
  getRowByEmail(table, userEmail).then(resp => {
    if (resp.statusCode === 200) found = false;
  });
  return found;
}

async function insertUserIntoDB(table, obj) {
  let query = 'INSERT INTO ?? (';
  let values = ' VALUES ('
  const data1 = [table];
  const data2 = [];
  for (let key in obj) {
    query += '??,';
    values += '?,';
    data1.push(key);
    data2.push(obj[key]);
  }
  
  let response;
  query = query.slice(0, query.length - 1) + ')' + values.slice(0, values.length - 1) + ')';
  const data = [...data1, ...data2];
  connection.query(query, data, (err, res) => {
    if (err) {
      response = jsonResponse(500, "DB Error");
      return;
    } 
    console.log(res);
    if (res.insertID === null) {
      response = jsonResponse(400, 'User already exists.');
      return;
    }
    response = jsonResponse(200, 'User successfully created.', res);
  });
  return response;
}

async function updateUserInfoInDB(table, user) {
  const data = [table];
  let query = "UPDATE ?? SET";
  for (const key in user) {
    if (key == '_id' || user[key] === null) continue;
    data.push(key);
    data.push(user[key]);
    query += '??=?';
  }
  query += ' WHERE _id=?';
  data.push(user._id);
  
  let response;
  connection.query(query, data, (err, res) => {
    if (err) {
      response = jsonResponse(500, "DB Error");
      return;
    } 
    console.log(res);
    if (res.insertID === null) {
      response = jsonResponse(400, "User already exists.");
      return;
    }
    response = jsonResponse(200, "User info successfully updated.");
  });
  return response;
}

async function deleteUserFromDB(table, userEmail) {
  const query = 'DELETE FROM ?? WHERE email=?';
  let response;
  connection.query(query, [table, userEmail], (err, rows) => {
    if (err) {
      console.log("An error has occured while trying to delete the patient entry from the patient database");
      response = jsonResponse(500, "DB error: unable to delete user");
    }
    response = jsonResponse(200, "User deleted successfully", rows[0]);
  });
  return response;
}


module.exports.connection = connection;
module.exports.getAllRowsFromTable = getAllRowsFromTable;
module.exports.getRowFromTableWhere = getRowFromTableWhere;
module.exports.getRowByEmail = getRowByEmail;
module.exports.getRowByID = getRowByID;
module.exports.checkForUserInDB = checkForUserInDB;
module.exports.insertUserIntoDB = insertUserIntoDB;
module.exports.updateUserInfoInDB = updateUserInfoInDB;
module.exports.deleteUserFromDB = deleteUserFromDB;