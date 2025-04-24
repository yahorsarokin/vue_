<template>
  <li :class="{ done: todo.completed }">
    <input type="checkbox" v-model="todo.completed" />
    <span>{{ todo.text }}</span>
    <button @click="$emit('delete')">🗑</button>
  </li>
</template>

<script lang="ts" setup>
defineProps<{
  todo: {
    id: number
    text: string
    completed: boolean
  }
}>()

defineEmits<{
  (e: 'delete'): void
}>()
</script>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
  padding: 0.5em;
}
.done span {
  text-decoration: line-through;
}
</style>
