<template>
  <div class="dashboard-layout">
    <DashboardSidebar />
    <main class="dashboard-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import DashboardSidebar from '../components/DashboardSidebar.vue';

export default {
  name: 'DashboardView',
  components: {
    DashboardSidebar,
  },
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-background);
}

.dashboard-content {
  flex-grow: 1;
  padding: var(--spacing-lg);
  overflow-y: auto; /* Enable scrolling for content */
}

.dashboard-main-title {
  font-size: var(--font-size-heading3);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xl);
  text-align: left;
  font-weight: var(--font-weight-medium);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
}

.dashboard-overview {
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

@media (max-width: 768px) {
  .overview-cards {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
}

.overview-card {
  background: linear-gradient(135deg, var(--card-background-color) 0%,
      color-mix(in srgb, var(--card-background-color) 95%, var(--color-primary) 5%)
      100%);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--card-shadow);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.overview-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.overview-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.overview-card:hover::before {
  transform: scaleX(1);
}

.card-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  flex-shrink: 0;
}

.card-content {
  flex-grow: 1;
}

.card-content h3 {
  color: var(--color-text-primary);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  margin: 0 0 var(--spacing-xs) 0;
  opacity: 0.9;
}

.card-value {
  color: var(--color-primary);
  font-size: var(--font-size-heading2);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-xs) 0;
  line-height: 1.2;
}

.card-trend {
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-medium);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.card-trend.positive {
  color: var(--color-success, #10b981);
}

.card-trend.negative {
  color: var(--color-error, #ef4444);
}

.card-trend.neutral {
  color: var(--color-text-secondary);
}

/* Child Content Styling */
.dashboard-child-content {
  background-color: var(--color-background);
  border-radius: var(--border-radius);
  min-height: 60vh;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .overview-cards, .dashboard-marker-cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 900px) {
  .dashboard-main-title {
    font-size: var(--font-size-heading2);
  }
  .overview-card {
    padding: var(--spacing-md);
  }
  .card-icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
  }
  .card-value {
    font-size: var(--font-size-heading3);
  }
}

@media (max-width: 480px) {
  .dashboard-content {
    padding: var(--spacing-md);
  }
  .overview-card {
    flex-direction: row;
    text-align: left;
  }
  .card-content h3 {
    font-size: var(--font-size-small);
  }
  .card-value {
    font-size: var(--font-size-heading4);
  }
}
</style>

