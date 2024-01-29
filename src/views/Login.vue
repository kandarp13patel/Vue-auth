<template>
  <div class="login">
    <div class="card">
      <Logo class="center" />
      <div class="toregister">
        <h2>Login to your account</h2>
        <span>Don't have an Account?</span><span><router-link to="/register"> Create an Account</router-link></span>
      </div>
      <form>
      <div class="email">
        <label htmlFor="email">Email</label><br>
        <input type="email" placeholder="   smith@gmail.com" name="email" class="emailinput" @blur="v$.email.$touch"
          v-model="state.email" />
        <small class="validation-error">
          <span v-if="v$.email.$error">*
            {{ v$.email.$errors[0].$message }}
          </span>
        </small>
      </div>
      <div class="email">
        <label htmlFor="password">Password</label><br>
        <input  :type="showPassword ? 'text' : 'password'"  placeholder="  *************" name="password" class="emailinput" @blur="v$.password.$touch"
          v-model="state.password" />
          <span  v-if="!showPassword" class="icon is-small is-right iconSpan" @click="toggleShow">
           <i class="fas fa-eye"></i>
        </span>
        <span v-if="showPassword" class="icon is-small is-right iconSpan" @click="toggleShow">
           <i class="fas fa-eye-slash"></i>
        </span>
        <small class="validation-error">
          <span v-if="v$.password.$error">*
            {{ v$.password.$errors[0].$message }}
          </span>
        </small>
      </div>
      <div class="forgotpassword">
        <router-link to="/resetrequest" class="forgot-psw">Forgot password?</router-link>
      </div>
      <div class="submitbutton">
        <button type="button" @click="login({state, v$})" class="sbutton">Login</button>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
import Logo from '../components/Common/Logo.vue'
import useVuelidate from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
import { computed, reactive } from 'vue';
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  components: { Logo },
  data() {
     return {
      showPassword: false
     };
  },
  setup() {
    let state = reactive({
      email: "",
      password: ""
    })

    const rules = {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    }

    let v$ = useVuelidate(rules, state)
    return {
      state,
      v$,
    }
  },

  methods: {
    ...mapActions(['login']),
    
    toggleShow() {
      this.showPassword = !this.showPassword;
    }    
  },


}
</script>

<style>
.center {
  text-align: center;
}
button{
  cursor: pointer;
}

.card {
  background-color: white;
  padding: 30px 50px;
  border-radius: 5px;
  width: 30%;
}

.toregister {
  font-size: small;
  text-align: center;
}

a {
  text-decoration: none;
  color: #e7463b;
}

.email {
  margin-top: 15px;
}

.emailinput {
  margin-top: 6px;
  width: 100%;
  height: 30px;
  border: 1px solid black;
  border-radius: 4px;
}

.forgotpassword {
  margin-top: 15px;
  font-size: small;
}

.submitbutton {
  text-align: center;
  margin-top: 20px;
}

.sbutton {
  padding: 10px 17px;
  color: white;
  background-color: #ff6c61;
  border: none;
  border-radius: 5px;
}
.validation-error{
  color: red;
}

.iconSpan {
        float: right;
        margin-right: 6px;
        margin-top: -24px;
        position: relative;
        z-index: 2;
        cursor: pointer;
}
</style>