import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import Step01Register from '@/components/register-steps/Step01Register.vue'
import Step02Register from '@/components/register-steps/Step02Register.vue'
import Step03Register from '@/components/register-steps/Step03Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,

    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      children: [
        { path: "", redirect: "/register/step-1" }, // default and tought by ChatGPT
        { path: "step-1", name: "register-step1", component: Step01Register },
        { path: "step-2", name: "register-step2", component: Step02Register },
        { path: "step-3", name: "register-step3", component: Step03Register },
      ]
    },
  ],
})

export default router
