import { createStore } from 'vuex'
import axios from 'axios';
import router from '@/router';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
export default createStore({
  state: {
    isAuthenticatedUser: (localStorage.getItem("token")) ? true : false,
    apiURL: 'http://localhost:8000/api',
    backendURL: 'http://localhost:8000/',
    userInfo: [],
    posts: [],
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticatedUser,
    apiURL: (state) => state.apiURL,
    backendURL: (state) => state.backendURL,
    userInfo: (state) => state.userInfo,
    posts: (state) => state.posts,
  },
  mutations: {
    handleSetUserInfo(state, payload) {
      state.userInfo = payload;
    },
    handlePosts(state, payload) {
      state.posts = payload;
    },
  },
  actions: {

    async login({ commit, getters }, data) {
      var validated = await data.v$.$validate()

      if (validated) {
        const postData = data.state;
        await axios.post(
          getters.apiURL + '/userlogin', postData
        )
          .then(response => {
            localStorage.setItem("token", response.data.data.token);
            toastr.success(response.data.message, { timeOut: 1000 });
            router.push('/dashboard');
          })
          .catch(error => {
            if (error.response.status == 400) {
              toastr.error(error.response.data.message, { timeOut: 1000 })
            } else {
              toastr.error("Something Went Wrong", { timeOut: 1000 });
            }
          });
      }
    },

    async register({ commit, getters }, data) {
      var validated = await data.v$.$validate()
      if (validated) {
        const postData = data.state;

        await axios.post(
          getters.apiURL + '/userregister', postData

        ).then(response => {
          toastr.success(response.data.message, { timeOut: 1000 });
          router.push('/');

        }).catch(error => {
          if (error.response.status == 400) {
            toastr.error(error.response.data.error, { timeOut: 1000 });
          } else {
            toastr.error("Something Went Wrong", { timeOut: 1000 });
          }
        });
      }
    },

    async resetRequest({ commit, getters }, data) {

      var validated = await data.v$.$validate()
      if (validated) {
        const postData = data.state;

        await axios.post(
          getters.apiURL + '/forgotpassword', postData
        )
          .then(response => {
            toastr.success(response.data.message, { timeOut: 1000 });
            router.push('/');
          })
          .catch(error => {
            if (error.response.status == 400) {
              toastr.error(error.response.data.message, { timeOut: 1000 });
            } else {
              toastr.error("Something Went Wrong", { timeOut: 1000 });
            }
          });
      }
    },

    async changePassword({ commit, getters }, data) {

      var validated = await data.v$.$validate()
      if (validated) {
        const postData = data.state;

        await axios.post(
          getters.apiURL + '/resetpassword', postData

        ).then(response => {
          toastr.success(response.data.message, { timeOut: 1000 });
          router.push('/');

        }).catch(error => {
          if (error.response.status == 400) {
            toastr.error(error.response.data.message, { timeOut: 1000 });
          } else {
            toastr.error("Something Went Wrong", { timeOut: 1000 });
          }
        });
      }


    },
    async getuserdata({ commit, getters }, data) {

      let token = localStorage.getItem("token");
      const postData = {};

      await axios.post(
        getters.apiURL + '/getuser', postData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }

      ).then(response => {
        commit('handleSetUserInfo', response.data.infoData[0].user);
        commit('handlePosts', response.data.infoData[0].posts);
      })
        .catch(error => {
          if (error.response.status == 400) {
          } else {
            toastr.error("Something Went Wrong", { timeOut: 1000 });
          }
        });
    },
  },
  modules: {
  }
})
