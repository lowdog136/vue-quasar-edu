<template>
  <div>
    <!-- Кнопка профиля в тулбаре -->
    <q-btn
      flat
      round
      dense
      icon="account_circle"
      @click="handleProfileClick"
      color="white"
    >
      <q-tooltip>
        {{ isAuthenticated ? user?.displayName || user?.email : 'Профиль' }}
      </q-tooltip>
    </q-btn>

    <!-- Диалог профиля -->
    <q-dialog v-model="profileMenu" position="standard" @show="onDialogShow" @hide="onDialogHide">
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Профиль</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <!-- Информация о пользователе -->
          <div v-if="isAuthenticated" class="q-mb-md">
            <div class="row items-center q-gutter-sm">
              <q-avatar size="40px">
                <img v-if="user?.photoURL" :src="user.photoURL" />
                <q-icon v-else name="account_circle" size="40px" />
              </q-avatar>
              <div>
                <div class="text-weight-medium">{{ user?.displayName || 'Пользователь' }}</div>
                <div class="text-caption text-grey">{{ user?.email }}</div>
                <div v-if="userRole" class="text-caption">
                  <q-chip size="sm" :color="getRoleColor(userRole.role)" text-color="white">
                    {{ getRoleLabel(userRole.role) }}
                  </q-chip>
                </div>
              </div>
            </div>
          </div>

          <!-- Гостевой режим -->
          <div v-else class="q-mb-md">
            <div class="text-center q-pa-md">
              <q-icon name="person_off" size="60px" color="grey" />
              <div class="text-h6 q-mt-sm">Гостевой режим</div>
              <div class="text-caption text-grey">Войдите для доступа к полному функционалу</div>
            </div>
          </div>

          <!-- Меню действий -->
          <q-list>
            <!-- Для аутентифицированных пользователей -->
            <template v-if="isAuthenticated">
              <!-- Админские опции -->
              <template v-if="isAdmin || isModerator">
                <q-separator />
                <q-item-label header>Администрирование</q-item-label>

                <q-item clickable v-close-popup @click="$router.push('/Admin')">
                  <q-item-section avatar>
                    <q-icon name="dashboard" color="primary" />
                  </q-item-section>
                  <q-item-section>Панель администратора</q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="$router.push('/Admin/Settings')">
                  <q-item-section avatar>
                    <q-icon name="settings" color="primary" />
                  </q-item-section>
                  <q-item-section>Настройки</q-item-section>
                </q-item>

                <q-item v-if="isAdmin" clickable v-close-popup @click="$router.push('/Admin/UserRoleManager')">
                  <q-item-section avatar>
                    <q-icon name="people" color="primary" />
                  </q-item-section>
                  <q-item-section>Управление пользователями</q-item-section>
                </q-item>

                <q-item v-if="isAdmin" clickable v-close-popup @click="$router.push('/Admin/InitEventTable')">
                  <q-item-section avatar>
                    <q-icon name="table_chart" color="primary" />
                  </q-item-section>
                  <q-item-section>Инициализация таблиц</q-item-section>
                </q-item>
              </template>

              <q-separator />
              <q-item clickable v-close-popup @click="handleLogout">
                <q-item-section avatar>
                  <q-icon name="logout" color="negative" />
                </q-item-section>
                <q-item-section>Выйти</q-item-section>
              </q-item>
            </template>

            <!-- Для гостей -->
            <template v-else>
              <q-item clickable v-close-popup @click="$router.push('/auth')">
                <q-item-section avatar>
                  <q-icon name="login" color="primary" />
                </q-item-section>
                <q-item-section>Войти</q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="continueAsGuest">
                <q-item-section avatar>
                  <q-icon name="person" color="grey" />
                </q-item-section>
                <q-item-section>Продолжить как гость</q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default defineComponent({
  name: 'UserProfileMenu',
  setup () {
    const router = useRouter()
    const authStore = useAuthStore()

    const profileMenu = ref(false)

    // Computed properties
    const user = computed(() => authStore.user)
    const userRole = computed(() => authStore.userRole)
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const isAdmin = computed(() => authStore.isAdmin)
    const isModerator = computed(() => authStore.isModerator)

    // Methods
    const handleLogout = async () => {
      try {
        await authStore.logout()
        router.push('/')
      } catch (error) {
        console.error('Ошибка выхода:', error)
      }
    }

    const continueAsGuest = () => {
      authStore.setGuestMode()
    }

    const handleProfileClick = () => {
      profileMenu.value = true
    }

    const onDialogShow = () => {
      // Dialog shown
    }

    const onDialogHide = () => {
      // Dialog hidden
    }

    const getRoleColor = (role) => {
      switch (role) {
        case 'admin': return 'red'
        case 'moderator': return 'orange'
        case 'user': return 'blue'
        default: return 'grey'
      }
    }

    const getRoleLabel = (role) => {
      switch (role) {
        case 'admin': return 'Администратор'
        case 'moderator': return 'Модератор'
        case 'user': return 'Пользователь'
        default: return 'Гость'
      }
    }

    return {
      profileMenu,
      user,
      userRole,
      isAuthenticated,
      isAdmin,
      isModerator,
      handleLogout,
      continueAsGuest,
      handleProfileClick,
      onDialogShow,
      onDialogHide,
      getRoleColor,
      getRoleLabel
    }
  }
})
</script>
