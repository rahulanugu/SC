const mysql = require('mysql');
/**
 * The contoller is used to serve the needs of the careers portal of the
 * web application.
 */
 var connection = mysql.createPool({
    host: 'database-1.cgurbeaohou6.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Scriptchain20!',
    port: 3306,
    database: 'scriptchain',
    connectionLimit: 20
  });
  
  module.exports = connection;