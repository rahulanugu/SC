const mysql = require('mysql');
/**
 * The contoller is used to serve the needs of the careers portal of the
 * web application.
 */
 var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'admin',
    password: process.env.DB_PASS,
    port: process.env.PORT,
    database: 'scriptchain'
  });
  
  module.exports = connection;