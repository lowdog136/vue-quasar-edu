<template>
  <div class="admin-users-dashboard">
    <!-- Page Header -->
    <div class="users-header q-mb-lg">
      <div class="row items-center justify-between">
        <div>
          <h1 class="text-h4 q-mb-xs">Управление пользователями</h1>
          <p class="text-grey-6">Мониторинг и управление пользователями системы</p>
        </div>
        <div class="row q-gutter-sm">
          <AdminButton
            icon="person_add"
            label="Добавить пользователя"
            variant="primary"
            @click="addUser"
          />
          <AdminButton
            icon="refresh"
            label="Обновить"
            variant="info"
            @click="refreshUsers"
            :loading="loading"
          />
        </div>
      </div>
    </div>

    <!-- User Statistics -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Всего пользователей"
          :subtitle="`${userStats.totalUsers} зарегистрировано`"
          icon="people"
          icon-color="primary"
          variant="info"
        >
          <div class="text-h3 text-primary q-mb-sm">{{ userStats.totalUsers }}</div>
          <div class="text-caption">
            <q-icon name="trending_up" color="positive" size="sm" />
            <span class="q-ml-xs">+{{ userStats.newUsersThisWeek }} за неделю</span>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Активные пользователи"
          :subtitle="`${userStats.activeUsers} онлайн`"
          icon="person"
          icon-color="success"
          variant="success"
        >
          <div class="text-h3 text-positive q-mb-sm">{{ userStats.activeUsers }}</div>
          <div class="text-caption">
            <q-icon name="fiber_manual_record" color="positive" size="sm" />
            <span class="q-ml-xs">Сейчас онлайн</span>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Администраторы"
          :subtitle="`${userStats.admins} администраторов`"
          icon="admin_panel_settings"
          icon-color="warning"
          variant="warning"
        >
          <div class="text-h3 text-orange q-mb-sm">{{ userStats.admins }}</div>
          <div class="text-caption">
            <q-icon name="security" color="warning" size="sm" />
            <span class="q-ml-xs">Высокие права</span>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Модераторы"
          :subtitle="`${userStats.moderators} модераторов`"
          icon="verified_user"
          icon-color="info"
          variant="info"
        >
          <div class="text-h3 text-info q-mb-sm">{{ userStats.moderators }}</div>
          <div class="text-caption">
            <q-icon name="shield" color="info" size="sm" />
            <span class="q-ml-xs">Средние права</span>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- User Management -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-lg-8">
        <AdminCard
          title="Последние пользователи"
          icon="people"
          icon-color="primary"
        >
          <div class="users-list">
            <div
              v-for="user in recentUsers"
              :key="user.id"
              class="user-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div class="row items-center q-gutter-sm">
                  <q-avatar size="40px" :color="user.roleColor">
                    <img v-if="user.avatar" :src="user.avatar" />
                    <q-icon v-else name="person" color="white" />
                  </q-avatar>
                  <div>
                    <div class="text-subtitle2 text-weight-medium">{{ user.name }}</div>
                    <div class="text-caption text-grey">{{ user.email }}</div>
                    <div class="text-caption text-grey">{{ user.registrationDate }}</div>
                  </div>
                </div>
                <div class="row items-center q-gutter-sm">
                  <q-chip
                    :color="user.roleColor"
                    text-color="white"
                    size="sm"
                  >
                    {{ user.role }}
                  </q-chip>
                  <q-chip
                    :color="user.statusColor"
                    text-color="white"
                    size="sm"
                  >
                    {{ user.status }}
                  </q-chip>
                </div>
              </div>
              <div class="row q-mt-sm">
                <AdminButton
                  icon="edit"
                  label="Редактировать"
                  variant="default"
                  size="sm"
                  outline
                  @click="editUser(user.id)"
                />
                <AdminButton
                  icon="security"
                  label="Роли"
                  variant="warning"
                  size="sm"
                  outline
                  @click="manageRoles(user.id)"
                />
                <AdminButton
                  icon="block"
                  label="Заблокировать"
                  variant="error"
                  size="sm"
                  outline
                  @click="blockUser(user.id)"
                />
              </div>
            </div>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-lg-4">
        <AdminCard
          title="Распределение ролей"
          icon="pie_chart"
          icon-color="success"
        >
          <div class="roles-distribution">
            <div
              v-for="role in rolesDistribution"
              :key="role.name"
              class="role-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div class="row items-center q-gutter-sm">
                  <q-icon :name="role.icon" :color="role.color" size="sm" />
                  <div>
                    <div class="text-caption text-weight-medium">{{ role.name }}</div>
                    <div class="text-caption text-grey">{{ role.count }} пользователей</div>
                  </div>
                </div>
                <div class="text-caption text-grey">{{ role.percentage }}%</div>
              </div>
              <q-linear-progress
                :value="role.percentage / 100"
                :color="role.color"
                class="q-mt-xs"
              />
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- User Activity -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-6">
        <AdminCard
          title="Активность пользователей"
          icon="trending_up"
          icon-color="primary"
        >
          <div class="user-activity">
            <div
              v-for="activity in userActivity"
              :key="activity.name"
              class="activity-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div class="col">
                  <div class="text-caption text-weight-medium">{{ activity.name }}</div>
                  <div class="text-caption text-grey">{{ activity.sessions }} сессий</div>
                </div>
                <div class="text-caption text-grey">{{ activity.lastSeen }}</div>
              </div>
              <q-linear-progress
                :value="activity.sessions / Math.max(...userActivity.map(a => a.sessions))"
                color="primary"
                class="q-mt-xs"
              />
            </div>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-md-6">
        <AdminCard
          title="Регистрации по времени"
          icon="schedule"
          icon-color="success"
        >
          <div class="registration-timeline">
            <div
              v-for="registration in registrationTimeline"
              :key="registration.period"
              class="timeline-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div>
                  <div class="text-caption text-weight-medium">{{ registration.period }}</div>
                  <div class="text-caption text-grey">{{ registration.count }} регистраций</div>
                </div>
                <div class="text-caption text-grey">{{ registration.percentage }}%</div>
              </div>
              <q-linear-progress
                :value="registration.percentage / 100"
                color="success"
                class="q-mt-xs"
              />
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- User Analytics -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-6">
        <AdminCard
          title="География пользователей"
          icon="public"
          icon-color="info"
        >
          <div class="user-geography">
            <div
              v-for="region in userGeography"
              :key="region.name"
              class="region-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div>
                  <div class="text-caption text-weight-medium">{{ region.name }}</div>
                  <div class="text-caption text-grey">{{ region.users }} пользователей</div>
                </div>
                <div class="text-caption text-grey">{{ region.percentage }}%</div>
              </div>
              <q-linear-progress
                :value="region.percentage / 100"
                color="info"
                class="q-mt-xs"
              />
            </div>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-md-6">
        <AdminCard
          title="Устройства пользователей"
          icon="devices"
          icon-color="warning"
        >
          <div class="user-devices">
            <div
              v-for="device in userDevices"
              :key="device.type"
              class="device-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div class="row items-center q-gutter-sm">
                  <q-icon :name="device.icon" :color="device.color" size="sm" />
                  <div>
                    <div class="text-caption text-weight-medium">{{ device.type }}</div>
                    <div class="text-caption text-grey">{{ device.users }} пользователей</div>
                  </div>
                </div>
                <div class="text-caption text-grey">{{ device.percentage }}%</div>
              </div>
              <q-linear-progress
                :value="device.percentage / 100"
                :color="device.color"
                class="q-mt-xs"
              />
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- User Actions -->
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <AdminCard
          title="Последние действия пользователей"
          icon="history"
          icon-color="grey"
        >
          <div class="user-actions">
            <div
              v-for="action in userActions"
              :key="action.id"
              class="action-item q-mb-md"
            >
              <div class="row items-center q-gutter-sm">
                <q-avatar size="32px" :color="action.userColor">
                  <q-icon name="person" color="white" />
                </q-avatar>
                <div class="col">
                  <div class="text-caption text-weight-medium">{{ action.userName }}</div>
                  <div class="text-caption text-grey">{{ action.description }}</div>
                  <div class="text-caption text-grey">{{ action.time }}</div>
                </div>
                <q-chip
                  :color="action.typeColor"
                  text-color="white"
                  size="sm"
                >
                  {{ action.type }}
                </q-chip>
              </div>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import AdminCard from 'components/Admin/UI/AdminCard.vue'
