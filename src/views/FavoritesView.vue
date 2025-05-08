<template>
  <div class="favorites-view">
    <h1 class="text-center mb-lg">Favorite Todos</h1>

    <div class="card">
      <div v-if="favoriteTodos.length === 0" class="empty-state">
        <p>No favorite todos yet</p>
        <p class="text-medium">Click the star icon next to a todo to add it to favorites</p>
      </div>

      <div v-else class="todo-list">
        <TodoItem
          v-for="todo in favoriteTodos"
          :key="todo.id"
          :todo="todo"
          @delete="store.deleteTodo"
          @toggle="store.toggleTodo"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTodoStore } from '../stores/todo'
import { useFavorites } from '../composables/useFavorites'
import TodoItem from '../components/TodoItem.vue'

const store = useTodoStore()
const { favoriteTodos, toggleFavorite } = useFavorites()
</script>

<style scoped>
.favorites-view {
  padding: var(--spacing-md);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--medium);
}

.text-medium {
  font-size: 0.9em;
  margin-top: var(--spacing-sm);
}
</style>
