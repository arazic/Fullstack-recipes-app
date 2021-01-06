<template>
  
      <b-card class="recipe-preview" >  
        <div class="icons">
            <b-card-img class="picture" v-show="recipe.vegetarian" :src="img.vegetarian" v-b-tooltip.hover.top="'vegetarian recipe'"> </b-card-img>
            <b-card-img class="picture" v-show="recipe.vegetarian===false" :src="img.notvegetarian" v-b-tooltip.hover.top="'not vegetrian recipe!'"></b-card-img>  
            <b-card-img class="picture" v-show="recipe.vegan" :src="img.vegan" v-b-tooltip.hover.top="'vegan recipe'"> </b-card-img>
            <b-card-img class="picture" v-show="recipe.vegan===false" :src="img. notvegan" v-b-tooltip.hover.top="'not vegan recipe'"></b-card-img>
            <b-card-img class="picture" v-show="recipe.glutenFree" :src="img.glutenfree" v-b-tooltip.hover.top="'gluten free'"> </b-card-img>
            <b-card-img class="picture" v-show="recipe.glutenFree===false" :src="img.gluten" v-b-tooltip.hover.top="'contains gluten'"></b-card-img>
            <b-card-img v-if="favorite" class="picture" v-show="recipe.favorite" :src="img.favorite" v-b-tooltip.hover.top="'favorite recipe'"></b-card-img>
        </div>
          <b-card-img v-if="detailes" @click="fullRecipe" :src="recipe.urlPicture" alt="Avatar" v-b-tooltip.hover.top="'click for details!'" top class="recipe-image"></b-card-img>
          <b-card-img v-else :src="recipe.urlPicture" alt="Avatar"  top class="static-image"></b-card-img>
          <b-card-body class="icons">
            <b-card-img class="picture"  v-show="recipe.watch" :src="img.watch" v-b-tooltip.hover.right="'watched recipe'"> </b-card-img>
            <b-card-sub-title @click="fullRecipe"><span class="text"> {{ recipe.title }} </span></b-card-sub-title>
          </b-card-body>
        <div class="icons">
          <b-card-img class="picture" :src="img.clock" ></b-card-img>
          <span class="text">{{ recipe.readyInMinutes }} minutes </span>
        </div>
        <div >
          <b-card-img class="picture"  :src="img.like" ></b-card-img>
          <span class="text">{{ recipe.likes }} likes </span>
        </div>
        <div>
          <b-button v-if="favorite" v-show="recipe.favorite===false" @click="addToFavorites" variant="primary" class="favorite-button">Add to favorites</b-button>
        </div>
      </b-card>
  
</template>

<script>
export default {
  data() {
    return {
        img: {
          vegetarian: require("../assets/Vegetarian.png"),
          notvegetarian: require("../assets/notVeg.jpg"),
          vegan: require("../assets/veganFriendly.jpg"),
          notvegan: require("../assets/notVegan.jpg"),
          glutenfree: require("../assets/glutenFree.png"),
          favorite: require("../assets/favorite.jpg"),
          gluten: require("../assets/gluten.png"), 
          clock: require("../assets/clock.png"),
          like: require("../assets/like.png"),
          watch: require("../assets/watch.png")
       }
    };
  },
  methods: {
    async addToFavorites (){
      try{
        await this.axios.post("http://localhost:3000/profile/favorites/"+this.recipe.recipe_id);
        this.recipe.favorite = true;
      }
    catch(error)
    {
      console.log(error);
       this.$root.toast("Personal action", "to add recipe to favorites you must have account first, log in or register ", "Danger");
    }
    },
    fullRecipe(){
      this.$emit("full-recipe",this.recipe.recipe_id);
    }
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    favorite: {
      type: Boolean,
      required: true
    },
    detailes: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>

.recipe-preview {
  margin: 3% 3% 3% 6%;
  float: left;
}
.hidden-text {
  text-align: left;
  margin: auto;
  vertical-align: middle;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 1em;
  color:black;
  position: relative;
}
.recipe-image:hover {
  opacity: 0.5;
}
.static-image{
   width: 100%;
  height: 100%;
  padding: 2px;
  margin: 1%;
  position: relative; 
}

.recipe-image  {
  width: 100%;
  height: 100%;
  padding: 2px;
  margin: 1%;
  position: relative;
}
.picture {
  width: 30%;
  height: 50%;
  padding: 2px;
  display: inline-flexbox;
  position: relative;
}
.icons {
  display: inline-block
}
text {
  padding: 1px;
  text-align: left;
  margin: auto;
  vertical-align: middle;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 1em;
  color:black;
  position: relative;
}
.favorite-button {
  position: relative;
  margin: 5% 1% 0% 2%;
}

</style>
