require("dotenv").config();
var express = require("express");
var path = require("path");
const session = require("client-sessions");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const DButils = require("./modules/DB");
const profile = require("./routing/profile");
const recipes = require("./routing/recipes");
const authentication = require("./routing/authentication");
var app = express();
const cors = require("cors");
const cookieParser= require("cookie-parser");

const corsConfig = {
  origin: 'http://localhost:8081',
  credentials: true  
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(express.json()); // parse application/json
app.use(cookieParser()); //parser for cookies.
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files
app.use(morgan(":method :url :status  :response-time ms"));


// app.use(
//   session({
//     cookieName: "session", // the cookie key name
//     secret: process.env.COOKIE_SECRET, // the encryption key
//     duration: 200 * 60 * 1000, // expired after 20 sec
//     activeDuration: 0 // if expiresIn < activeDuration,
//     //the session will be extended by activeDuration milliseconds
//   })
// );

app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 20 * 60 * 1000, // expired after 20 sec
    // activeDuration: 0, // if expiresIn < activeDuration,
    //the session will be extended by activeDuration milliseconds
    cookie: {
     ephemeral:false, 
     httpOnly: false,
     secure: false
   }
  })
);

var port = process.env.PORT || "3000";
app.use("/recipes", recipes);
app.use("/profile", profile);
app.use("",authentication);


// error middleware- with 4 params
app.use(function (err, req, res, next) 
{
    console.error(err);
    res.status(err.status || 500).send({ message: err.message, success: false });
});
  
  const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
  });
  