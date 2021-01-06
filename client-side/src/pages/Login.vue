<template>
  <div>
  <div class="container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group class="label"
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input  class="input"
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="label"
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input  class="input"
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Login</b-button
      >
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
  <p class="space"></p>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        let username= this.form.username;
        let password=  this.form.password;
        const response = await this.axios.post(
          "http://localhost:3000/login",
          {
            username: username,
            password: password
          }
        );
        // axios.get('some api url', {withCredentials: true});
        // console.log(response);
        // this.$root.loggedIn = true;
        if(response.data.success == true){
          this.$root.store.login(username);
          this.$router.push("/").catch(()=>{});
        }
       
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.Login();
    }
  }
};
</script>

<style scoped>
body {
  margin: 20px;
  padding: 20px;
  background-color: #17a2b8;
  height: 100vh;
}
.input {
  padding: 3px;
  width: 50%;
  position: relative;
  display: block;
}
.label {
padding: 3px;
position: relative;
display: block;
text-align: left;
margin-left: 5%;
font-size: 1.275em;
}
.container {
  width: 35% ;
  border: 3px solid #aad3d8;
  background-color: #c5eaee;
  position: relative;
  display: block;
  justify-content: center;
  margin-top: 5%;
  height: 100%;
  max-width: 500px;

}

</style>
