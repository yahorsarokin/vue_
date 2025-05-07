<template>
  <div>
    <transition-group name="slide-fade" tag="ul" class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @delete="$emit('delete', $event)"
        @toggle="$emit('toggle', $event)"
        @click="openModal($event)"
      />
    </transition-group>

    <p v-if="todos.length === 0" class="empty-message">No todos found</p>

    <TodoModal
      v-if="selectedTodo"
      :isOpen="isModalOpen"
      :todo="selectedTodo"
      @close="closeModal"
      @toggle="$emit('toggle', $event)"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TodoItem from './TodoItem.vue'
import TodoModal from './TodoModal.vue'
import type { Todo } from '../stores/todo'

defineProps<{
  todos: Todo[]
}>()

defineEmits<{
  (e: 'delete', id: string): void
  (e: 'toggle', id: string): void
}>()

const isModalOpen = ref(false)
const selectedTodo = ref<Todo | null>(null)

function openModal(todo: Todo) {
  selectedTodo.value = todo
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}
</script>

<style scoped>
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.empty-message {
  text-align: center;
  color: var(--medium);
  padding: var(--spacing-md);
  font-style: italic;
}
</style>
