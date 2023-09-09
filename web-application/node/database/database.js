const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

var sshconnect = {
  host: "ec2-3-17-141-51.us-east-2.compute.amazonaws.com",
  user: "ec2-user",
  privateKey: fs.readFileSync("./ec2key.pem"),
};

var dbconnect = {
  host: "database-1.cgurbeaohou6.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "Scriptchain21!",
  database: "scriptchain",
};

module.exports = { sshconnect , dbconnect}
//
