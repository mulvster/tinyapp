const express = require("express");
const app = express();
const methodOverride = require("method-override");
const PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/url_shortener";

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

var urlDatabase = {
<<<<<<< HEAD
  "AAAAAA": "http://www.cats.ca",
  "BBBBBB": "http://www.dogs.com"
=======
  "AAAAAA": "http://poof.com",
  "BBBBBB": "http://www.farmer.com"
>>>>>>> feature/mongodb
};

// [
//   { "_id" : ObjectId("57dc88ae2981fae5f640b85f"), "shortURL" : "b2xVn2", "longURL" : "http://www.lighthouselabs.ca" }
//   { "_id" : ObjectId("57dc88ae2981fae5f640b860"), "shortURL" : "9sm5xK", "longURL" : "http://www.google.com" }
// ]

console.log(`Connecting to MongoDB running at: ${MONGODB_URI}`);

<<<<<<< HEAD
// var dbInstance;

// MongoClient.connect(MONGODB_URI, (err, db) => {
//     if (err) {
//     console.log('Could not connect! Unexpected error. Details below.');
//     throw err;
//   }
//   dbInstance = db;


//   console.log('Connected to the database!');
//   let collection = db.collection("urls");

//   console.log('Retreiving documents for the "test" collection...');
//   collection.find().toArray((err, results) => {
//     console.log('results: ', results);



//   });
// });

=======
>>>>>>> feature/mongodb

function findURLs(){

  connectAndThen(function(err, db){
    // use db to find urls
    db.collection("urls").find({}, function(results){
      console.log("This many results: "+results.length);
<<<<<<< HEAD
    });
=======
    })
>>>>>>> feature/mongodb
  });
}



function generateRandomString() {
   var text = "";
 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 for( var i=0; i < 6; i++ )
   text += possible.charAt(Math.floor(Math.random() * possible.length));
 return text;
}



function getLongURL(db, shortURL, cb) {
  let query = { "shortURL": shortURL };
  db.collection("urls").findOne(query, (err, result) => {
    if (err) {
      return cb(err);
    }
    return cb(null, result.longURL);
  });
}



function connectAndThen(cb){

  MongoClient.connect(MONGODB_URI, (err, db) => {
<<<<<<< HEAD
    cb(err, db);
  });
}


app.get("/urls", (req, res) => {
=======

    if (err) {
      console.log('Could not connect! Unexpected error. Details below.');
      throw err;
    }

    cb(err, db);
  })
}



app.get("/urls", (req, res) => {
 connectAndThen(function(err, db){
    console.log("Connected to db then did this!");
    console.log("With errors: "+err);

    db.collection("urls").find().toArray((err, urls) => {


      res.render("urls_index", {urls: urls});

    });
  });

>>>>>>> feature/mongodb

});

<<<<<<< HEAD
  connectAndThen(function(err, db){

    console.log("Connected to db then did this!");
    console.log("With errors: "+err);

    db.collection("urls").find().toArray((err, urls) => {


      res.render("urls_index", {urls: urls});

    });
  });


});


// app.get("/urls/new", (req, res) => {
//   console.log("GET /urls_new");
//   res.render("urls_new");

// });

//EXAMPLE one//////////////////////////////
// app.get("/urls/:key/edit", (req, res) => {
//   var templateVars1 = {
//     longURL: urlDatabase[req.params.key],
//     key: req.params.key
//   };
//   res.render("urls_show", templateVars1);
// });
///////////////////////////////////////////