import AdminButton from 'components/Admin/UI/AdminButton.vue'

export default defineComponent({
  name: 'AdminUsers',
  components: {
    AdminCard,
    AdminButton
  },
  setup () {
    const loading = ref(false)

    // Mock user statistics
    const userStats = ref({
      totalUsers: 1247,
      newUsersThisWeek: 23,
      activeUsers: 156,
      admins: 3,
      moderators: 8
    })

    const recentUsers = ref([
      {
        id: 1,
        name: 'Иван Петров',
        email: 'ivan@example.com',
        avatar: null,
        role: 'Пользователь',
        roleColor: 'primary',
        status: 'Активен',
        statusColor: 'positive',
        registrationDate: '2 часа назад'
      },
      {
        id: 2,
        name: 'Мария Сидорова',
        email: 'maria@example.com',
        avatar: null,
        role: 'Модератор',
        roleColor: 'warning',
        status: 'Активен',
        statusColor: 'positive',
        registrationDate: '1 день назад'
      },
      {
        id: 3,
        name: 'Алексей Козлов',
        email: 'alex@example.com',
        avatar: null,
        role: 'Администратор',
        roleColor: 'negative',
        status: 'Активен',
        statusColor: 'positive',
        registrationDate: '3 дня назад'
      }
    ])

    const rolesDistribution = ref([
      { name: 'Пользователи', count: 1180, percentage: 94.6, icon: 'person', color: 'primary' },
      { name: 'Модераторы', count: 45, percentage: 3.6, icon: 'verified_user', color: 'warning' },
      { name: 'Администраторы', count: 22, percentage: 1.8, icon: 'admin_panel_settings', color: 'negative' }
    ])

    const userActivity = ref([
      { name: 'Иван Петров', sessions: 45, lastSeen: '5 минут назад' },
      { name: 'Мария Сидорова', sessions: 32, lastSeen: '15 минут назад' },
      { name: 'Алексей Козлов', sessions: 28, lastSeen: '1 час назад' },
      { name: 'Елена Волкова', sessions: 24, lastSeen: '2 часа назад' },
      { name: 'Дмитрий Соколов', sessions: 19, lastSeen: '3 часа назад' }
    ])

    const registrationTimeline = ref([
      { period: 'Сегодня', count: 12, percentage: 15 },
      { period: 'Вчера', count: 18, percentage: 22 },
      { period: 'На этой неделе', count: 45, percentage: 55 },
      { period: 'В прошлом месяце', count: 156, percentage: 8 }
    ])

    const userGeography = ref([
      { name: 'Мурманск', users: 850, percentage: 68.2 },
      { name: 'Санкт-Петербург', users: 180, percentage: 14.4 },
      { name: 'Москва', users: 120, percentage: 9.6 },
      { name: 'Архангельск', users: 97, percentage: 7.8 }
    ])

    const userDevices = ref([
      { type: 'Desktop', users: 820, percentage: 65.8, icon: 'desktop_windows', color: 'primary' },
      { type: 'Mobile', users: 350, percentage: 28.1, icon: 'smartphone', color: 'success' },
      { type: 'Tablet', users: 77, percentage: 6.1, icon: 'tablet', color: 'warning' }
    ])

    const userActions = ref([
      {
        id: 1,
        userName: 'Иван Петров',
        description: 'Оставил комментарий к новости',
        time: '2 минуты назад',
        type: 'Комментарий',
        typeColor: 'info',
        userColor: 'primary'
      },
      {
        id: 2,
        userName: 'Мария Сидорова',
        description: 'Одобрила новую публикацию',
        time: '15 минут назад',
        type: 'Модерация',
        typeColor: 'warning',
        userColor: 'warning'
      },
      {
        id: 3,
        userName: 'Алексей Козлов',
        description: 'Изменил настройки системы',
        time: '1 час назад',
        type: 'Администрирование',
        typeColor: 'negative',
        userColor: 'negative'
      },
      {
        id: 4,
        userName: 'Елена Волкова',
        description: 'Зарегистрировалась в системе',
        time: '2 часа назад',
        type: 'Регистрация',
        typeColor: 'positive',
        userColor: 'primary'
      }
    ])

    const addUser = () => {
      console.log('Adding new user')
      // Логика добавления пользователя
    }

    const editUser = (userId) => {
      console.log('Editing user:', userId)
      // Логика редактирования пользователя
    }

    const manageRoles = (userId) => {
      console.log('Managing roles for user:', userId)
      // Логика управления ролями
    }

    const blockUser = (userId) => {
      console.log('Blocking user:', userId)
      // Логика блокировки пользователя
    }

    const refreshUsers = async () => {
      loading.value = true
      // Имитация загрузки данных
      await new Promise(resolve => setTimeout(resolve, 1000))
      loading.value = false
    }

    onMounted(() => {
      refreshUsers()
    })

    return {
      loading,
      userStats,
      recentUsers,
      rolesDistribution,
      userActivity,
      registrationTimeline,
      userGeography,
      userDevices,
      userActions,
      addUser,
      editUser,
      manageRoles,
      blockUser,
      refreshUsers
    }
  }
})
</script>

<style lang="scss" scoped>
.admin-users-dashboard {
  .users-header {
    h1 {
      margin: 0;
      color: #333;
    }
  }

  .users-list {
    .user-item {
      padding: 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fafafa;

      &:hover {
        background: #f5f5f5;
      }
    }
  }

  .roles-distribution {
    .role-item {
      padding: 8px 0;
    }
  }

  .user-activity {
    .activity-item {
      padding: 8px 0;
    }
  }

  .registration-timeline {
    .timeline-item {
      padding: 8px 0;
    }
  }

  .user-geography {
    .region-item {
      padding: 8px 0;
    }
  }

  .user-devices {
    .device-item {
      padding: 8px 0;
    }
  }

  .user-actions {
    .action-item {
      padding: 12px;
      border-radius: 8px;
      background: #f8f9fa;
      margin-bottom: 12px;
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .admin-users-dashboard {
    .users-header {
      .row {
        flex-direction: column;
        align-items: flex-start;

        .row {
          margin-top: 16px;
          width: 100%;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
