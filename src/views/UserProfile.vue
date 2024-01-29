<template>
    <div class="main-container">
        <div class="container">
            <div class="user-container">
                <div class="user-image">
                    <img src="../assets/images/profile.jpeg" alt="user image">
                </div>

                <div class="user-bio">
                    <div class="user-name">{{ userInfo.name }}</div>
                    <label class="user-label">
                     Bio
                    </label><br>
                    <span class="userbio-desc">
                        {{ userInfo.bio }}
                    </span>
                </div>

                <div class="user-contact">
                    <div>
                        <label class="user-label">Phone</label><br>
                        <a href="tel:" class="contact-link">{{ userInfo.phone_number }}</a>
                    </div>
                    <div>
                        <label class="user-label">Email</label><br>
                        <a href="mailto:" class="contact-link">{{ userInfo.email }}</a>
                    </div>
                </div>
            </div>
            <div class="cards-maincontainer">
                <div class="card-container" v-for="posItem in posts">
                    <CardFrame  :post="posItem" />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import CardFrame from '@/components/CardFrame.vue';
import { mapActions, mapGetters } from 'vuex';
import router from '@/router';


export default {
    components: { CardFrame },
    computed: {
        ...mapGetters(['userInfo', 'posts', ''])
    },
    methods: {
        ...mapActions(['getuserdata']),
    },

    mounted() {
        this.getuserdata().then(() => {

            console.log('User Data:', this.userInfo);
            console.log('Posts:', this.posts);
        });

    },
}
</script>

<style scoped>
.main-container {
    background-color: beige;
    padding-top: 1.5%;
}

.container {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
}

.cards-maincontainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 
}

.card-container {
    box-sizing: border-box;
    width: calc(33.33% - 10px);
    margin-bottom: 10px;
}

.user-container {
    display: flex;
    background-color: #ffffff;
    border-radius: 7px;
    height: 105px;
    overflow: hidden;
}

.user-image {
    flex: 20%;
    position: relative;
}

img {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 90px;
    border-radius: 50%;
}

.user-bio {
    flex: 60%;
    margin: auto;
}

.user-contact {
    flex: 20%;
    margin: auto;
    padding-left: 10px;

}

.contact-link {
    font-size: 15px;
    color: rgb(216, 100, 135);
}

.user-name {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 5px;
}

.user-label {
    font-size: 12px;
    font-weight: 700;
    color: #9e9797;
}

.userbio-desc {
    margin-top: 1px;
    color: #9e9797;
    font-size: 13px;
    padding-right: 5px;
    padding-bottom: 3px;
}
</style>