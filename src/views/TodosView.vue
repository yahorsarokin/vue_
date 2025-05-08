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
          @toggle-favorite="favorites.toggleFavorite"
          @click="openModal"
        />
      </div>
    </div>

    <TodoModal
      v-if="selectedTodo"
      :isOpen="isModalOpen"
      :todo="selectedTodo"
      @close="closeModal"
      @toggle="store.toggleTodo"
      @delete="store.deleteTodo"
      @update="store.updateTodo"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todo'
import { useFavorites } from '../composables/useFavorites'
import TodoItem from '../components/TodoItem.vue'
import CreateTodo from '../components/CreateTodo.vue'
import TodoModal from '../components/TodoModal.vue'
import type { Todo } from '../stores/todo'

const store = useTodoStore()
const favorites = useFavorites()

const isModalOpen = ref(false)
const selectedTodo = ref<Todo | null>(null)

function openModal(todo: Todo) {
  selectedTodo.value = todo
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  selectedTodo.value = null
}
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
