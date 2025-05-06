import { defineStore } from 'pinia'
import { db, auth } from '../firebase'
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  onSnapshot,
  where,
} from 'firebase/firestore'

export interface Todo {
  id: string
  text: string
  completed: boolean
  uid?: string
}

export type Filter = 'all' | 'active' | 'completed'

const TODOS_COLLECTION = 'todos'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    filter: 'all' as Filter,
    unsubscribe: null as (() => void) | null,
  }),
  getters: {
    filteredTodos(state): Todo[] {
      if (state.filter === 'active') return state.todos.filter((t) => !t.completed)
      if (state.filter === 'completed') return state.todos.filter((t) => t.completed)
      return state.todos
    },
  },
  actions: {
    async addTodo(text: string) {
      try {
        if (!auth.currentUser) {
          return
        }

        const todoData = {
          text,
          completed: false,
          uid: auth.currentUser.uid,
        }

        await addDoc(collection(db, TODOS_COLLECTION), todoData)
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    },
    async deleteTodo(id: string) {
      try {
        await deleteDoc(doc(db, TODOS_COLLECTION, id))
      } catch (error) {
        console.error('Error deleting todo:', error)
      }
    },
    async toggleTodo(id: string) {
      try {
        const todoRef = doc(db, TODOS_COLLECTION, id)
        const todo = this.todos.find((t) => t.id === id)
        if (todo) {
          await updateDoc(todoRef, {
            completed: !todo.completed,
          })
        }
      } catch (error) {
        console.error('Error updating todo:', error)
      }
    },
    setFilter(filter: Filter) {
      this.filter = filter
    },
    async loadFromFirestore() {
      try {
        if (!auth.currentUser) {
          auth.onAuthStateChanged((user) => {
            if (user) {
              this.setupFirestoreListener()
            }
          })
        } else {
          this.setupFirestoreListener()
        }
      } catch (error) {
        console.error('Error loading todos:', error)
      }
    },
    setupFirestoreListener() {
      this.cleanup()

      const uid = auth.currentUser?.uid
      if (!uid) {
        return
      }

      const q = query(collection(db, TODOS_COLLECTION), where('uid', '==', uid))

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const todos: Todo[] = []
          querySnapshot.forEach((doc) => {
            const data = doc.data()
            todos.push({
              id: doc.id,
              text: data.text,
              completed: data.completed,
              uid: data.uid,
            })
          })

          this.todos = todos
        },
        (error) => {
          console.error('Snapshot listener error:', error)
        }
      )

      this.unsubscribe = unsubscribe
    },
    cleanup() {
      if (this.unsubscribe) {
        this.unsubscribe()
        this.unsubscribe = null
      }
    },
  },
})
