import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import UserSettingsView from '../views/UserSettingsView.vue'
import ProjectsOverviewView from '../views/ProjectsOverviewView.vue'
import TemplatesView from '../views/TemplatesView.vue'
import TopRestaurantsView from '@/views/TopRestaurantsView.vue'
import CreateProjectView from '@/views/CreateProjectView.vue'

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
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/user-settings',
      name: 'user-settings',
      component: UserSettingsView,
    },
    {
      path: '/projects-overview',
      name: 'projects-overview',
      component: ProjectsOverviewView,
    },
    {
      path: '/templates',
      name: 'templates',
      component: TemplatesView,
    },
    {
      path: '/top-restaurants',
      name: 'top-restaurants',
      component: TopRestaurantsView,
    },
    {
      path: '/create-project',
      name: 'create-project',
      component: CreateProjectView,
    },
  ],
})

export default router
