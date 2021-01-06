<template>
  <div class="container">
    <p v-show="containsRecipe===false" class="error"> you dont have any favorites recipes </p> 
    <RecipePreviewList v-show="containsRecipe" :favorite="true" title="Favorites Recipes" url="http://localhost:3000/profile/favorites"  v-on:no-recipes="raiseError" v-on:full-recipe="fullRecipe" v-on:unauthorized="transferToLogin" class="RandomRecipes center" />   
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data(){
    return {
      containsRecipe: true
    };
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
        this.containsRecipe=false;
      },
      transferToLogin(){
        this.$emit("unauthorized");
      }
    }
};
</script>
<style scoped>
.error {
  font-size: 1.875em;
  color: red;
}
</style>


