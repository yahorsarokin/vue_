<template>
  <div v-if="isOpen" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Todo Details</h2>
        <button class="close-button" @click="close">×</button>
      </div>
      <div class="modal-body">
        <p class="todo-text" :class="{ completed: todo.completed }">{{ todo.text }}</p>
        <p class="todo-status">
          Status: <span :class="statusClass">{{ todo.completed ? 'Completed' : 'Active' }}</span>
        </p>
        <p class="todo-id">
          ID: <span class="mono">{{ todo.id }}</span>
        </p>
      </div>
      <div class="modal-footer">
        <button @click="toggleTodo" :class="todo.completed ? 'secondary' : 'success'">
          {{ todo.completed ? 'Mark as Active' : 'Mark as Completed' }}
        </button>
        <button class="danger" @click="deleteTodo">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, computed } from 'vue'
import type { Todo } from '../stores/todo'

const props = defineProps<{
  isOpen: boolean
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'toggle', id: string): void
  (e: 'delete', id: string): void
}>()

const statusClass = computed(() => (props.todo.completed ? 'status-completed' : 'status-active'))

function close() {
  emit('close')
}

function toggleTodo() {
  emit('toggle', props.todo.id)
}

function deleteTodo() {
  emit('delete', props.todo.id)
  close()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: fadeIn 0.2s ease;
}

.modal-content {
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 500px;
  box-shadow: var(--shadow-xl);
  animation: scaleIn 0.2s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border);
}

.modal-header h2 {
  margin: 0;
  font-size: var(--font-size-xl);
}

.modal-body {
  padding: var(--spacing-lg);
}

.modal-footer {
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  border-top: 1px solid var(--border);
}

.close-button {
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  cursor: pointer;
  color: var(--light);
  opacity: 0.7;
  transition: var(--transition-fast);
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
}

.close-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
}

.todo-text {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-lg);
  line-height: 1.4;
  word-break: break-word;
}

.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.todo-status,
.todo-id {
  color: var(--medium);
  margin-bottom: var(--spacing-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.status-completed {
  color: var(--success);
  font-weight: var(--font-weight-medium);
}

.status-active {
  color: var(--warning);
  font-weight: var(--font-weight-medium);
}

.mono {
  font-family: monospace;
  background-color: var(--background);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
