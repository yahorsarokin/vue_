<template>
  <!-- <h1>Todo List</h1> -->
  <ul>
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @delete="deleteTodo(todo.id)" />
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TodoItem from './components/TodoItem.vue'

const todos = ref([
  { id: 1, text: 'Learn Vue 3', completed: false },
  { id: 2, text: 'Build a todo app', completed: false },
])

function deleteTodo(id: number) {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}
</script>
