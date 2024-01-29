<template>
  <div class="login">
    <div class="card">
      <Logo class="center" />
      <div class="toregister">
        <h2>Register your account</h2>
        <span>Have an Account?</span><span><router-link to="/"> Login</router-link></span>
      </div>

      <form>
        <div class="register mtop">
          <div class="registerinput">
            <label htmlFor="name">Name</label><br>
            <input type="text" placeholder="  Full Name" name="name" class="emailinput" v-model="state.name"
              @blur="v$.name.$touch" />
            <small class="validation-error">
              <span v-if="v$.name.$error">*
                {{ v$.name.$errors[0].$message }}
              </span>
            </small>
          </div>

          <div class="registerinput">
            <label htmlFor="email">Email</label><br>
            <input type="email" placeholder="  smith@gmail.com" name="email" class="emailinput" v-model="state.email"
              @blur="v$.email.$touch" />
            <small class="validation-error">
              <span v-if="v$.email.$error">*
                {{ v$.email.$errors[0].$message }}
              </span>
            </small>
          </div>
        </div>

        <div class="register">
          <div class="registerinput">
            <label htmlFor="phone">Phone Number</label><br>
            <input type="tel" placeholder="Phone Number" name="phone_number" class="emailinput" accept="number"
              v-model="state.phone_number" @blur="v$.phone_number.$touch" />
            <small class="validation-error">
              <span v-if="v$.phone_number.$error">*
                {{ v$.phone_number.$errors[0].$message }}
              </span>
            </small>
          </div>
          <div class="registerinput">
            <label htmlFor="bio">Bio</label><br>
            <input type="text" placeholder="  Bio" name="bio" class="emailinput" v-model="state.bio" />

          </div>
        </div>

        <div class="register">
          <div class="registerinput w-50">
            <label htmlFor="password">Password</label><br>
            <input :type="showPassword ? 'text' : 'password'" placeholder="  *********" name="password"
              class="emailinput" v-model="state.password" @blur="v$.password.$touch" />
            <span v-if="!showPassword" class="icon is-small is-right iconSpan" @click="toggleShow">
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

          <div class="registerinput w-50">
            <label htmlFor="password_confirmation">Confirm Password</label><br>
            <input :type="showPasswordConfirm ? 'text' : 'password'" placeholder="  *********" name="password_confirmation"
              class="emailinput" v-model="state.password_confirmation" @blur="v$.password_confirmation.$touch" />
            <span v-if="!showPasswordConfirm" class="icon is-small is-right iconSpan" @click="toggleShowConfirm">
              <i class="fas fa-eye"></i>
            </span>
            <span v-if="showPasswordConfirm" class="icon is-small is-right iconSpan" @click="toggleShowConfirm">
              <i class="fas fa-eye-slash"></i>
            </span>
            <small class="validation-error">
              <span v-if="v$.password_confirmation.$error">*
                {{ v$.password_confirmation.$errors[0].$message }}
              </span>
            </small>
          </div>
        </div>

        <div class="submitbutton">
          <Button type="button" @click="register({ state, v$ })" class="sbutton">Register</Button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import Logo from '../components/Common/Logo.vue'
import useVuelidate from "@vuelidate/core";
import { required, minLength, email, sameAs } from "@vuelidate/validators";
import { computed, reactive } from 'vue';
import { mapActions } from 'vuex';


export default {
  name: 'Register',
  components: { Logo },

  data() {
    return {
      showPassword: false,
      showPasswordConfirm: false
    };
  },
  setup() {
    let state = reactive({
      name: "",
      email: "",
      phone_number: "",
      bio: "",
      password: "",
      password_confirmation: ""
    })

    const rules = computed(() => {
      return {
        name: { required },
        email: { required, email },
        phone_number: { required },

        password: { required, minLength: minLength(6) },
        password_confirmation: { required, sameAs: sameAs(state.password) }

      }

    })

    let v$ = useVuelidate(rules, state)
    return {
      state,
      v$,
    }
  },

  methods: {
    ...mapActions(['register']),
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    toggleShowConfirm() {
      this.showPasswordConfirm = !this.showPasswordConfirm;
    }
  },

}
</script>

<style>
.register {
  display: flex;
}

.registerinput {
  margin: 5px 10px;
}

.mtop {
  margin-top: 10px;
}
.w-50{
  width: 50%;
}
</style>