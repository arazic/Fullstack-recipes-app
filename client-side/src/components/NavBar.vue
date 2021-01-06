<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item >
          <b-navbar-brand  v-if="$root.store.username">   Hello {{$root.store.username}}</b-navbar-brand>
          <b-navbar-brand  v-else>   Hello guest </b-navbar-brand>
          </b-nav-item>
        <b-nav-item ><router-link :to="{ name: 'Home' }">Home</router-link></b-nav-item>
        <b-nav-item ><router-link :to="{ name: 'Search' }">Search</router-link></b-nav-item>
        <b-nav-item ><router-link :to="{ name: 'About' }">About</router-link></b-nav-item>
        
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" type="dark">
        <b-nav-item ><router-link v-if="!$root.store.username"  :to="{ name: 'Register' }" right>Register</router-link></b-nav-item>
        <b-nav-item ><router-link v-if="!$root.store.username" :to="{ name: 'Login' }" right>Login</router-link></b-nav-item>
        <b-nav-item ><a href="#"  v-if="$root.store.username"  @click="logout()">Logout</a></b-nav-item>
        <b-nav-item-dropdown v-if="$root.store.username" text="Profile" right>
        <b-dropdown-item ><router-link :to="{ name: 'Personal' }" right>Personal recipes</router-link></b-dropdown-item>
        <b-dropdown-item ><router-link :to="{ name: 'Family' }" right>Family recipes</router-link></b-dropdown-item>
        <b-dropdown-item ><router-link :to="{ name: 'Favorites' }" right>Favorites recipes</router-link></b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        sessionStorage.removeItem('lastSearch');
        this.$root.store.logout();
        const response = await this.axios.get(
          "http://localhost:3000/logout");
        this.$root.toast("Logout", "User logged out successfully", "success");
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
      catch (error)
      {
        console.log(error);
      }
    }
  }
}
</script>

<style>

</style>