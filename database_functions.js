const MongoClient = require("mongodb").MongoClient;

module.exports = function(MONGODB_URI) {  //closures.
  function connectAndThen(cb){
    MongoClient.connect(MONGODB_URI, (err, db) => {
      cb(err, db);
    });
  }

  return {
    connectAndThen: connectAndThen
  };
};

