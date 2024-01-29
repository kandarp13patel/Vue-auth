<template>
  <div class="login">
    <div class="card">
      <Logo class="center" />
      <div class="toregister">
        <h2>Password Reset Request</h2>
        <span>Have an Account?</span><span><router-link to="/"> Login</router-link></span>
      </div>
      <form>
        <div class="email">
          <label htmlFor="email">Email</label><br>
          <input type="email" placeholder="  smith@gmail.com" name="email" class="emailinput" @blur="v$.email.$touch"
            v-model="state.email" />

          <small class="validation-error">
            <span v-if="v$.email.$error">*
              {{ v$.email.$errors[0].$message }}
            </span>
          </small>
        </div>
        <div class="submitbutton">
          <Button @click="resetRequest({ state, v$ })" type="button" class="sbutton">Submit Reset Request</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Logo from '../components/Common/Logo.vue'
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { reactive } from 'vue';
import { mapActions } from 'vuex';

export default {
  components: { Logo },

  setup() {
    let state = reactive({
      email: "",
    })

    const rules = {
      email: { required, email },
    }

    let v$ = useVuelidate(rules, state)
    return {
      state,
      v$,
    }
  },


  methods: {
    ...mapActions(['resetRequest']),
  },

}
</script>
  