<template>
  <div class="container">
    <RecipePreviewList v-show="containsRecipe" title="Personal Recipes" :favorite="false" url="http://localhost:3000/profile/personalRecipes"  v-on:no-recipes="raiseError" v-on:full-recipe="fullRecipe" v-on:unauthorized="transferToLogin" class="RandomRecipes center" />  
    <p v-show="containsRecipe===false" class="error"> you dont have any personal recipes </p> 
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data () {
    return {
      containsRecipe:true
    };
  },
  methods: {
    async fullRecipe(recipe_id)
    {
        try {
          const respone= await this.axios.get("http://localhost:3000/profile//personalRecipes/"+recipe_id);
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


