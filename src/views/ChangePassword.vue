<template>
    <div class="login">
        <div class="card">
            <Logo class="center" />
            <div class="toregister">
                <h2>Change Password</h2>
                <span>use the reset code sent to your inbox</span>
            </div>
            <form>
                <div class="email">
                    <label htmlFor="code">Reset Code</label><br>
                    <input type="text" placeholder="A1B2C3" name="code" class="emailinput" v-model="state.code"
                        @blur="v$.code.$touch" />
                    <small class="validation-error">
                        <span v-if="v$.code.$error">*
                            {{ v$.code.$errors[0].$message }}
                        </span>
                    </small>
                </div>
                <div class="email">
                    <label htmlFor="password">Password</label><br>
                    <input :type="showPassword ? 'text' : 'password'" placeholder="Enter password..." name="password"
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
                <div class="email">
                    <label htmlFor="confirmpassword">Confirm Password</label><br>
                    <input :type="showPasswordConfirm ? 'text' : 'password'" placeholder="Enter password..." name="confirmpassword"
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
                <div class="submitbutton">
                    <Button type="button" @click="changePassword({ state, v$ })" class="sbutton">Change Password</Button>
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
    components: { Logo },
    data() {
        return {
            showPassword: false,
            showPasswordConfirm: false
        };
    },
    setup() {
        let state = reactive({
            code: "",
            password: "",
            password_confirmation: "",
            token: window.location.pathname.split('/')[2]
        })

        const rules = computed(() => {
            return {
                code: { required },
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
        ...mapActions(['changePassword']),
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
        
    toggleShowConfirm() {
      this.showPasswordConfirm = !this.showPasswordConfirm;
    }
    },

}
</script>

<style></style>