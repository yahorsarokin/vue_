<template>
  <ui class="todo-list">
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @delete="$emit('delete', $event)" />
  </ui>
</template>

<script lang="ts" setup>
import TodoItem from './TodoItem.vue'

defineProps<{
  todos: {
    id: number
    text: string
    completed: boolean
  }[]
}>()

defineEmits<{
  (e: 'delete', id: number): void
}>()
</script>

<style scoped>
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
