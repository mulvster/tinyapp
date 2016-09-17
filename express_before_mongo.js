const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var methodOverride = require("method-override");
var PORT = process.env.PORT || 8080; // default port 8080

app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

function generateRandomString() {
   var text = "";
 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 for( var i=0; i < 6; i++ )
   text += possible.charAt(Math.floor(Math.random() * possible.length));
 return text;
}


app.get("/urls", (req, res) => {
  var templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});


app.get("/urls/new", (req, res) => {
  console.log("GET /urls_new");
  res.render("urls_new");

});

app.get("/urls/:key/edit", (req, res) => {
  var templateVars1 = {
    longURL: urlDatabase[req.params.key],
    key: req.params.key
  };
  res.render("urls_show", templateVars1);
});

app.put("/urls/:key/edit", (req, res) =>{
    urlDatabase[req.params.key] = req.body.longURL;
    console.log(urlDatabase);
    res.redirect("/urls");
});

app.post("/urls", (req, res) => {
  console.log("POST /urls", req.body)
  var theShortURL = generateRandomString();
  var userEnterURL = req.body.longURL;
  urlDatabase[theShortURL] = userEnterURL;
  console.log(urlDatabase);
 res.redirect('urls/shortURL');

});

app.delete("/urls/:key", (req, res) => {
   var deleteKey = req.params.key;
   delete urlDatabase[deleteKey];
   res.redirect("/urls");
});


app.get("/urls/shortURL", (req, res) => {
  console.log(Object.keys(urlDatabase));
  var length = Object.keys(urlDatabase).length - 1;
  var theShortenedURL = Object.keys(urlDatabase)[length];
  res.render('urls_create', {shortURL: theShortenedURL});
});

app.get("/u/:shortURL", (req, res) => {
  var longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});