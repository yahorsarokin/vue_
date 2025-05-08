<template>
  <li class="todo-item" :class="{ completed: todo.completed }">
    <div class="todo-content" @click="$emit('click', todo)">
      <input type="checkbox" :checked="todo.completed" @click.stop="$emit('toggle', todo.id)" />
      <span class="todo-text">{{ todo.text }}</span>
    </div>
    <div class="todo-actions">
      <button class="favourite-btn" @click.stop="$emit('toggle-favorite', todo.id)">
        {{ isFavorite(todo.id) ? '★' : '☆' }}
      </button>
      <button @click.stop="$emit('delete', todo.id)" class="delete-btn danger">🗑</button>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { useFavorites } from '../composables/useFavorites'
import type { Todo } from '../stores/todo'

defineProps<{
  todo: Todo
}>()

defineEmits<{
  (e: 'delete', id: string): void
  (e: 'toggle', id: string): void
  (e: 'click', todo: Todo): void
  (e: 'toggle-favorite', id: string): void
}>()

const { isFavorite } = useFavorites()
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--border);
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex: 1;
  cursor: pointer;
}

.todo-text {
  color: var(--text);
}

.completed .todo-text {
  text-decoration: line-through;
  color: var(--medium);
}

.todo-actions {
  display: flex;
  gap: var(--spacing-xs);

  & > button {
    font-size: 1.2rem;
  }
}

.favourite-btn {
  background: none;
  border: none;
  padding: var(--spacing-xs);
  cursor: pointer;
  color: var(--warning);
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.favourite-btn:hover {
  background: var(--background-alt);
  color: var(--text);
}

.is-favorite {
  color: var(--warning);
}
</style>
