//this is where we set up the app
require('dotenv').config();
const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const databaseFunctions = require("./database_functions")(process.env.MONGODB_URI);
const moduleRandomString = require("./generate_random_string")();
const originalURL = require("./get_long_url")();

//extract database stuff
const connectAndThen = databaseFunctions.connectAndThen;
const generateRandomString = moduleRandomString.generateRandomString;
const getLongURL = originalURL.getLongURL

const app = express();
app.set("port", process.env.PORT || 8080);
app.set("view engine", "ejs");

//configuring middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.redirect("/urls/new");
});


//where the routes start.
app.get("/urls", (req, res) => {
  connectAndThen((err, db) => {
    db.collection("urls").find().toArray((err, urls) => {
      res.render("urls_index", {
        urls: urls
      });
    });
  });
});

app.get("/urls/:id/edit", (req, res) => {
  let shortURL = req.params.id;
  connectAndThen((err, db) => {
    getLongURL(db, shortURL, (err, longURL) => {
      console.log(longURL);
      res.redirect("/urls/new");
    });
  });
});

app.get("/urls/new", (req, res) => {
  console.log("GET /urls_new");
  res.render("urls_new");
});


app.post("/urls", (req, res) => {
  var newURL = {
    shortURL: generateRandomString(),
    longURL: req.body.longURL
  }
  console.log(newURL);
  connectAndThen(function (err, db) {
    db.collection("urls").insert(newURL, (err, url) => {
      if (err) res.status(500).json(err);
      res.render("urls_create", {url: newURL.longURL});
    })

  })
});

app.delete("/urls/:key", (req, res) => {
  connectAndThen(function (err, db) {
    console.log("Connected to db then tried to delete!");
    console.log("With errors: " + err);
    db.collection("urls").deleteOne({shortURL: req.params.key}, function (err) {
      console.log(err);
    })
    console.log("HI");
    res.redirect("/urls");
  });
});

app.get("/urls/shortURL", (req, res) => {
  console.log(Object.keys(urlDatabase));
  var length = Object.keys(urlDatabase).length - 1;
  var theShortenedURL = Object.keys(urlDatabase)[length];
  res.render('urls_create', {shortURL: theShortenedURL});
  db.collection("urls").remove({shortURL: req.params.key});
  res.redirect("/urls");
});

app.get("/u/:shortURL", (req, res) => {
  connectAndThen((err, db) => {
    db.collection('urls').findOne({shortURL: req.params.shortURL}, (err, url) => {
      console.log('found url', url);
      res.redirect(url.longURL);
    })
  })
});

app.get('/urls/:key', (req, res) => {
  var shortURL = req.params.key;
  connectAndThen((err, db) => {
    db.collection('urls').findOne({shortURL: shortURL}, (err, url) => {
      console.log('found url', url);
      res.render('urls_show', {url: url});
    })
  })
});

app.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${app.get("port")}!`);
});
