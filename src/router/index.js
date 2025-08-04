import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }, // Protect this route
      children: [
        {
          path: 'map',
          name: 'live-project-map-view',
          component: () => import('../views/dashboard/LiveProjectMapView.vue'),
        },
        {
          path: 'portfolio',
          name: 'project-portfolio-dashboard',
          component: () => import('../views/dashboard/ProjectPortfolioDashboardView.vue'),
        },
        {
          path: 'weather',
          name: 'weather-station-integration',
          component: () => import('../views/dashboard/WeatherStationIntegrationView.vue'),
        },
        {
          path: 'field-data',
          name: 'field-data-tracker',
          component: () => import('../views/dashboard/FieldDataTrackerView.vue'),
        },
        {
          path: 'carbon-credit',
          name: 'carbon-credit-engine',
          component: () => import('../views/dashboard/CarbonCreditEngineView.vue'),
        },
        {
          path: 'ecosystem-health',
          name: 'ecosystem-health-index',
          component: () => import('../views/dashboard/EcosystemHealthIndexView.vue'),
        },
        {
          path: 'community',
          name: 'community-livelihood-metrics',
          component: () => import('../views/dashboard/CommunityLivelihoodMetricsView.vue'),
        },
        {
          path: 'simulator',
          name: 'scenario-simulator-ai-assistant',
          component: () => import('../views/dashboard/ScenarioSimulatorAIAssistantView.vue'),
        },
        {
          path: '', // Default child route for /dashboard
          name: 'dashboard-default', // Add a name to resolve the warning
          redirect: '/dashboard/map'
        }
      ]
    },
    {
      path: '/',
      redirect: '/login' // Redirect root to login
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.name === 'login' && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router
