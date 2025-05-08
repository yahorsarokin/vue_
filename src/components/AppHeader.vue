<template>
  <header class="app-header">
    <nav>
      <a
        href="#"
        :class="{ active: currentTab === 'Todos' }"
        @click.prevent="$emit('update:currentTab', 'Todos')"
      >
        Todos
      </a>
      <a
        href="#"
        :class="{ active: currentTab === 'Favorites' }"
        @click.prevent="$emit('update:currentTab', 'Favorites')"
      >
        Favorites
      </a>
    </nav>
  </header>
</template>

<script lang="ts" setup>
defineProps<{
  currentTab: 'Todos' | 'Favorites'
}>()

defineEmits<{
  (e: 'update:currentTab', tab: 'Todos' | 'Favorites'): void
}>()
</script>

<style scoped>
.app-header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border);
  margin-bottom: var(--spacing-md);
}

nav {
  display: flex;
  gap: var(--spacing-md);
}

a {
  text-decoration: none;
  color: var(--medium);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

a:hover {
  color: var(--primary);
  background: var(--background-alt);
}

a.active {
  color: var(--primary);
  background: var(--background-alt);
  font-weight: 500;
}
</style>
