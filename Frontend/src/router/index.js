import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import UserSettingsView from '@/views/UserSettingsView.vue'
import ProjectsOverviewView from '@/views/ProjectsOverviewView.vue'
import TemplatesView from '@/views/TemplatesView.vue'
import TopRestaurantsView from '@/views/TopRestaurantsView.vue'
import CreateProjectView from '@/views/CreateProjectView.vue'
import RegisterView from '@/views/RegisterView.vue'
import Step01Register from '@/components/register-steps/Step01Register.vue'
import Step02Register from '@/components/register-steps/Step02Register.vue'
import Step03Register from '@/components/register-steps/Step03Register.vue'
import NewsletterView from '@/views/NewsletterView.vue'
import WebsiteView from '@/views/WebsiteView.vue'
import ChangePlanView from '@/views/ChangePlanView.vue'
import ConfirmPlanChangeView from '@/views/ConfirmPlanChangeView.vue'
import AboutPage from '@/views/footer-links/AboutPage.vue'
import LegalPage from '@/views/footer-links/LegalPage.vue'
import ContactPage from '@/views/footer-links/ContactPage.vue'
import ReservationsView from '@/views/ReservationsView.vue'

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
      path: '/dashboard/:projectId',
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
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      children: [
        { path: '', redirect: '/register/step-1' }, // default and tought by ChatGPT
        { path: 'step-1', name: 'register-step1', component: Step01Register },
        { path: 'step-2', name: 'register-step2', component: Step02Register },
        { path: 'step-3', name: 'register-step3', component: Step03Register },
      ],
    },
    {
      path: '/:id/newsletter',
      name: 'newsletter',
      component: NewsletterView,
    },
    {
      path: '/change-plan',
      name: 'change-plan',
      component: ChangePlanView
    },
    {
      path: '/change-plan/confirm',
      name: 'change-plan-confirm',
      component: ConfirmPlanChangeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
    {
      path: '/legal',
      name: 'legal',
      component: LegalPage,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
    },
    {
      path: '/restaurant/:route',
      name: 'restaurant',
      component: WebsiteView
    },
    {
      path: '/:id/reservations',
      name: 'reservations',
      component: ReservationsView,
    },
  ],
})

export default router
