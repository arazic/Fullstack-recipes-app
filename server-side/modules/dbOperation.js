const DButils = require("./DB");
const bcrypt = require("bcrypt");

// create new user in Users table
exports.createUser =async function createUser(user)
{
    let hashPassword=bcrypt.hashSync(user.password,parseInt(process.env.bcrypt_saltRounds)) ;
    await DButils.execQuery(
        `INSERT INTO Users VALUES (default, '${user.username}', '${user.first_name}','${user.last_name}','${user.country}','${hashPassword}','${user.email}','${user.profile_picture}')`
      );
};

// check if user exists in Users table
exports.checkIfUserExists = async function checkIfUserExists (username,email,next)
{
  try{
    const users = await DButils.execQuery(`SELECT username FROM Users where username= '${username}' or email='${email}'`);
    if(users && users.length>0)
    {
      return false;
    }
    return true;
  }
  catch(err)
  {
      next(err);
  }
 
}

// check if recipe exists in recipes
function checkIfExists(recipes, recipe_id)
{
  for (i = 0; i < recipes.length; i++)
  {
    if(parseInt(recipes[i].recipe_id) ===recipe_id) 
    {
      return true;
    }
  }
  return false;
}

// add recipe to last recipe table for 3 last recipes
exports.addRecipeToLastRecipes =async function addRecipeToLastRecipes(user_id, recipe_id,next)
{
  try
  {
      let lastRecipes = await DButils.execQuery(
        `Select * FROM UserLastRecipes where user_id='${user_id}' ORDER BY counter ASC `
      );
      if(checkIfExists(lastRecipes,recipe_id) === true)
      {
         let recipes = changeOrder(lastRecipes, recipe_id);
         recipes.forEach(updateLastRecipes);
      }
      else
      {
        if(lastRecipes.length==3)
        {
          await DButils.execQuery(
            `Delete FROM UserLastRecipes where user_id='${user_id}' AND counter='3'`
          );
        }
        await DButils.execQuery(
          `INSERT INTO UserLastRecipes VALUES ('${user_id}', '${recipe_id}','0') `
        );
        await DButils.execQuery(
          `Update UserLastRecipes SET counter= counter+1 where user_id='${user_id}'`
        );
      }
  }
    catch (err) {
      console.error("SQL error", err);
      throw err;
  }
};

// get recipe and update last recipes table
async function updateLastRecipes(recipe)
{
  await DButils.execQuery(
    `Update UserLastRecipes SET counter= '${recipe.counter}' where user_id='${recipe.user_id}' AND recipe_id='${recipe.recipe_id}' `
     );
}

// change order of last recipe to save the last current recipe 
function changeOrder(lastRecipes, recipe_id)
{
  let recipes = new Array();
  for (let index = 0; index < lastRecipes.length; index++)
  {
    if(parseInt(lastRecipes[index].recipe_id)===recipe_id)
    {
      lastRecipes[index].counter=1;
      recipes.push(lastRecipes[index]);
    }
  }
  let counter =2;
  for (let index = 0; index < lastRecipes.length; index++)
  {
    if(parseInt(lastRecipes[index].recipe_id)!==recipe_id)
    {
      lastRecipes[index].counter=counter;
      counter++;
      recipes.push(lastRecipes[index]);
    }
  }
  return recipes;
}


// update the current recipe to be opened (get full recipe) - update wathces table
exports.watchUpdate =async function watchUpdate(user_id, recipe_id,next)
{
  try{
      let recipe =await DButils.execQuery(
        `SELECT * FROM UserswatchedRecipes where user_id='${user_id}' AND recipe_id='${recipe_id}'`
      );
      if(recipe.length === 0)
      {
        await DButils.execQuery(
          `INSERT INTO UserswatchedRecipes VALUES ('${user_id}', '${recipe_id}')`
        );
      }
  }
    catch (err)
    {
      console.error("SQL error", err);
      throw err;
    }
};

// add recipe to favorite table
exports.addRecipeToFavorit =async function addRecipeToFavorit(user_id, recipe_id,next)
{
  try{
      await DButils.execQuery(
        `INSERT INTO UsersFavoriteRecipes VALUES ('${user_id}', '${recipe_id}')`
      );
      console.log("insert to favorite");
      return true;
    }
    catch (err)
    {
      console.log(err);
    throw err;
  }
};

// get favorite of user from user favorite table
exports.getFavorite =async function getFavorite(user_id, next)
{
  try{
      return await DButils.execQuery(
        `SELECT * FROM UsersFavoriteRecipes WHERE user_id = '${user_id}'`
      );
    }
    catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};

// get watched recipes of user from user watched recipes table
exports.getWatchs =async function getWatchs(user_id, next)
{
  try{
      return await DButils.execQuery(
        `SELECT * FROM UserswatchedRecipes WHERE user_id = '${user_id}'`
      );
    }
    catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};

// get last recipes from user last recipes table
exports.getLastRecipes =async function getLastRecipes(user_id, next)
{
  try{
      return await DButils.execQuery(
        `SELECT * FROM UserLastRecipes WHERE user_id = '${user_id}'`);
      }
      catch (err) {
        console.error("SQL error", err);
        throw err;
    }
};

// get the personal recipes in a preview recipes view
exports.getPersonalPreviousRecipes =async function getPersonalPreviousRecipes(user_id, next)
{
  try{
      return await DButils.execQuery(
        `SELECT * FROM previewRecipes WHERE user_id = '${user_id}'`
      );
    }
    catch (err)
    {
      console.error("SQL error", err);
      next(err);
    }
};

// get the family recipes in a preview recipes view
exports.getFamilyPreviousRecipes =async function getFamilyPreviousRecipes(user_id, next)
{
  try{
      return await DButils.execQuery(
        `SELECT * FROM familyPreviewRecipes WHERE user_id = '${user_id}'`
      );
    }
    catch (err) {
    console.error("SQL error", err);
    throw err;
    }
};

// get the family recipes in a preview recipes view
exports.getPersonalPreviousRecipe =async function getPersonalPreviousRecipe(user_id, recipe_id,next)
{
  try{
      return await DButils.execQuery(
        `SELECT * FROM previewRecipes WHERE user_id = '${user_id}' AND id = '${recipe_id}'`
      );
    }
    catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};

// get the family recipes with the full details
exports.getFamilyFullRecipe =async function getFamilyFullRecipe(user_id, recipe_id,next)
{
  //let userGuid = new Guid(user_id);
  try{
      return await DButils.execQuery(
        `SELECT * FROM familyPreviewRecipes WHERE user_id = '${user_id}' AND id = '${recipe_id}'`
      );
    }
    catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};


// get the ingredirents of a recipe
exports.getIngredientsRecipe =async function getIngredientsRecipe(recipe_id, next)
{
  try{
      return await DButils.execQuery(
        `SELECT * FROM ingredients WHERE id = '${recipe_id}'`
      );
    }
    catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};

// get the instruction of a recipe
exports.getInstructionsRecipe =async function getInstructionsRecipe(recipe_id, next)
{
  try{
      return await DButils.execQuery(
        `SELECT * FROM instructions WHERE id = '${recipe_id}'`
      );
    }
    catch (err) {
    console.error("SQL error", err);
    throw err;
    }
};





