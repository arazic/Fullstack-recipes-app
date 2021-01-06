var express = require("express");
var router = express.Router();
const authentic= require("./utils/authentic");
const DBOperation = require("../modules/dbOperation");
var profileHandler=require("./utils/profileHandler");

// add to user favorite recipes
router.post("/favorites/:id", authentic, async function(req, res,next){
  const { id } = req.params;
  try
  {
    if(await DBOperation.addRecipeToFavorit(req.session.user_id, id,next))
    {
      res.status(200).send({ message: "addRecipeToFavorit" ,success:true });
      console.log("success");
    }
  }
  catch(err)
  {
    console.log(err);
    next(err);
  }
  
});

// get all user favorite recipes
router.get("/favorites" ,authentic,async function (req, res, next)
 {
  let favorites_list=[];
  const favorites = await DBOperation.getFavorite(req.session.user_id, next).catch(err=>next(err));
  if(favorites.length === 0)
  {
    res.status(201).send({message: "no favorire recipes for user"});
  }
  else
  {
    favorites.map((fave)=>favorites_list.push(fave.recipe_id));
    let previewRecipes =await profileHandler.getPreviewRecipes(favorites_list);
    await profileHandler.getWatchAndFavorite(req.session.user_id,previewRecipes);
    res.send({previewRecipes: previewRecipes});
  }
});

// get all user watched recipes
router.get("/watched",authentic,async function (req, res, next)
{
  let watchs_list=[];
  const watchs = await DBOperation.getWatchs(req.session.user_id, next).catch(err=>next(err));
  if(watchs.length===0)
  {
    res.status(201).send({message: "no watched recipes for user"});
  }
  else
  {
    watchs.map((watch)=>watchs_list.push(watch.recipe_id));
    let previewRecipes= await profileHandler.getPreviewRecipes(watchs_list)
    await profileHandler.getWatchAndFavorite(req.session.user_id,previewRecipes);
    res.send({previewRecipes: previewRecipes});
  }
});

// get the last watched recipes of the certain logged in user
router.get("/lastRecipes",authentic,async function (req, res, next)
{
  console.log("enter to lastRecipes")
  let watchs_list=[];
  const watchs = await DBOperation.getLastRecipes(req.session.user_id, next).catch(err=>next(err));
  if(watchs.length===0)
  {
    res.status(201).send({message: "no watched recipes for user"});
    console.log("enter to 201")
  }
  else
  {
    watchs.map((watch)=>watchs_list.push(watch.recipe_id));
    let previewRecipes= await profileHandler.getPreviewRecipes(watchs_list);
    await profileHandler.getWatchAndFavorite(req.session.user_id,previewRecipes);
    console.log(previewRecipes)

    res.send({previewRecipes: previewRecipes} );
  } 
});

// get a certain personal recipe by id of the certain logged in user
router.get("/personalRecipes/:id",authentic, async function (req, res, next) {
  const { id } = req.params;
  const fullRecipe= await profileHandler.getPersonalFullRecipe(req.session.user_id,id, next).catch(err=>next(err));
  res.status(200).send({ fullRecipe: fullRecipe });

});

// get all the personal recipes of the certain logged in user
router.get("/personalRecipes", authentic,async function (req, res,next) {
  try{
    const personalRecipes = await profileHandler.getPersonalPreviewRecipes(req.session.user_id, next);
    if(personalRecipes.length===0)
    {
      res.status(201).send({message: "no personal recipes for user"});
    }
    else
    {
      res.status(200).send({ previewRecipes: personalRecipes });
    }
  }
  catch(err)
  {
    next(err);
  }
});

// get a certain family recipe by id of the certain logged in user
router.get("/familyRecipes/:id", authentic, async function (req, res, next) {
  const { id } = req.params;
  const fullRecipe= await profileHandler.getFamilyFullRecipe(req.session.user_id,id, next).catch(err=>next(err));
  res.status(200).send({ fullRecipe: fullRecipe });
});

// get all the family recipes of the certain logged in user
router.get("/familyRecipes",authentic,async function (req, res, next)
 {
   try
  {
    const familyRecipes = await profileHandler.getFamilyPreviewRecipes(req.session.user_id, next);
    if(familyRecipes.length ===0)
    {
      res.status(201).send({message: "no family recipes for user"});
    }
    else
    {
      res.status(200).send({ previewRecipes: familyRecipes });
    }
  }
  catch(err)
  {
    next(err);
  }
});

// // return the full recipe details - and add to watched table and last recipes table
// router.get("/RecipeInfo/:id", authentic, async function(req, res,next)
// {
//   const { id } = req.params;
//   await DBOperation.watchUpdate(req.session.user_id, id,next).catch(err=>next(err));
//   await DBOperation.addRecipeToLastRecipes(req.session.user_id, id,next).catch(err=>next(err));
//  getFullRecipe
//   let fullRecipe = await profileHandler.checkFavorite(req.session.user_id,fullRecipe);
//   res.status(200).send({ fullRecipe: fullRecipe });
// });


// return the full recipe details - and add to watched table and last recipes table
router.get("/RecipeInfo", authentic, async function(req, res,next)
{
  let recipe_id =req.session.fullRecipe.previewRecipe.recipe_id;
  await DBOperation.watchUpdate(req.session.user_id, recipe_id,next).catch(err=>next(err));
  await DBOperation.addRecipeToLastRecipes(req.session.user_id, recipe_id,next).catch(err=>next(err));
  let fullRecipe = await profileHandler.checkFavorite(req.session.user_id,req.session.fullRecipe);
  res.status(200).send({ fullRecipe: fullRecipe });
});

// get all the previews recipes of the certain logged in user
router.get("/recipesProfile",authentic, async function(req, res,next)
{
  try
  {
    await profileHandler.getWatchAndFavorite(req.session.user_id,req.session.previewRecipes);
    res.status(200).send({previewRecipes: req.session.previewRecipes})
  }
  catch(err)
  {
    next(err);
  }
});


module.exports = router;
