<template>
  <b-container class="recipe-list"> 
    <h3 class="title"> 
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row cols="4">
      <b-col v-for="r in recipes" :key="r.id">
<RecipePreview v-on:full-recipe="fullRecipe" :detailes="true" class="recipe-preview" :favorite="favorite" :recipe="r" />      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    favorite: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
           this.url
        );
        console.log(response);
        if(response.status===401)
        {
          console.log("unauthorized");
        }
        const recipes = response.data.previewRecipes;
        if(recipes && recipes.length>0)
        {
          this.recipes = [];
          this.recipes.push(...recipes);
        }
        else {
          this.$emit("no-recipes");
        }
      } catch (error) {
        if(error.message==="Request failed with status code 401")
        {
          this.$emit("unauthorized");
        }
        else{
        this.$emit("no-recipes");
        }
      }
    },
    sortByPopularity(){
        this.recipes.sort(function(a,b){
          return b.likes-a.likes
        })
      },
    sortByPreparationTime(){
        this.recipes.sort(function(a,b){
          return a.readyInMinutes-b.readyInMinutes
        })
      },
    fullRecipe(recipe_id) {
      this.$emit("full-recipe",recipe_id);
    }
  },
  watch : {
    url(newVal){
      this.url=newVal;
      this.updateRecipes();
    }
  }
};
</script>


<style scoped>
.title {
  margin:  auto;
  position: relative;
  padding: 10px;
  color: rgb(89, 224, 195);
}
</style>