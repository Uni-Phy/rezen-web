<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2 class="sidebar-title">Rezen</h2>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li v-for="tab in tabs" :key="tab.name">
          <router-link :to="tab.route" class="nav-item" active-class="active-nav-item">
            {{ tab.name }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="sidebar-footer">
      <button @click="logout" class="logout-button">Logout</button>
    </div>
  </aside>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'DashboardSidebar',
  setup() {
    const router = useRouter();
    const tabs = [
      { name: 'Live Project Map View', route: '/dashboard/map' },
      { name: 'Project Portfolio Dashboard', route: '/dashboard/portfolio' },
      { name: 'Weather Station Integration', route: '/dashboard/weather' },
      { name: 'Field Data Tracker', route: '/dashboard/field-data' },
      { name: 'Carbon Credit Engine', route: '/dashboard/carbon-credit' },
      { name: 'Ecosystem Health Index', route: '/dashboard/ecosystem-health' },
      { name: 'Community & Livelihood Metrics', route: '/dashboard/community' },
      { name: 'Scenario Simulator & AI Assistant', route: '/dashboard/simulator' },
    ];

    const logout = () => {
      localStorage.removeItem('isAuthenticated');
      router.push('/login');
    };

    return {
      tabs,
      logout,
    };
  },
};
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--card-background-color);
  color: var(--color-text-primary);
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
  box-shadow: var(--card-shadow);
  min-height: 100vh;
}

.sidebar-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.sidebar-title {
  font-size: var(--font-size-heading2);
  color: var(--color-primary);
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin-bottom: var(--spacing-sm);
}

.nav-item {
  display: block;
  padding: var(--spacing-md);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-item:hover {
  background-color: rgba(var(--color-primary), 0.1); /* Needs CSS variable for primary color */
  color: var(--color-primary);
}

.active-nav-item {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.sidebar-footer {
  margin-top: auto; /* Pushes the footer to the bottom */
  padding-top: var(--spacing-lg);
  border-top: 1px solid #333;
  text-align: center;
}

.logout-button {
  background-color: transparent;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--button-primary-border-radius);
  cursor: pointer;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 100%;
}

.logout-button:hover {
  background-color: var(--color-accent);
  color: var(--color-background);
}
</style>