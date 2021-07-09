const mysql = require('mysql');
/**
 * Interface for MySQL DB functionality.
 * Includes a connection variable, as well as methods for getting, adding, 
 * and updating data in the db.
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

function jsonResponse(code, message, body={}) {
  return {'statusCode': code, 'message': message, 'body': body}
}

/* DB helpers */ 

async function insertUserIntoDB(table, obj) {
  let query = `INSERT INTO ${table} (`;
  let values = ' VALUES ('
  const data = [];
  for (let key in obj) {
    query += `${key},`;
    values += '?,';
    data.push(obj[key]);
  }

  let response;
  query = query.slice(0, query.length - 1) + ')' + values.slice(0, values.length - 1) + ')';
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

async function getUserFromDB(table, userEmail) {
  const query = `SELECT * FROM ${table} WHERE email=?`;
  let response;
  connection.query(query, [userEmail], (err, rows) => {
    if (err) {
      response = jsonResponse(500, "DB Error");
      console.log(err);
      return;
    }
    if (rows.length == 0) {
      response = jsonResponse(400, 'User does not exist.');
      return;
    }
    response = jsonResponse(200, "User successfully retrieved", rows[0]);
  });
  return response;
}

async function checkForUserInDB(table, userEmail) {
  let found = true;
  getUserFromDB(table, userEmail).then(resp => {
    if (resp.statusCode === 200) found = false;
  });
  return found;
}

async function updateUserInfoInDB(table, user) {
  const data = [];
  const query = `UPDATE ${table} SET`;
  for (const key in user) {
    if (key == '_id' || user[key] === null) continue;
    data.push(user[key]);
    query += ` '${key}'=?`;
  }
  query += ` WHERE '_id'=?`;
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

module.exports.connection = connection;
module.exports.checkForUserInDB = checkForUserInDB;
module.exports.getUserFromDB = getUserFromDB;
module.exports.insertUserIntoDB = insertUserIntoDB;
module.exports.updateupdateUserInfoInDB = updateUserInfoInDB;