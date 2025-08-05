<template>
  <div class="dashboard-home">
    <!-- Overview cards shown on the main dashboard page -->
    <div class="overview-cards">
      <div class="overview-card">
        <div class="card-icon">🌱</div>
        <div class="card-content">
          <h3>Active Projects</h3>
          <p class="card-value">{{ overviewStats.activeProjects }}</p>
          <span class="card-trend positive">↗ +2 this month</span>
        </div>
      </div>
      <div class="overview-card">
        <div class="card-icon">🏞️</div>
        <div class="card-content">
          <h3>Total Area Restored</h3>
          <p class="card-value">{{ overviewStats.totalAreaRestored }} ha</p>
          <span class="card-trend positive">↗ +320 ha this week</span>
        </div>
      </div>
      <div class="overview-card">
        <div class="card-icon">💨</div>
        <div class="card-content">
          <h3>Carbon Credits Earned</h3>
          <p class="card-value">{{ overviewStats.carbonCredits }}</p>
          <span class="card-trend positive">↗ +145 this month</span>
        </div>
      </div>
      <div class="overview-card">
        <div class="card-icon">🌡️</div>
        <div class="card-content">
          <h3>Weather Stations</h3>
          <p class="card-value">{{ overviewStats.weatherStations }}</p>
          <span class="card-trend neutral">— All active</span>
        </div>
      </div>
      <div class="overview-card">
        <div class="card-icon">🦋</div>
        <div class="card-content">
          <h3>Species Monitored</h3>
          <p class="card-value">{{ overviewStats.speciesMonitored }}</p>
          <span class="card-trend positive">↗ +12 new species</span>
        </div>
      </div>
      <div class="overview-card">
        <div class="card-icon">📊</div>
        <div class="card-content">
          <h3>Data Points Collected</h3>
          <p class="card-value">{{ overviewStats.dataPoints }}</p>
          <span class="card-trend positive">↗ +1.2K today</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'DashboardHome',
  setup() {
    const overviewStats = ref({
      activeProjects: 12,
      totalAreaRestored: '15,320',
      carbonCredits: '2,850',
      weatherStations: 8,
      speciesMonitored: '450+',
      dataPoints: '47.2K'
    });

    return {
      overviewStats
    };
  },
};
</script>

<style scoped>
.dashboard-home {
  padding: 0;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.overview-card {
  background: var(--card-background-color);
  border-radius: var(--border-radius);
  padding: var(--card-padding);
  box-shadow: var(--card-shadow);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  transition: all var(--transition-normal);
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
</style>

