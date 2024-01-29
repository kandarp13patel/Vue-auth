<template>
    <div class="login">
        <div class="card">
            <Logo class="center" />
            <div class="toregister">
                <h2>Forgot Your Password? </h2>
                <p>If you have requested to forgot password, <br /> please continue with the code below.</p>
            </div>
            <div>
                <h3 class="center">
                    M2W3E4
                </h3>
            </div>
            <div class="submitbutton">
                <Button type="submit" class="sbutton">Reset Password</Button>
            </div>
            <div class="center bottomsmall">
                <small>This link will expire after 24h.</small>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '../components/Common/Logo.vue'
export default {
    name: 'Login',
    components: { Logo }
}
</script>

<style>
.bottomsmall{
    margin-top: 12px;
}
</style>