import { defineStore } from 'pinia'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

export type Filter = 'all' | 'active' | 'completed'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    filter: 'all' as Filter,
  }),
  getters: {
    filteredTodos(state): Todo[] {
      if (state.filter === 'active') return state.todos.filter((t) => !t.completed)
      if (state.filter === 'completed') return state.todos.filter((t) => t.completed)
      return state.todos
    },
  },
  actions: {
    addTodo(text: string) {
      this.todos.push({
        id: Date.now(),
        text,
        completed: false,
      })
    },
    deleteTodo(id: number) {
      this.todos = this.todos.filter((t) => t.id !== id)
    },
    toggleTodo(id: number) {
      const todo = this.todos.find((t) => t.id === id)
      if (todo) todo.completed = !todo.completed
    },
    setFilter(filter: Filter) {
      this.filter = filter
    },
  },
})
