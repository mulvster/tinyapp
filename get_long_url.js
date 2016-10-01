module.exports = function () {
  function getLongURL(db, shortURL, cb) {
    var query = { "shortURL": shortURL };      // don't need this function anymore.
    db.collection("urls").findOne(query, (err, result) => {
      if (err) {
        return cb(err);
      }
      return cb(null, result.longURL);
    });
  }

  return {
    getLongURL: getLongURL
  }
};