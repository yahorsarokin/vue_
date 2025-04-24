<template>
  <main>
    <h1>Todo List</h1>
    <CreateTodo @add="addTodo" />
    <TodoList :todos="todos" @delete="deleteTodo" @toggle="toggleTodo" />
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TodoList from './components/TodoList.vue'
import CreateTodo from './components/TodoList.vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const todos = ref<Todo[]>([
  { id: 1, text: 'Buy kebab', completed: false },
  { id: 2, text: 'Eat kebab', completed: false },
])

function addTodo(text: string) {
  todos.value.push({
    id: Date.now(),
    text,
    completed: false,
  })
}

function deleteTodo(id: number) {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

function toggleTodo(id: number) {
  const todo = todos.value.find((todo) => todo.id === id)
  if (todo) todo.completed = !todo.completed
}
</script>

<style scoped>
main {
  max-width: 500px;
  margin: 2rem auto;
  font-family: sans-serif;
}
</style>