app.get("/urls/:id/edit", (req, res) => {
  let shortURL = req.params.id;
  getLongURL(dbInstance, shortURL, (err, longURL) => {
    console.log(longURL);
    // the longURL available in a callback function

  });
=======
//this is the page that displays the form
app.get("/urls/new", (req, res) => {
  console.log("GET /urls_new");
  res.render("urls_new");

});

                                                                //must use to.Array everytime we're using to.find()
app.get("/urls/:id/edit", (req, res) => {
  // let shortURL = req.params.id;
//   connectAndThen(function(err, db){
//     getLongURL(db, shortURL, (err, longURL) => {
//       console.log(longURL);
//       // // the longURL available in a callback function
//       // templateVars = {
//       //   'shortURL': shortURL,
//       //   'longURL': longURL
//       // }
//       res.render("urls_show", {longURL: longURL});
//     });
//   });
// });

 connectAndThen(function(err, db) {
    if (err) {
      console.log("With errors: "+err);
    }
    //when you're using "find" you have to use ".toArray" to get the information back.
    db.collection("urls").findOne({shortURL: req.params.id}, (err, url) => {
      res.render("urls_show", {url: url});
    })
  });

>>>>>>> feature/mongodb
});


app.put("/urls/:key/edit", (req, res) =>{
    urlDatabase[req.params.key] = req.body.longURL;
    console.log(urlDatabase);
    res.redirect("/urls");
});

app.post("/urls", (req, res) => {
  var newURL = {
    shortURL: generateRandomString(),
    longURL: req.body.longURL
  }
connectAndThen(function(err, db){

  //   var newURL = {
  //   shortURL: generateRandomString(),
  //   longURL: req.body.longURL
  // }
//new document will look different from our newURL variable because it will have the mongo generated id.
  db.collection("urls").insert(newURL, (err, url) => {
    if(err) res.status(500).json(err);
    res.render("urls_create", {url: newURL.longURL});
  })

})

});
  //the params is coming from the url that is how we're transferring our keys
  //the body refers to the post body





app.delete("/urls/:key", (req, res) => {

   connectAndThen(function(err, db){

    console.log("Connected to db then tried to delete!");
<<<<<<< HEAD
    console.log("With errors: "+err);


    db.collection("urls").deleteOne({shortURL: req.params.key}, function (err) {
      console.log(err);
    })
      console.log("HI");

      res.redirect("/urls");
  });


});



// app.delete("/urls/:key", (req, res) => {
//    var deleteKey = req.params.key;
//    delete urlDatabase[deleteKey];
//    res.redirect("/urls");
// });




// app.put("urls/:key", (req, res) => {
//     var editKey = req.params.key
// });

app.get("/urls/shortURL", (req, res) => {
  console.log(Object.keys(urlDatabase));
  var length = Object.keys(urlDatabase).length - 1;
  var theShortenedURL = Object.keys(urlDatabase)[length];
  res.render('urls_create', {shortURL: theShortenedURL});
=======
    // console.log("With errors: "+ err);


    db.collection("urls").remove({shortURL: req.params.key}); //if err? do we want to show and error message?
    console.log("HI");

    res.redirect("/urls");
  });


>>>>>>> feature/mongodb
});




//this is the redirect page
/* this route finds a shortURL and then redirects to the longURL
*/
app.get("/u/:shortURL", (req, res) => {
  //connect to the database
  connectAndThen((err,db) => {
    //we have a connection

    //Find url with the matching shortURL
    db.collection('urls').findOne({shortURL: req.params.shortURL}, (err, url) => {
      console.log('found url', url);
      // redirect to the longURL
      getLongURL(db, req.params.shortURL, (err, longURL) => {
        let templateVars = {
          'shortURL': req.params.shortURL,
          'longURL': longURL
        }
        res.render('urls_create', templateVars);
      })
    })
  })

});

/// [{}] . find so must use .toArray
//   {}  .findOne returns an object so we dont need to use to array.


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});



// create -> show the creation form
// show -> show the details of a shortURL
// index -> list all the URLS
// edit -> show a form to edit a shortURL



//show information about a url("show page" but not the actual show page its our edit page.)
//you will get this page after you create your short url.
// We'll redirect here after


app.get('/urls/:key', (req,res) => {
   var shortURL = req.params.key;
   connectAndThen((err,db) => {
    //we have a connection

    //Find url with the matching shortURL
    db.collection('urls').findOne({shortURL: shortURL}, (err, url) => {
      console.log('found url', url);
      // display information about the url
      res.render('urls_show', {url: url});
    })
  })

});


