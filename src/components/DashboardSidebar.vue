<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="brand">
        <div class="brand-icon">🌱</div>
        <h2 class="sidebar-title">Rezen</h2>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section">
        <span class="nav-section-title">Dashboard</span>
        <ul>
          <li v-for="tab in tabs" :key="tab.name">
            <router-link :to="tab.route" class="nav-item" active-class="active-nav-item">
              <span class="nav-icon">{{ tab.icon }}</span>
              <span class="nav-text">{{ tab.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="sidebar-footer">
      <button @click="logout" class="logout-button">
        <span class="logout-icon">↗</span>
        Logout
      </button>
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
      { name: 'Map View', route: '/dashboard/map', icon: '🗺️' },
      { name: 'Portfolio', route: '/dashboard/portfolio', icon: '📊' },
      { name: 'Weather', route: '/dashboard/weather', icon: '🌡️' },
      { name: 'Field Data', route: '/dashboard/field-data', icon: '📋' },
      { name: 'Carbon Credits', route: '/dashboard/carbon-credit', icon: '💨' },
      { name: 'Ecosystem Health', route: '/dashboard/ecosystem-health', icon: '🌿' },
      { name: 'Community', route: '/dashboard/community', icon: '👥' },
      { name: 'AI Assistant', route: '/dashboard/simulator', icon: '🤖' },
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
  background: linear-gradient(180deg, var(--color-background-secondary) 0%, var(--color-surface) 100%);
  border-right: 1px solid var(--color-border);
  color: var(--color-text-primary);
  display: flex;
  flex-direction: column;
  padding: 0;
  min-height: 100vh;
  position: relative;
}

.sidebar-header {
  padding: var(--spacing-xl) var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--spacing-lg);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  justify-content: center;
}

.brand-icon {
  font-size: 1.5rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sidebar-title {
  font-size: var(--font-size-heading3);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
  letter-spacing: -0.02em;
}

.sidebar-nav {
  flex: 1;
  padding: 0 var(--spacing-lg);
  overflow-y: auto;
}

.nav-section {
  margin-bottom: var(--spacing-xl);
}

.nav-section-title {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--spacing-md);
  display: block;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin-bottom: var(--spacing-xs);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  transition: all var(--transition-fast);
  position: relative;
  margin: 0 calc(-1 * var(--spacing-lg));
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: var(--color-primary);
  border-radius: 0 2px 2px 0;
  transition: height var(--transition-fast);
}

.nav-item:hover {
  background-color: rgba(76, 175, 80, 0.08);
  color: var(--color-primary);
  transform: translateX(2px);
}

.nav-item:hover::before {
  height: 20px;
}

.nav-icon {
  font-size: 1.125rem;
  flex-shrink: 0;
  opacity: 0.8;
  transition: opacity var(--transition-fast);
}

.nav-text {
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
}

.active-nav-item {
  background: linear-gradient(90deg, rgba(76, 175, 80, 0.15), rgba(76, 175, 80, 0.05));
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  transform: translateX(2px);
}

.active-nav-item::before {
  height: 24px;
}

.active-nav-item .nav-icon {
  opacity: 1;
}

.sidebar-footer {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.logout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.logout-button:hover {
  background: rgba(255, 107, 107, 0.1);
  border-color: var(--color-error);
  color: var(--color-error);
  transform: translateY(-1px);
}

.logout-icon {
  font-size: 1rem;
  transition: transform var(--transition-fast);
}

.logout-button:hover .logout-icon {
  transform: rotate(45deg);
}

/* Scrollbar styling */
.sidebar-nav::-webkit-scrollbar {
  width: 4px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 2px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-hover);
}
</style>
