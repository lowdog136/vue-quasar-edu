import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { collection, onSnapshot, addDoc, doc, deleteDoc, query, orderBy, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from 'src/firebase'

export interface AdminToDo {
  id: string
  title: string
  category: string
  priority: string
  done: boolean
  body: string[]
  color: string
  date: Timestamp
}

export const useAdminStore = defineStore('admin', () => {
  // State
  const adminToDos = ref<AdminToDo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const activeToDos = computed(() =>
    adminToDos.value.filter(todo => !todo.done)
  )

  const completedToDos = computed(() =>
    adminToDos.value.filter(todo => todo.done)
  )

  const todosByCategory = computed(() => {
    const grouped: Record<string, AdminToDo[]> = {}
    adminToDos.value.forEach(todo => {
      if (!grouped[todo.category]) {
        grouped[todo.category] = []
      }
      grouped[todo.category].push(todo)
    })
    return grouped
  })

  // Actions
  const fetchToDos = () => {
    loading.value = true
    error.value = null

    const adminToDosCollectionRef = collection(db, '/adminPanelToDo')
    const adminToDosCollectionQuery = query(adminToDosCollectionRef, orderBy('date', 'desc'))

    const unsubscribe = onSnapshot(
      adminToDosCollectionQuery,
      (querySnapshot) => {
        const todos: AdminToDo[] = []
        querySnapshot.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data()
          } as AdminToDo)
        })
        adminToDos.value = todos
        loading.value = false
      },
      (err) => {
        error.value = err.message
        loading.value = false
        console.error('Error fetching todos:', err)
      }
    )

    return unsubscribe
  }

  const addToDo = async (todoData: Omit<AdminToDo, 'id' | 'date'> & { date?: Date | Timestamp }) => {
    try {
      loading.value = true
      error.value = null

      const docRef = await addDoc(collection(db, '/adminPanelToDo'), {
        ...todoData,
        date: todoData.date instanceof Date ? Timestamp.fromDate(todoData.date) : Timestamp.now()
      })

      return docRef.id
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateToDo = async (id: string, updates: Partial<AdminToDo>) => {
    try {
      loading.value = true
      error.value = null

      const todoRef = doc(db, '/adminPanelToDo', id)
      await updateDoc(todoRef, {
        ...updates,
        updatedAt: Timestamp.now()
      })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteToDo = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await deleteDoc(doc(db, '/adminPanelToDo', id))
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const toggleToDoDone = async (id: string) => {
    const todo = adminToDos.value.find(t => t.id === id)
    if (todo) {
      await updateToDo(id, { done: !todo.done })
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    adminToDos,
    loading,
    error,

    // Getters
    activeToDos,
    completedToDos,
    todosByCategory,

    // Actions
    fetchToDos,
    addToDo,
    updateToDo,
    deleteToDo,
    toggleToDoDone,
    clearError
  }
})
