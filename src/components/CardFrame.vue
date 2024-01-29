<template>
  <div class="post-main">
    <div class="post-content">

      <div class="post-header">
        <img :src="backendURL + post.img" />
        <h3 class="title">{{ post.title }}</h3>
      </div>
      <div class="postdesc-date">
        <div class="post-content">
        {{ post.description }}
      </div>
      <div class="post-date text-right">
        {{ post.date }}
      </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "CardFrame",
  props: {
    post: {
      type: Object,
    },

  },
  computed: {
    ...mapGetters(['backendURL'])
  },
}
</script>

<style scoped>
.post-main {
  background-color: #f0f0f0;
  box-sizing: border-box;
  margin-right: 10px;
  margin-top: 15px;
}

.post-content {
  background: #fff;
  border-radius: 7px;
  overflow: hidden;
}

.title {
  position: absolute;
  bottom: -5px;
  left: 13px;
  color: #ffffff;
}

.post-header {
  height: 150px;
  position: relative;
  text-align: center;
}

.post-header img {
  max-width: 100%;
  height: auto;
  display: block;
  height: 100%;
}

.post-date {
  margin: 5px 10px;
  text-align: right;
}
.postdesc-date{
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  font-size: small;
  margin-top: 7px;
}
</style>