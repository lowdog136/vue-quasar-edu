<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">Назначение роли администратора</div>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Текущий пользователь</div>
        <div class="row q-gutter-md items-center q-mb-md">
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

        <q-separator class="q-mb-md" />

        <div class="text-h6">Действия</div>
        <div class="row q-gutter-md">
          <q-btn
            color="negative"
            icon="admin_panel_settings"
            label="Сделать администратором"
            @click="makeMeAdmin"
            :loading="loading"
            :disable="authStore.isAdmin"
          />
          <q-btn
            color="warning"
            icon="moderator"
            label="Сделать модератором"
            @click="makeMeModerator"
            :loading="loading"
            :disable="authStore.isModerator"
          />
          <q-btn
            color="grey"
            icon="person"
            label="Сделать пользователем"
            @click="makeMeUser"
            :loading="loading"
            :disable="authStore.userRole?.role === 'user'"
          />
        </div>
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

    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">Информация о ролях</div>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon color="negative" name="admin_panel_settings" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Администратор</q-item-label>
              <q-item-label caption>Полный доступ к админ панели, управление пользователями, настройки</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="warning" name="moderator" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Модератор</q-item-label>
              <q-item-label caption>Доступ к админ панели, управление контентом</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="grey" name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Пользователь</q-item-label>
              <q-item-label caption>Обычный пользователь, доступ только к основному функционалу</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'

const authStore = useAuthStore()

// Component state
const loading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

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
const makeMeAdmin = async () => {
  if (!authStore.user?.uid) return

  try {
    loading.value = true
    await authStore.makeAdmin(authStore.user.uid)
    showMessage('Вы назначены администратором!')
  } catch (error: any) {
    showMessage(`Ошибка: ${error.message}`, 'error')
  } finally {
    loading.value = false
  }
}

const makeMeModerator = async () => {
  if (!authStore.user?.uid) return

  try {
    loading.value = true
    await authStore.makeModerator(authStore.user.uid)
    showMessage('Вы назначены модератором!')
  } catch (error: any) {
    showMessage(`Ошибка: ${error.message}`, 'error')
  } finally {
    loading.value = false
  }
}

const makeMeUser = async () => {
  if (!authStore.user?.uid) return

  try {
    loading.value = true
    await authStore.makeUser(authStore.user.uid)
    showMessage('Вы назначены пользователем!')
  } catch (error: any) {
    showMessage(`Ошибка: ${error.message}`, 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
}
</style>
