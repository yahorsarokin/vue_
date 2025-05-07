<template>
  <form @submit.prevent="handleAdd" class="flex gap-sm">
    <input v-model="newTodo" placeholder="Add new todo" class="flex-grow" type="text" />
    <button type="submit" class="success">Add</button>
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
.flex-grow {
  flex-grow: 1;
}
</style>
