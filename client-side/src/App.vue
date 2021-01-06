<template>
<div class="back">
  <div id="app">
    <NavBar ref="navBar" /> 
     <router-view v-on:unauthorized="transferToLogin" />
  </div>
</div>
</template>

<script>
import NavBar from "./components/NavBar"
export default {
  name: "App",
  components: {
    NavBar
  },
  methods: {
    transferToLogin (){
      this.$root.toast("Session expired", "User need to login first", "Danger");
      this.$refs.navBar.logout();
    }
  }
};
</script>

<style >
.back{
  background-image: url("./assets/back_g.jpg");
  height: auto; /* You must set a specified height */
  width: auto;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  height: 100%;
   background-attachment: fixed;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
 }
</style>
