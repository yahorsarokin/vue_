<template>
  <div v-if="isOpen" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Todo Details</h2>
        <button class="close-button" @click="close">×</button>
      </div>
      <div class="modal-body">
        <p class="todo-text" :class="{ completed: todo.completed }">{{ todo.text }}</p>
        <p class="todo-status">Status: {{ todo.completed ? 'Completed' : 'Active' }}</p>
        <p class="todo-id">ID: {{ todo.id }}</p>
      </div>
      <div class="modal-footer">
        <button @click="toggleTodo">
          {{ todo.completed ? 'Mark as Active' : 'Mark as Completed' }}
        </button>
        <button class="delete-button" @click="deleteTodo">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.modal-body {
  padding: 1rem;
}

.modal-footer {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  border-top: 1px solid #eee;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.todo-text {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.todo-status,
.todo-id {
  color: #666;
  margin-bottom: 0.5rem;
}

.delete-button {
  background-color: #ff4d4f;
  color: white;
}
</style>
