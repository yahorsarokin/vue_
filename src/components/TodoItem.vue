<template>
  <li class="todo-item">
    <input type="checkbox" class="checkbox" :checked="localCompleted" @change="toggle" />
    <span :class="{ completed: localCompleted }" class="todo-text" @click="openTodo">{{
      todo.text
    }}</span>
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
  (e: 'click', todo: typeof props.todo): void
}>()

const localCompleted = computed(() => props.todo.completed)

function toggle() {
  emit('toggle', props.todo.id)
}

function openTodo() {
  emit('click', props.todo)
}
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.todo-item:hover {
  background-color: #363636;
}
.completed {
  text-decoration: line-through;
  opacity: 0.6;
}
.todo-text {
  flex-grow: 1;
  margin: 0 10px;
}
.checkbox {
  cursor: pointer;
}
</style>
