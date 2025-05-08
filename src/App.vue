<template>
  <AppLayout v-slot="{ currentTab }">
    <component :is="currentTab === 'Todos' ? TodosView : FavoritesView" />
  </AppLayout>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useTodoStore } from './stores/todo'
import AppLayout from './components/AppLayout.vue'
import TodosView from './views/TodosView.vue'
import FavoritesView from './views/FavoritesView.vue'
import { signInAnon } from './firebase'

const store = useTodoStore()

onMounted(() => {
  signInAnon()
  store.loadFromFirestore()
})

onUnmounted(() => {
  store.cleanup()
})
</script>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-md);
}

main {
  margin-top: var(--spacing-md);
}

.filters button {
  padding: var(--spacing-xs) var(--spacing-md);
}

.filters button.active {
  background-color: var(--primary-dark);
  box-shadow: var(--shadow-sm);
}
</style>
