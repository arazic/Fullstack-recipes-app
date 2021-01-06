<template>
  <div>
    <b-form inline  @submit.prevent="search" class="form" >
      <b-form-group class="center"
        id="input-group-query"
        label-cols-sm="3"
        label="Recipe name"
        label-for="Recipe"
      >
        <b-form-input list="my-list-id" id="query" v-model="query" type="search" placeholder="Enter query" @ required></b-form-input>
         <datalist id="my-list-id">
            <option>{{ lastSearch}}</option>
          </datalist>
      </b-form-group>
      <b-form-group  class="center"
        id="input-group-amount"
        label="Number of recipes"
        label-for="amount"
      >
        <b-form-select
          id="amount"
          v-model="amount"
          :options="[5,10,15]"
        ></b-form-select>
      </b-form-group>

      <b-form-group class="center"
        id="input-group-cuisine"
        label-cols-sm="3"
        label="cuisine"
        label-for="cuisine"
      >
        <b-form-select
          id="cuisine"
          v-model="cuisine"
          :options="cuisines"
        ></b-form-select>
      </b-form-group>

      <b-form-group class="center"
        id="input-group-cuisine"
        label-cols-sm="3"
        label="Diets"
        label-for="diets">

        <b-form-select 
          id="diet"
          v-model="diet"
          :options="diets" >
        </b-form-select>

      </b-form-group>
      <b-form-group  class="center"
        id="input-group-intolerances"
        label-cols-sm="3"
        label="Intolerances"
        label-for="intolerances"
      >
        <b-form-select class="center"
          id="intolerance"
          v-model="intolerance"
          :options="intolerances"
          @change="updateIntolerance"
        ></b-form-select>
      </b-form-group>
      <b-form-group >
         <p class="center"> intolerances:{{ choosed.toString() }} </p>
      </b-form-group>
      <b-button class="button" 
        type="submit"
        variant="primary"
        >Search</b-button
      >
     <b-form-group class="center"
        v-if="searchFlag"
        id="input-group-sort"
        label-cols-sm="3"
        label="Sort by"
        label-for="SortBy"
      >
        <b-form-select
          v-if="searchFlag"
          id="sortBy"
          v-model="sortBy"
          :options="['Popularity', 'Preparation time']"
          @change="sort"
        ></b-form-select>
      </b-form-group>
    </b-form>
    <RecipePreviewList v-if="searchFlag" v-on:no-recipes="raiseError" v-on:full-recipe="fullRecipe" title="Search result" :favorite="true" :url="url" ref="searchResult"></RecipePreviewList>
    <p v-show="errorFlag" class="error">No results found, please enter new query </p>
  </div>
</template>

<script>
import cuisines from "../assets/cusines";
import diets from "../assets/diets";
import intolerances from "../assets/intolerances";
import { Search } from '@syncfusion/ej2-vue-dropdowns';
import RecipePreviewList from "../components/RecipePreviewList";
  export default {
    name: "search",
    data() {
      return {
        query: '',
        intolerance:'',
        diet: "None",
        cuisine: "All",
        diets: [],
        cuisines: [{ value: null, text: "", disabled: true }],
        intolerances:[{ value: null, text: "", disabled: true }],
        choosed: [],
        amount: 5,
        url:'',
        searchFlag: false,
        sortBy:'',
        errorFlag:false,
        lastSearch: ''
      };
    },
    components: {
      RecipePreviewList
    },
    methods: {
      updateIntolerance (){
        if(this.choosed.includes(this.intolerance))
        {
          let index = this.choosed.indexOf(this.intolerance);
          this.choosed.splice(index, 1);
          this.intolerance='';
        }
        else{
          this.choosed.push(this.intolerance);
          this.intolerance='';
        }
      },
      raiseError(){
        this.searchFlag=false;
        this.errorFlag=true;
      },
      search() {
        this.errorFlag=false;
      try {
        if(this.cuisine==='All')
        {
          this.cuisine=''
        }
        if(this.diet==='None')
        {
          this.diet=''
        }
        let intolerances=this.choosed.toString();
        if(this.$root.store.username)
        {
            sessionStorage.setItem("lastSearch",this.query);
            this.lastSearch=sessionStorage.getItem("lastSearch");
        }
        this.url="http://localhost:3000/recipes/search?query="+this.query+"&amount="+this.amount+"&cuisine="+this.cuisine+"&diet="+this.diet+"&intolerance="+intolerances;
        this.searchFlag=true;
      } 
      catch (error) {
        console.log(error);
      }
    },
    sort(){
      if(this.sortBy==='Popularity')
          this.$refs.searchResult.sortByPopularity();
      else if (this.sortBy==='Preparation time'){
        this.$refs.searchResult.sortByPreparationTime();
      }
    },
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
    }
    },
    mounted() {
    this.diets.push(...diets);
    this.cuisines.push(...cuisines);
    this.intolerances.push(...intolerances);
    this.lastSearch=sessionStorage.getItem("lastSearch");
    }
  }
</script>

<style>
.center{
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  margin-left: 25px;
}
.form{
  background: rgb(193, 219, 226);
  width: 100%;
}
.button{
    margin-left: 7%;
}
.error {
  font-size: 1.875em;
  color: red;
}
</style>
