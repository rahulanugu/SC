/**
 * db.js
 * Backend server that connects to the remote database in MongoDB Atlas
 */
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');
const uri = "mongodb+srv://niyonika:mongodb@cluster0-euygu.mongodb.net/scriptchain?retryWrites=true&w=majority";

//set up connection
mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
    if(!err)
        console.log("MongoDB connection succeeded");
    else
        console.log("Error in DB connection: " + JSON.stringify(err, undefined, 2));
});
// // get connection
// var db = mongoose.connection;
// //bind connection to error event 
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*mongoose.connection.on('connected', () => {
  console.log('connected to db' +config.database);
})*/

// const uri = "mongodb+srv://niyonika:<mongodb>@cluster0-euygu.mongodb.net/";
// const options = [(
//     { useNewUrlParser: true },
//     { dbName: 'scriptchain'}
// )];


// connect to mongodb
// mongoose.connect(uri, options, (err) => {
//     if(!err)
//         console.log("MongoDB connection succeeded");
//     else
//         console.log("Error in DB connection: " + JSON.stringify(err, undefined, 2));
// });

// Driver from MongoDB Atlas
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => { 
//     // check err, then use client
//     if(!err)
//         console.log("MongoDB connection succeeded");
//         //mongo.dbUsers = client.collection("my_users");
//     else
//         console.log("Error in DB connection: " + JSON.stringify(err, undefined, 2)); 

// })

// 
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     const collection = client.db("scriptchain").collection("my_users");
//     // perform actions on the collection object
//     client.close();
//   });



module.exports = mongoose;