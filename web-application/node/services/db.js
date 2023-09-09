const mysql = require("mysql-ssh2");
const dbConfig = require('../db-config');
const fs = require("fs");
async function getConnection() {
    const connection = await mysql.connect(dbConfig.sshconnect, dbConfig.dbconnect);
    return connection;
}

module.exports = getConnection;


