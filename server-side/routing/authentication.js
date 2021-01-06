var express = require("express");
var router = express.Router();
const DButils = require("../modules/DB");
const DBOperation = require("../modules/dbOperation");
const bcrypt = require("bcrypt");
var userHandler=require("./utils/userHandler");

//login route - get username and password
router.post("/login", async function(req, res, next) {
    try
    {
      const user = await DButils.execQuery(`SELECT * FROM Users WHERE username = '${req.body.username}'`);
      if (!user.find((x) => x.username === req.body.username))
        throw { status: 401, message: "Username or Password incorrect" };
      // check that the password is correct
      if (!bcrypt.compareSync(req.body.password, user[0].password))
        {
        throw { status: 401, message: "Username or Password incorrect" };
        }
      // Set cookie
      req.session.user_id = user[0].user_id;
      res.status(200).send({ message: "login succeeded", success: true, first_name:user[0].first_name, last_name:user[0].last_name });
    }
    catch (error)
    {
      next(error);
    }
  });

  //register route - get username, first_name, last_name, country ,password, email and profile_picture
router.post("/register",async function (req, res,next)
 {
   try{
    if(req.body.username === undefined || req.body.username.length<3 || req.body.username>8)
    {
      throw {status: 400, message: "Invalid request username must be 3-8 chracter"};
    }  
    if(req.body.email !==undefined && await DBOperation.checkIfUserExists(req.body.username,req.body.email,next))
    {
      if(req.body.password && userHandler.checkPassword(req.body.password))
      {
        await DBOperation.createUser(req.body);
        res.status(201).send({message: "user created successfully"});
      }
      else
      {
        throw {status: 400, message: "Invalid request password must be 5-10 chracter and contains digit and special chracter"};
      }
    }
    else
    {
      throw { status: 409, message: "Username or email taken, please try diffrent username or diffrent email" };
    }
   }
   catch(error)
   {
      next(error);
   }
 });

  //logout route
 router.get("/logout", async function(req, res, next) {
  try
  {
    if (req.session.user_id!=undefined){
      req.session.user_id= undefined;
      res.status(200).send({ message: "logout succeeded", success: true });   
    }
    else{
      res.status(409).send({ message: "alredy logout", success: false});
    }
  }
  catch (error)
  {
    next(error);
  }
});

 module.exports = router;