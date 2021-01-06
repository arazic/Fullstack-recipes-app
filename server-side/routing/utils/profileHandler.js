var recipesHandler=require("./recipesHandler");
const DBOperation = require("../../modules/dbOperation");

// get all the preview recipes of a connected user
exports.getPreviewRecipes = async function getPreviewRecipes (recipes)
{
    let recipesData = await Promise.all(
        recipes.map(recipesHandler.getRecipeInfo)
      );
    let previewRecipes=recipesHandler.getPreviewRecipes(recipesData);
    return previewRecipes;
}

// add to recipes list- if each one of them was watched or favorite
 async function getWatchAndFavorite(user_id,recipes)
 {
    const watch=  await DBOperation.getWatchs(user_id);
    const favorite=  await DBOperation.getFavorite(user_id);
    for (let index = 0; index < recipes.length; index++)
     {
        let recipe_id = recipes[index].recipe_id;
        for (let i = 0; i < watch.length; i++)
        {
            if(parseInt(watch[i].recipe_id)===recipe_id)
            {
                recipes[index].watch= true;
            }
        }
        for (let j = 0; j < favorite.length; j++) {
            if(parseInt(favorite[j].recipe_id)===recipe_id)
            {
                recipes[index].favorite= true;
            }
        }
    }   
}

// check if a certain recipe is in favorites
exports.checkFavorite = async function checkFavorite(user_id,recipe)
{
    const favorite=  await DBOperation.getFavorite(user_id);
    let recipe_id = recipe.previewRecipe.recipe_id;
    for (let index = 0; index < favorite.length; index++)
    {
        if(parseInt(favorite[index].recipe_id)===recipe_id)
        {
            recipe.previewRecipe.favorite=true;
            recipe.previewRecipe.watch=true;
            return recipe;
        }   
    }
    recipe.previewRecipe.watch=true;
    return recipe;
}

// return full personal recipe details
exports.getPersonalFullRecipe= async function getPersonalFullRecipe(user_id,recipe_id,next)
{
    let fullRecipe = new Object();
    const ingredients=  await DBOperation.getIngredientsRecipe(recipe_id);
    const instructionsData=  await DBOperation.getInstructionsRecipe(recipe_id);
    const personalRecipe = await DBOperation.getPersonalPreviousRecipe(user_id,recipe_id);
    const instructions = createInstructions(instructionsData);
    fullRecipe.previewRecipe=recipesHandler.createPreviewRecipe(personalRecipe[0]);
    fullRecipe.servinges=personalRecipe[0].servinges;
    fullRecipe.ingredients=ingredients;
    fullRecipe.instructions=instructions;
    return fullRecipe;
}

function createInstructions(recipeInstructions){
    let instructions = new Array();
    instructions[0]=new Object();
    instructions[0].steps=new Array();
    for(let i=0; i<recipeInstructions.length;i++)
    {
        instructions[0].steps[i]= new Object();
        instructions[0].steps[i].description=recipeInstructions[i].step_description;
        instructions[0].steps[i].number=i+1;
        instructions[0].steps[i].equipment = new Array();
        instructions[0].steps[i].ingredients = new Array();
        instructions[0].steps[i].equipment.push(recipeInstructions[i].equipment);
        instructions[0].steps[i].ingredients.push(recipeInstructions[i].ingredients);
    }
    return instructions;
}

// return full family recipe details
exports.getFamilyFullRecipe= async function getFamilyFullRecipe(user_id,recipe_id,next){
    let fullRecipe = new Object();
    const FamilyFullRecipe = await DBOperation.getFamilyFullRecipe(user_id,recipe_id);
    if(FamilyFullRecipe.length===0)
    {
        return fullRecipe;
    }
    const ingredients = await DBOperation.getIngredientsRecipe(recipe_id);
    const instructionsData = await DBOperation.getInstructionsRecipe(recipe_id);
    fullRecipe.previewRecipe= recipesHandler.createPreviewRecipe(FamilyFullRecipe[0]);
    const instructions = createInstructions(instructionsData);
    fullRecipe.servinges =  FamilyFullRecipe[0].servinges;
    fullRecipe.ingredients=ingredients;
    fullRecipe.instructions=instructions;
    fullRecipe.chef=FamilyFullRecipe[0].chef;
    fullRecipe.meal_times=FamilyFullRecipe[0].meal_times;
    return fullRecipe;
}


// get personal preview recipe detalis
async function getPersonalPreviewRecipes(user_id,next)
{
    let personalRecipes = await DBOperation.getPersonalPreviousRecipes(user_id, next);
    personalRecipes = personalRecipes.map(recipesHandler.createPreviewRecipe);
    //await getWatchAndFavorite(user_id,personalRecipes);
    return personalRecipes ;
}


// get family preview recipe detalis
async function getFamilyPreviewRecipes(user_id,next)
{
    let personalRecipes = await DBOperation.getFamilyPreviousRecipes(user_id, next);
    personalRecipes = personalRecipes.map(recipesHandler.createPreviewRecipe);
    //await getWatchAndFavorite(user_id,personalRecipes);
    return personalRecipes;
}


exports.getWatchAndFavorite = getWatchAndFavorite;
exports.getPersonalPreviewRecipes=getPersonalPreviewRecipes; 
exports.getFamilyPreviewRecipes= getFamilyPreviewRecipes;