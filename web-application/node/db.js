/**
 * db.js
 * Backend server that connects to the remote database in MongoDB Atlas
 */

const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

// URI to connect to remote MongoDB database through scriptchain user
const uri = "mongodb+srv://scriptchain:hello925@cluster0-se5v0.gcp.mongodb.net/scriptchain?retryWrites=true&w=majority";

// set up connection
mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
    if(!err)
        console.log("MongoDB connection succeeded");
    else
        console.log("Error in DB connection: " + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;