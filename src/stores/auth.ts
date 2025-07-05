import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth } from 'src/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot
} from 'firebase/firestore'
import { db } from 'src/firebase'

export interface UserRole {
  uid: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  permissions: string[]
  createdAt: Date
  updatedAt: Date
}

export interface AuthState {
  user: FirebaseUser | null
  userRole: UserRole | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<FirebaseUser | null>(null)
  const userRole = ref<UserRole | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => userRole.value?.role === 'admin')
  const isModerator = computed(() => userRole.value?.role === 'moderator')
  const hasPermission = computed(() => (permission: string) =>
    userRole.value?.permissions.includes(permission) || false
  )

  // Actions
  const login = async (details: { email: string; password: string }) => {
    try {
      loading.value = true
      error.value = null

      const { email, password } = details
      await signInWithEmailAndPassword(auth, email, password)

      // User will be set by onAuthStateChanged
    } catch (err: any) {
      error.value = getAuthErrorMessage(err.code)
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (details: { email: string; password: string }) => {
    try {
      loading.value = true
      error.value = null

      const { email, password } = details
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Create user role document
      if (userCredential.user) {
        await createUserRole(userCredential.user.uid, email, 'user')
      }
    } catch (err: any) {
      error.value = getAuthErrorMessage(err.code)
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      loading.value = true
      error.value = null

      await signOut(auth)
      user.value = null
      userRole.value = null
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const createUserRole = async (uid: string, email: string, role: 'admin' | 'user' | 'moderator' = 'user') => {
    const userRoleData: UserRole = {
      uid,
      email,
      role,
      permissions: getDefaultPermissions(role),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await setDoc(doc(db, 'userRoles', uid), userRoleData)
  }

  const fetchUserRole = async (uid: string) => {
    try {
      const userRoleDoc = await getDoc(doc(db, 'userRoles', uid))

      if (userRoleDoc.exists()) {
        userRole.value = userRoleDoc.data() as UserRole
      } else {
        // Create default user role if doesn't exist
        await createUserRole(uid, user.value?.email || '', 'user')
        await fetchUserRole(uid) // Fetch again
      }
    } catch (err: any) {
      console.error('Error fetching user role:', err)
      error.value = err.message
    }
  }

  const updateUserRole = async (uid: string, updates: Partial<UserRole>) => {
    try {
      loading.value = true
      error.value = null

      const userRoleRef = doc(db, 'userRoles', uid)
      await setDoc(userRoleRef, {
        ...updates,
        updatedAt: new Date()
      }, { merge: true })

      // Refresh user role
      await fetchUserRole(uid)
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const makeAdmin = async (uid: string) => {
    await updateUserRole(uid, {
      role: 'admin',
      permissions: getDefaultPermissions('admin')
    })
  }

  const makeModerator = async (uid: string) => {
    await updateUserRole(uid, {
      role: 'moderator',
      permissions: getDefaultPermissions('moderator')
    })
  }

  const makeUser = async (uid: string) => {
    await updateUserRole(uid, {
      role: 'user',
      permissions: getDefaultPermissions('user')
    })
  }

  const initAuth = () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser
        await fetchUserRole(firebaseUser.uid)
      } else {
        user.value = null
        userRole.value = null
      }
    })
  }

  const clearError = () => {
    error.value = null
  }

  // Helper functions
  const getDefaultPermissions = (role: 'admin' | 'user' | 'moderator'): string[] => {
    switch (role) {
      case 'admin':
        return [
          'admin:read',
          'admin:write',
          'admin:delete',
          'admin:manage_users',
          'admin:manage_content',
          'admin:manage_settings'
        ]
      case 'moderator':
        return [
          'admin:read',
          'admin:write',
          'admin:manage_content'
        ]
      case 'user':
        return [
          'user:read'
        ]
      default:
        return ['user:read']
    }
  }

  const getAuthErrorMessage = (code: string): string => {
    switch (code) {
      case 'auth/user-not-found':
        return 'Пользователь не найден'
      case 'auth/wrong-password':
        return 'Неверный пароль'
      case 'auth/email-already-in-use':
        return 'Email уже используется'
      case 'auth/invalid-email':
        return 'Неверный формат email'
      case 'auth/operation-not-allowed':
        return 'Операция не разрешена'
      case 'auth/weak-password':
        return 'Слабый пароль (минимум 6 символов)'
      default:
        return 'Произошла ошибка при аутентификации'
    }
  }

  return {
    // State
    user,
    userRole,
    loading,
    error,

    // Getters
    isAuthenticated,
    isAdmin,
    isModerator,
    hasPermission,

    // Actions
    login,
    register,
    logout,
    createUserRole,
    fetchUserRole,
    updateUserRole,
    makeAdmin,
    makeModerator,
    makeUser,
    initAuth,
    clearError
  }
})
