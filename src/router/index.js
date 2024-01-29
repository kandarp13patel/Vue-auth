import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ChangePassword from '../views/ChangePassword.vue'
import ResetRequest from '../views/ResetRequest.vue'
import UserProfile from '../views/UserProfile.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/forgotpassword',
    name: 'forgotpassword',
    component: ForgotPassword
  },
  {
    path: '/changepassword/:token',
    name: 'changepassword',
    component: ChangePassword
  },
  {
    path: '/resetrequest',
    name: 'resetrequest',
    component: ResetRequest
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: UserProfile,
    meta: { requiresAuth: true }
  },
  { path: '/:catchAll(.*)', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");

  if (to.path === '/' && isAuthenticated) {
    next('/dashboard');
  } else if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router
