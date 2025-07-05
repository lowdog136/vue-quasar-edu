<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">Управление ролями пользователей</div>
      <div class="text-subtitle2">Назначение ролей для доступа к админ панели</div>
    </q-card-section>

    <q-card-section>
      <!-- Current User Info -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Текущий пользователь</div>
          <div class="row q-gutter-md items-center">
            <q-avatar size="48px">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
            </q-avatar>
            <div>
              <div class="text-subtitle1">{{ authStore.user?.email }}</div>
              <div class="text-caption">UID: {{ authStore.user?.uid }}</div>
              <q-chip
                :color="getRoleColor(authStore.userRole?.role)"
                text-color="white"
                :label="getRoleLabel(authStore.userRole?.role)"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Add New User Role -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Добавить роль пользователю</div>
          <div class="row q-gutter-md">
            <q-input
              v-model="newUserEmail"
              label="Email пользователя"
              outlined
              dense
              class="col-6"
            />
            <q-select
              v-model="newUserRole"
              :options="roleOptions"
              label="Роль"
              outlined
              dense
              class="col-3"
            />
            <q-btn
              color="primary"
              label="Добавить"
              @click="addUserRole"
              :loading="loading"
              :disable="!newUserEmail || !newUserRole"
            />
          </div>
        </q-card-section>
      </q-card>

      <!-- Users List -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Список пользователей</div>

          <q-table
            :rows="usersList"
            :columns="columns"
            row-key="uid"
            :loading="loading"
            :pagination="{ rowsPerPage: 10 }"
          >
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn-group flat>
                  <q-btn
                    size="sm"
                    color="primary"
                    label="Админ"
                    @click="changeUserRole(props.row.uid, 'admin')"
                    :disable="props.row.role === 'admin'"
                  />
                  <q-btn
                    size="sm"
                    color="secondary"
                    label="Модератор"
                    @click="changeUserRole(props.row.uid, 'moderator')"
                    :disable="props.row.role === 'moderator'"
                  />
                  <q-btn
                    size="sm"
                    color="grey"
                    label="Пользователь"
                    @click="changeUserRole(props.row.uid, 'user')"
                    :disable="props.row.role === 'user'"
                  />
                </q-btn-group>
              </q-td>
            </template>

            <template v-slot:body-cell-role="props">
              <q-td :props="props">
                <q-chip
                  :color="getRoleColor(props.row.role)"
                  text-color="white"
                  :label="getRoleLabel(props.row.role)"
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-card-section>

    <!-- Error/Success Messages -->
    <q-card-section v-if="message">
      <q-banner :class="messageType === 'success' ? 'bg-positive' : 'bg-negative'" class="text-white">
        {{ message }}
        <template v-slot:action>
          <q-btn flat color="white" label="Закрыть" @click="clearMessage" />
        </template>
      </q-banner>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore, type UserRole } from '../../stores/auth'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'

const authStore = useAuthStore()

// Component state
const loading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')
const newUserEmail = ref('')
const newUserRole = ref<'admin' | 'moderator' | 'user'>('user')
const usersList = ref<UserRole[]>([])

// Table columns
const columns = [
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left' as const,
    sortable: true
  },
  {
    name: 'role',
    label: 'Роль',
    field: 'role',
    align: 'center' as const,
    sortable: true
  },
  {
    name: 'createdAt',
    label: 'Создан',
    field: 'createdAt',
    align: 'center' as const,
    sortable: true,
    format: (val: Date) => val ? new Date(val).toLocaleDateString('ru-RU') : '-'
  },
  {
    name: 'actions',
    label: 'Действия',
    field: 'actions',
    align: 'center' as const
  }
]

// Role options
const roleOptions = [
  { label: 'Администратор', value: 'admin' },
  { label: 'Модератор', value: 'moderator' },
  { label: 'Пользователь', value: 'user' }
]

// Helper functions
const getRoleColor = (role?: string) => {
  switch (role) {
    case 'admin': return 'negative'
    case 'moderator': return 'warning'
    case 'user': return 'grey'
    default: return 'grey'
  }
}

const getRoleLabel = (role?: string) => {
  switch (role) {
    case 'admin': return 'Администратор'
    case 'moderator': return 'Модератор'
    case 'user': return 'Пользователь'
    default: return 'Неизвестно'
  }
}

const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

const clearMessage = () => {
  message.value = ''
}

// Actions
const addUserRole = async () => {
  if (!newUserEmail.value || !newUserRole.value) return

  try {
    loading.value = true

    // Create a temporary user role document
    // In real app, you'd need to get the user's UID from Firebase Auth
    const tempUid = `temp_${Date.now()}`
    await authStore.createUserRole(tempUid, newUserEmail.value, newUserRole.value)

    showMessage(`Роль ${getRoleLabel(newUserRole.value)} назначена пользователю ${newUserEmail.value}`)

    // Clear form
    newUserEmail.value = ''
    newUserRole.value = 'user'
  } catch (error: any) {
    showMessage(`Ошибка: ${error.message}`, 'error')
  } finally {
    loading.value = false
  }
}

const changeUserRole = async (uid: string, role: 'admin' | 'moderator' | 'user') => {
  try {
    loading.value = true

    switch (role) {
      case 'admin':
        await authStore.makeAdmin(uid)
        break
      case 'moderator':
        await authStore.makeModerator(uid)
        break
      case 'user':
        await authStore.makeUser(uid)
        break
    }

    showMessage(`Роль изменена на ${getRoleLabel(role)}`)
  } catch (error: any) {
    showMessage(`Ошибка: ${error.message}`, 'error')
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  // Listen to user roles collection
  const userRolesQuery = query(collection(db, 'userRoles'), orderBy('createdAt', 'desc'))

  onSnapshot(userRolesQuery, (snapshot) => {
    const users: UserRole[] = []
    snapshot.forEach((doc) => {
      users.push({
        uid: doc.id,
        ...doc.data()
      } as UserRole)
    })
    usersList.value = users
  })
})
</script>

<style scoped>
.my-card {
  width: 100%;
}
</style>
