<template>
  <div>
    <ul class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @delete="$emit('delete', $event)"
        @toggle="$emit('toggle', $event)"
        @click="openModal($event)"
      />
    </ul>
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
  todos: {
    id: number
    text: string
    completed: boolean
  }[]
}>()

defineEmits<{
  (e: 'delete', id: number): void
  (e: 'toggle', id: number): void
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
  border: 1px solid white;
  border-radius: 6px;
  max-width: 600px;
}
</style>
