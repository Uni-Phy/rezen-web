<template>
  <div class="page-container">
    <header class="page-header" v-if="title">
      <h1 class="page-title">{{ title }}</h1>
      <p class="page-subtitle" v-if="subtitle">{{ subtitle }}</p>
    </header>
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTemplate',
  props: {
    title: {
      type: String,
      required: false
    },
    subtitle: {
      type: String,
      required: false
    }
  }
};
</script>

<style scoped>
.page-container {
  padding: 0;
  background-color: var(--color-background);
  min-height: calc(100vh - var(--spacing-3xl));
}

.page-header {
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border);
}

.page-title {
  font-size: var(--font-size-heading2);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-sm) 0;
  letter-spacing: -0.02em;
  line-height: var(--line-height-tight);
}

.page-subtitle {
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-normal);
}

.page-content {
  /* Content styling handled by child components */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .page-container {
    padding: var(--spacing-md);
  }
  
  .page-title {
    font-size: var(--font-size-heading3);
  }
  
  .page-header {
    margin-bottom: var(--spacing-xl);
    padding-bottom: var(--spacing-lg);
  }
}
</style>
