<template>
  <main>
    <h1>Todo List</h1>
    <CreateTodo @add="store.addTodo" />

    <div class="filters">
      <button @click="store.setFilter('all')">All</button>
      <button @click="store.setFilter('active')">Active</button>
      <button @click="store.setFilter('completed')">Completed</button>
    </div>

    <TodoList :todos="store.filteredTodos" @delete="store.deleteTodo" @toggle="store.toggleTodo" />
  </main>
</template>

<script lang="ts" setup>
import { useTodoStore } from './stores/todo'
import TodoList from './components/TodoList.vue'
import CreateTodo from './components/CreateTodo.vue'

const store = useTodoStore()
</script>

<style scoped>
.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.filters button {
  padding: 0.3rem 0.8rem;
}
</style>
