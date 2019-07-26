/**
 * db.js
 * Backend server that connects to the remote database in MongoDB Atlas
 */

const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

// URI to connect to desired database
const uri = "mongodb+srv://niyonika:mongodb@cluster0-euygu.mongodb.net/scriptchain?retryWrites=true&w=majority";

//set up connection
mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
    if(!err)
        console.log("MongoDB connection succeeded");
    else
        console.log("Error in DB connection: " + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;