const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";

// return from sponcolar api 3 random recipes
exports.createRandomRecipes = function createRandomRecipes(randomRecipes)
{
    let randomPreview =[];
    let counter=0;
    for (i = 0; i < randomRecipes.length; i++)
    {
        if(randomRecipes[i].analyzedInstructions.length>0)
        {
            let previewRecipe =createPreviewRecipe(randomRecipes[i]); 
            randomPreview.push(previewRecipe);
            counter++;
        }
        if(counter===3)
        {
            return randomPreview;
        }  
    }
    return searchRandomRecipesAgain();
}

// call random recipe function to raffle more 3 recipes
function searchRandomRecipesAgain()
{
    let recipes = getRandomRecipes();
    return createRandomRecipes(recipes);
}

// get full details of certain recipe- from sponcolat api 
exports.getFullRecipe =function getFullRecipe(recipe)
{
    let fullRecipe = new Object();
    fullRecipe.previewRecipe=createPreviewRecipe(recipe.data);
    fullRecipe.servinges=recipe.data.servings;
    fullRecipe.ingredients=getRecipeIngredients(recipe);
    fullRecipe.instructions=getRecipeInstructions(recipe);
    return fullRecipe;
}

// get all the ingredients for certain recipe
function getRecipeIngredients(recipe)
{
    let recipeIngredients=recipe.data.extendedIngredients.map(createIngredients);
    return recipeIngredients;
}

// return the ingredient for certain recipe in a certain format
function createIngredients(ingredients)
{
    let recipeIngredients = new Object();
    recipeIngredients.name=ingredients.name;
    recipeIngredients.amount=ingredients.amount;
    recipeIngredients.unit=ingredients.unit;
    return recipeIngredients;
}

// get all the instructions for certain recipe
function getRecipeInstructions(recipe)
{
    let instructions=recipe.data.analyzedInstructions.map(createInstruction);
    return instructions;
}

// return the instructions for certain recipe in a certain format
function createInstruction (instructions)
{
    let instructionsPhase = new Object();
    instructionsPhase.name = instructions.name;
    instructionsPhase.steps=instructions.steps.map(getInstructionSteps);
    return instructionsPhase;
}

// get instrutctions by steps- 
//  for each step returns: number, description, equipment, ingredients
function getInstructionSteps (instructions)
{
    let recipeInstruction = new Object();
    recipeInstruction.number=instructions.number;
    recipeInstruction.description=instructions.step;
    recipeInstruction.equipment=instructions.equipment.map(equipment => equipment.name);
    recipeInstruction.ingredients=instructions.ingredients.map(ingredient => ingredient.name);
    return recipeInstruction;
}

// return the preview recipe for a lot of recipes in a certain format
exports.getPreviewRecipes = function getPreviewRecipes(recipes)
{
    let previreRecipes=new Array();
    for (i = 0; i < recipes.length; i++)
    {
        let previewRecipe=createPreviewRecipe(recipes[i].data);
        previreRecipes.push(previewRecipe);
    }
    return previreRecipes;
} 

// return the preview recipe for certain recipe in a certain format
function createPreviewRecipe(value)
{
    let previewRecipe = new Object();
    previewRecipe.title=value.title;
    previewRecipe.readyInMinutes=value.readyInMinutes;
    previewRecipe.urlPicture=value.image;
    previewRecipe.likes=value.aggregateLikes;
    previewRecipe.vegan=value.vegan;
    previewRecipe.vegetarian=value.vegetarian;
    previewRecipe.glutenFree=value.glutenFree;
    previewRecipe.recipe_id=value.id;
    previewRecipe.watch=false;
    previewRecipe.favorite=false;
    return previewRecipe;
}
exports.createPreviewRecipe=createPreviewRecipe;

// get random recipe from api sponcolar 
exports.getRandomRecipes = function getRandomRecipes() {
  return axios.get(`${api_domain}/random`, {
    params: {
        limitLicense: true,
        number:6,
        apiKey: process.env.spooncular_apiKey
    }
  });
}

// search recipe by name - search in api sponcolar
exports.searchRecipe = function searchRecipe(queryParams)
{
    if(!queryParams.query || queryParams.query ==="" )
    {
        throw { status: 400, message: "Invalid recipe name" };
    }
    const name=queryParams.query;
    let cuisine="";
    let diet="";
    let amount=5;
    let intolerance="";
    if(queryParams.cuisine !== undefined) 
    {
        cuisine=queryParams.cuisine;
    }
    if(queryParams.diet !==undefined)
    {
        diet=queryParams.diet;
    }
    if(queryParams.amount !==undefined)
    {
        amount=queryParams.amount;
    }
    if(queryParams.intolerance !==undefined)
    {
        intolerance=queryParams.intolerance;
    }
    return axios.get(`${api_domain}/search`, {
      params: {
          query: name,
          cuisine: cuisine,
          diet: diet,
          intolerance: intolerance,
          number: amount,
          instructionsRequired: true,
          apiKey: process.env.spooncular_apiKey
      }
    });
  }

  // return the recipe details for certain recipe id
  exports.getRecipeInfo = function getRecipeInfo(id) {
      try{
        return axios.get(`${api_domain}/${id}/information`, {
            params: {
              includeNutrition: false,
              apiKey: process.env.spooncular_apiKey
            }
          });
      }
      catch(error){
        console.log(error);
        throw { status: 400, message: error.message};
      }
    
  }

