
const DButils = require("../../modules/DB");

//authentic function for all the login functions
module.exports= async (req, res, next) => {
    if(req.session && req.session.user_id)
    {
      const user=   await DButils.execQuery(`SELECT * FROM Users WHERE user_id = '${req.session.user_id}'`);
      if (!user.find((x) => x.user_id === req.session.user_id))
        throw { status: 401, message: "Username or Password incorrect" };
      else
      {
          req.user= user;
          next();
      }
    }
    else
    {
      res.status(401).send({message:"Invalid operation, user must login first"});
    }
  };

 


