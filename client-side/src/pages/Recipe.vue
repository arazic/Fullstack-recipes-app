<template>
  <div >
    <div v-if="recipe">
      <div>
         <div>
            <h1 class="center">{{ recipe.previewRecipe.title }}</h1>
         </div>
        <div> 
          <RecipePreview class="RecipePreview" :detailes="false" :favorite="recipe.previewRecipe.favorite===false" :recipe="recipe.previewRecipe" />
        </div>
        <div class="center">
            <h3> servinges numbers: {{ recipe.servinges }} </h3>
            <h6 v-if="recipe.chef"> The chef: {{ recipe.chef }} </h6>
            <h6  v-if="recipe.meal_times">  Meal times: {{ recipe.meal_times }} </h6>
            <b-form>
             <b-form-input class="input"
              id="servings"
              v-model="servings"
              type="number"
              placeholder="Enter number of servings "
        ></b-form-input>
            </b-form>
            <div class="inline">
              <b-card-img class="picture" :src="img.ingredients"> </b-card-img>
              <h2> ingredients </h2>
            </div>    
            <b-col v-for="ing in recipe.ingredients" :key="ing.name">
              {{ ing.name }}
              {{  Amount (ing.amount) }}
              {{ ing.unit }}
            </b-col>
        </div>
        <div class="center">
          <b-col>
            <h2> instructions </h2>
            <b-col v-for="step in recipe.instructions[0].steps" :key="step.number">
              <h5>step {{ step.number }}</h5>
              <h6> {{ step.description }}</h6>
          <div v-if="step.equipment.length > 0">  
           <h6  class="bold">equipment:</h6>
            <b-col v-for="e in step.equipment" :key="e.index" >
              {{ e }}
            </b-col>
          </div>
         <div v-if="step.ingredients.length > 0">  
            <h6 class="bold">ingredients:</h6>
             <b-col v-for="i in step.ingredients" :key="i.index" >
              {{ i }}
            </b-col>
          </div>
            </b-col>
          </b-col>
        </div>
      </div>
      </div>
    </div>
</template>
<script>
import RecipePreview from "../components/RecipePreview.vue";
export default {
  name: "Recipe",
  components: {
    RecipePreview
  },
  data() {
    return {
        img: {
          ingredients: require("../assets/ingredients.png"),
          equipment: require("../assets/equipment.jpg")
       },
       servings: null
    };
  },
  methods: {
      Amount(number){
        if(this.servings)
        {
          let num = (this.servings / this.recipe.servinges) *number;
          return num.toFixed(3);
        }
        else {
          return number.toFixed(3);
        }
    }
  },
  props: {
    recipe: null
    },
    mounted() {
      if(this.recipe===undefined)
      {
          this.$router.push("/").catch(()=>{});
      }
    }
};
</script>

<style scoped>
h6{
  color: bisque;
}
h5 {
  color:red;
}
h2 {
  color: darkkhaki;
  vertical-align: middle;
}
h1{
  color: blanchedalmond;
}
h3{
  color: bisque;
}
.picture {
  width: 15%;
  height: 10%;
  overflow: hidden;
  margin-right: 5%;
}
.bold {
  color: rgb(46, 233, 29);
}
.center {
  display: block;
  margin-left: 10%;
  margin-right: 10%;
  width: 50%;
  padding: 15px;
  color:white;
}
.input {
  padding-right: 35px;
  width: 45%;
  position: relative;
}
.inline {
  display: inline-flex;
  padding: 3px;
  margin: 1%;
}
div.transbox {
  margin: 30px;
  background-color: #ffffff;
  border: 1px solid black;
  opacity: 0.6;
}
div.transbox p {
  margin: 5%;
  font-weight: bold;
  color: #000000;
}
.RecipePreview{
  position: absolute;
  right: 3%;
  width: 25%;
  padding: 10px;
  color: black;
}

</style>