<template>
  <div class="dashboard-layout">
    <DashboardSidebar />
    <main class="dashboard-content">
      <router-view></router-view>
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
</style>