<template>
  <li class="todo-item">
    <div class="todo-content" @click="openTodo">
      <input
        type="checkbox"
        class="checkbox"
        :checked="localCompleted"
        @change="toggle"
        @click.stop
      />
      <span :class="{ completed: localCompleted }" class="todo-text">
        {{ todo.text }}
      </span>
    </div>
    <button @click.stop="$emit('delete', todo.id)" class="delete-btn danger">🗑</button>
  </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Todo } from '../stores/todo'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'toggle', id: string): void
  (e: 'click', todo: Todo): void
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
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: var(--transition-fast);
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item:hover {
  background-color: var(--medium);
}

.todo-content {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.todo-text {
  margin: 0 var(--spacing-sm);
  word-break: break-word;
}

.delete-btn {
  padding: var(--spacing-xs);
  min-width: 2rem;
  height: 2rem;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  opacity: 0;
  transition: var(--transition-fast);
}

.todo-item:hover .delete-btn {
  visibility: visible;
  opacity: 1;
}

.checkbox {
  cursor: pointer;
}
</style>
