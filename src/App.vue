<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>
/* Global styles for the app container */
#app {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text-primary);
}
</style>
