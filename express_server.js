// function generateRandomString() { //own module.
//    var text = "";
//  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//  for( var i=0; i < 6; i++ )
//    text += possible.charAt(Math.floor(Math.random() * possible.length));
//  return text;
// }
// function getLongURL(db, shortURL, cb) {
//   let query = { "shortURL": shortURL };      // don't need this function anymore.
//     db.collection("urls").findOne(query, (err, result) => {
//       if (err) {
//         return cb(err);
//       }
//       return cb(null, result.longURL);
//   });
// }
//
// app.get("/urls/:id/edit", (req, res) => {
//   let shortURL = req.params.id;
//     getLongURL(dbInstance, shortURL, (err, longURL) => {
//       console.log(longURL);
//   });
//
// app.get("/urls/new", (req, res) => {
//   console.log("GET /urls_new");
//     res.render("urls_new");
//   });
//     connectAndThen(function(err, db) {
//       if (err) {
//         console.log("With errors: "+err);
//       }
//     db.collection("urls").findOne({shortURL: req.params.id}, (err, url) => {
//     res.render("urls_show", {url: url});
//     })
//   });
// });
//
// app.put("/urls/:id/edit", (req, res) =>{
//   urlDatabase[req.params.id] = req.body.longURL;
//     console.log(urlDatabase);
//       res.redirect("/urls");
// });
//
// app.post("/urls", (req, res) => {
//   var newURL = {
//     shortURL: generateRandomString(),
//     longURL: req.body.longURL
//   }
// connectAndThen(function(err, db){
//   db.collection("urls").insert(newURL, (err, url) => {
//     if(err) res.status(500).json(err);
//     res.render("urls_create", {url: newURL.longURL});
//     })
//
//   })
// });
//
// app.delete("/urls/:key", (req, res) => {
//   connectAndThen(function(err, db){
//     console.log("Connected to db then tried to delete!");
//     console.log("With errors: "+err);
//   db.collection("urls").deleteOne({shortURL: req.params.key}, function (err) {
//     console.log(err);
//     })
//     console.log("HI");
//       res.redirect("/urls");
//   });
// });
//
// app.get("/urls/shortURL", (req, res) => {
//   console.log(Object.keys(urlDatabase));
//     var length = Object.keys(urlDatabase).length - 1;
//     var theShortenedURL = Object.keys(urlDatabase)[length];
//       res.render('urls_create', {shortURL: theShortenedURL});
//   db.collection("urls").remove({shortURL: req.params.key});
//           console.log("HI");
//             res.redirect("/urls");
//   });
//
// app.get("/u/:shortURL", (req, res) => {
//   connectAndThen((err,db) => {
//     db.collection('urls').findOne({shortURL: req.params.shortURL}, (err, url) => {
//       console.log('found url', url);
//       getLongURL(db, req.params.shortURL, (err, longURL) => {
//         let templateVars = {
//           'shortURL': req.params.shortURL,
//           'longURL': longURL
//         }
//         res.render('urls_create', templateVars);
//       })
//     })
//   })
// });
//
// app.get('/urls/:key', (req,res) => {
//   var shortURL = req.params.key;
//    connectAndThen((err,db) => {
//     db.collection('urls').findOne({shortURL: shortURL}, (err, url) => {
//       console.log('found url', url);
//       res.render('urls_show', {url: url});
//     })
//   })
// });
