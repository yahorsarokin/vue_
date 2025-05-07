<template>
  <main class="container">
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

      <TodoList
        :todos="store.filteredTodos"
        @delete="store.deleteTodo"
        @toggle="store.toggleTodo"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useTodoStore } from './stores/todo'
import TodoList from './components/TodoList.vue'
import CreateTodo from './components/CreateTodo.vue'
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
.filters button {
  padding: var(--spacing-xs) var(--spacing-md);
}

.filters button.active {
  background-color: var(--primary-dark);
  box-shadow: var(--shadow-sm);
}
</style>
