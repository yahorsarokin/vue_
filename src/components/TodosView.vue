<template>
  <div class="todos-view">
    <h1 class="text-center mb-lg">Todo List</h1>

    <div class="card mb-lg">
      <CreateTodo @add="store.addTodo" />
    </div>

    <div class="card mb-md">
      <div class="filters flex gap-sm mb-md">
        <button :class="{ active: store.filter === 'all' }" @click="store.setFilter('all')">
          All
        </button>
        <button :class="{ active: store.filter === 'active' }" @click="store.setFilter('active')">
          Active
        </button>
        <button
          :class="{ active: store.filter === 'completed' }"
          @click="store.setFilter('completed')"
        >
          Completed
        </button>
      </div>

      <div class="todo-list">
        <TodoItem
          v-for="todo in store.filteredTodos"
          :key="todo.id"
          :todo="todo"
          @delete="store.deleteTodo"
          @toggle="store.toggleTodo"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTodoStore } from '../stores/todo'
import TodoItem from './TodoItem.vue'
import CreateTodo from './CreateTodo.vue'

const store = useTodoStore()
</script>

<style scoped>
.filters button {
  padding: var(--spacing-xs) var(--spacing-md);
}

.filters button.active {
  background-color: var(--primary-dark);
  box-shadow: var(--shadow-sm);
}
</style>
