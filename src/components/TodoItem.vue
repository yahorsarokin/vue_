<template>
  <li class="todo-item">
    <input type="checkbox" :checked="localCompleted" @change="toggle" />
    <span :class="{ completed: localCompleted }">{{ todo.text }}</span>
    <button @click="$emit('delete', todo.id)">🗑</button>
  </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  todo: {
    id: number
    text: string
    completed: boolean
  }
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'toggle', id: number): void
}>()

const localCompleted = computed(() => props.todo.completed)

function toggle() {
  emit('toggle', props.todo.id)
}
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px;
  border-bottom: 1px solid #eee;
}
.completed {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
