<template>
<div class="home-page">
<h1 class="title">Main Page</h1>
  <Login v-if="!$root.store.username" class="login" /> 
  <RecipePreviewList v-if="$root.store.username" v-show="noWatchRecipe" v-on:no-recipes="raiseError" v-on:full-recipe="fullRecipe" v-on:unauthorized="transferToLogin" title="Last Recipes"   url="http://localhost:3000/profile/lastRecipes" :favorite="true" class="random-recipes" /> 
  <RecipePreviewList title="Randome Recipes" :key="randomRecipe" v-on:no-recipes="raiseError" v-on:full-recipe="fullRecipe" url="http://localhost:3000/recipes/exploreRecipes" :favorite="true" class="random-recipes" />   
  <b-button  class="button" variant="primary" @click="getNewRandomRecipes">New random recipes</b-button>
</div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import Login from "./Login";

export default {
  components: {
    RecipePreviewList,
    Login
  },
  data(){
    return {
      noWatchRecipe: true,
      randomRecipe:0
    }
  },
  methods: {
    async fullRecipe(recipe_id)
    {
        try {
          const respone= await this.axios.get("http://localhost:3000/recipes/Information?id="+recipe_id);
          let fullRecipe =respone.data.fullRecipe;
          this.$router.push({ name: 'recipe', query: { recipe: fullRecipe } }).catch(()=>{});

        }
        catch(error){
          console.log(error);
        }
    },
    raiseError(){
        this.noWatchRecipe=false;
    },
    getNewRandomRecipes () {
      console.log("button pushed");
      this.randomRecipe+=1;
    },
       transferToLogin(){
        this.$emit("unauthorized");
      }
  }
};
</script>

<style scoped>

.login {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
 .title {
   margin: 0% 0% 0% 2%;
   padding: 2%;
   color: rgb(255, 255, 255);
 }
 .button {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  padding: 0.5%;
 }

</style>


