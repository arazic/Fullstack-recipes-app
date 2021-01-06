<template>
  <div class="register">
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group class="label"
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input class="input"
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username must contains only letters
        </b-form-invalid-feedback>
      </b-form-group>
      <div class="login">
        You have an account already?
      <router-link to="/Login"> Login here</router-link>
      </div>
      <b-form-group class="label"
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input class="input"
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long,
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.checkPassword"
        >
          Have a digit and special character ,
        </b-form-invalid-feedback>

      </b-form-group>

      <b-form-group class="label"
        id="input-group-confirmation_password"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmation_password"
      >
        <b-form-input class="input"
          id="confirmation_password"
          type="password"
          v-model="$v.form.confirmation_password.$model"
          :state="validateState('confirmation_password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmation_password.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmation_password.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="label"
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select class="input"
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>
       <b-form-group class="label"
        id="input-group-first_name"
        label-cols-sm="3"
        label="First name:"
        label-for="first_name"
      >
        <b-form-input class="input"
          id="first_name"
          type="text"
          v-model="$v.form.first_name.$model"
          :state="validateState('first_name')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.first_name.required">
          First name is required
        </b-form-invalid-feedback>
      </b-form-group>

       <b-form-group class="label"
        id="input-group-last_name"
        label-cols-sm="3"
        label="Last name:"
        label-for="last_name"
      >
        <b-form-input class="input"
          id="last_name"
          type="text"
          v-model="$v.form.last_name.$model"
          :state="validateState('last_name')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.last_name.required">
          Last name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group class="label"
        id="input-group-profile-profile_image_url"
        label-cols-sm="3"
        label="Picture url:"
        label-for="profile_image_url"
      >
        <b-form-input class="input"
          id="profile_image_url"
          type="text"
          v-model="$v.form.profile_image_url.$model"
        ></b-form-input>
      </b-form-group>
      
      <b-form-group class="label"
        id="input-group-email"
        label-cols-sm="3"
        label="Email address:"
        label-for="email"
      >
        <b-form-input class="input"
          id="email"
          v-model="$v.form.email.$model"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger" class="button">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="button"
        >Register</b-button
      >

    </b-form>
    <b-alert
      class="alert"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";
import {
  checkPassword
} from "../functions/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        first_name: "",
        last_name: "",
        country: null,
        password: "",
        confirmation_password: "",
        email: "",
        profile_image_url: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        checkPassword
      },
      confirmation_password: {
        required,
        sameAsPassword: sameAs("password")
      },
      first_name: {
        required
      },
      last_name: {
        required
      },
      email: {
        required
      },
      profile_image_url: {
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        this.form.submitError=''
        const response = await this.axios.post(
          "http://localhost:3000/register",
          {
            username: this.form.username,
            password: this.form.password,
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            email: this.form.email,
            profile_picture: this.form.profile_image_url,
            country: this.form.country,
          }
        );
        this.$router.push("/Login").catch(()=>{});
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        first_name: "",
        last_name: "",
        country: null,
        password: "",
        confirmation_password: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>

<style scoped>
.input {
  padding: 3px;
  width: 40%;
  position: relative;
  margin-left: 3%;
  margin-right: 1%
}
.label {
padding: 3px;
position: relative;
display: flex;
color:cornsilk;
text-align: left;
margin-left: 5%;
margin-right: 1%;
font-size: 1.275em;
vertical-align: middle;
}
.register{
  margin-top: 3%;
  margin-bottom: 3%;
  margin-right: 3%;
  margin-left: 5%;
  position: relative;
  display: flex;
  font-size: 1.175em;
  height: 100%;
  max-width: 500px;
}
.button {
  margin: 3% 3% 2% 3%;
  width: 20%;
  position: relative;
  display: inline-flex;
}
.login {
  padding: 3px;
  padding-bottom: 15px;
  position: absolute;
  display: inline-flex;
  color:cornsilk;
  text-align: left;
  margin-left: 70%;
  margin-bottom: auto;
  font-size: 1.475em;
  width: 80%;
}
 .alert {
   width: 50%;
   height: 20%;
   position: absolute;
   display: flex;
   margin-left: 75%;
   margin-right: auto;
   margin-top: 50%;
   padding-right: 25px;
 }
</style>

