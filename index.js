const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
var exphbs = require("express-handlebars");


//  mongodb connection code is written in dbConfig.js file
var dbConn = require('./dbConfig')


// handle bars for rendering html templates
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//  express js body parser for more than v4.16.0
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))


app.use(express.static(path.join(__dirname, "static")));
app.use("/", require(path.join(__dirname, "routes/blog.js")));
app.use('/auth', require(path.join(__dirname,"routes/auth")));
app.use('/restaurants', require(path.join(__dirname,"routes/restaurants")));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
