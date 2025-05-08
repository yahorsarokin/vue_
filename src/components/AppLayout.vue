<template>
  <div class="app-layout">
    <AppHeader v-model:currentTab="currentTab" />
    <main class="main-content">
      <slot :current-tab="currentTab"></slot>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AppHeader from './AppHeader.vue'

const currentTab = ref<'Todos' | 'Favorites'>('Todos')
</script>

<style scoped>
.app-layout {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-md);
}

.main-content {
  margin-top: var(--spacing-md);
}
</style>
