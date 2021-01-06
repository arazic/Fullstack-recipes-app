var express = require("express");
var router = express.Router();
var recipesHandler=require("./utils/recipesHandler");

// get full recipe by recipe_id
router.get("/Information", async function (req, res, next) {
  try
  {
    const recipe = await recipesHandler.getRecipeInfo(req.query.id,next);
    const fullRecipe=recipesHandler.getFullRecipe(recipe);
    req.session.fullRecipe=fullRecipe;
    if(req.session && req.session.user_id){
       res.redirect('/profile/RecipeInfo');
    }
    else{
      res.status(200).send({ fullRecipe: fullRecipe });
    }
  } catch (error)
  {
    next(error);
  }
});



// get 3 random preview recipes 
router.get("/exploreRecipes", async function (req, res, next) {
  try
   {
      let randomRecipes = await recipesHandler.getRandomRecipes();
      let randomPreviewRecipes = recipesHandler.createRandomRecipes(randomRecipes.data.recipes);
      if(req.session && req.session.user_id)
      {
        req.session.previewRecipes=randomPreviewRecipes;
        res.redirect('/profile/recipesProfile');
      }
      else
      {
        res.status(200).send({ previewRecipes: randomPreviewRecipes });
      }  
   }
    catch (error) {
    next(error);
  }
});

// search for recipes by food name
router.get("/search",async function(req, res, next)
{
  try 
  {
    if(req.query && req.query.query !=="")
    {
      const search_response = await recipesHandler.searchRecipe(req.query);
      if(search_response.data.results.length === 0)
      {
          return res.status(404).send({message:"Recipe not found"});
      }
      else 
      {
          let recipes = await Promise.all(
              search_response.data.results.map((recipe_raw) =>
              recipesHandler.getRecipeInfo(recipe_raw.id)
              )
            );
          let previewRecipes=recipesHandler.getPreviewRecipes(recipes);
          if(req.session && req.session.user_id)
          {
            req.session.previewRecipes=previewRecipes;
            res.redirect('/profile/recipesProfile');
          }
         else
          {
           res.status(200).send({ previewRecipes: previewRecipes });
          }  
      }
    }
    else
    {
      throw {status: 400, message: "Invalid request query is empty or undefined "};
    }
   
  } catch (error) {
    next(error);
  }
});
 
module.exports = router;