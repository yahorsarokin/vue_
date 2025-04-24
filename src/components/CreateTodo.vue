<template>
  <form @submit.prevent="handleAdd">
    <input v-model="newTodo" placeholder="Add new todo" />
    <button type="submit">Add</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const newTodo = ref('')
const emit = defineEmits<{
  (e: 'add', text: string): void
}>()

function handleAdd() {
  if (newTodo.value.trim()) {
    emit('add', newTodo.value.trim())
    newTodo.value = ''
  }
}
</script>

<style scoped>
form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
