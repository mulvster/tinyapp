"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:127017/url_shortner";

console.log(`Connecting to MongoDB running at: ${MONDODB_URI}`);

MongoClient.connect(MONGODB_URI, (err,db) => {

  if (err) {
    console.log('Connected to the database!');
    let collection = db.collection("urls");

    console.log('Retreiving documents for the "test" collection...');
    collection.find().toArray((err, results) => {
      console.log('results: ', results);

      console.log('Disconnecting from Mongo!');
      db.close();
    });
  }
});