import { ref, computed } from 'vue'
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useTodoStore } from '../stores/todo'

export function useFavorites() {
  const favorites = ref<Set<string>>(new Set())
  const todoStore = useTodoStore()

  const favoritesRef = collection(db, 'favorites')
  onSnapshot(favoritesRef, (snapshot) => {
    favorites.value = new Set(snapshot.docs.map((doc) => doc.id))
  })

  const isFavorite = (todoId: string) => favorites.value.has(todoId)

  const favoriteTodos = computed(() =>
    todoStore.todos.filter((todo) => favorites.value.has(todo.id))
  )

  async function toggleFavorite(todoId: string) {
    if (favorites.value.has(todoId)) {
      await deleteDoc(doc(favoritesRef, todoId))
    } else {
      await setDoc(doc(favoritesRef, todoId), { timestamp: new Date() })
    }
  }

  return {
    favorites,
    isFavorite,
    favoriteTodos,
    toggleFavorite,
  }
}
