<template>
  <q-layout view="lHh Lpr lFf" class="admin-layout">
    <!-- Header -->
    <q-header elevated class="admin-header">
      <q-toolbar class="admin-toolbar">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="admin-title">
          <div class="row items-center q-gutter-sm">
            <q-icon name="admin_panel_settings" size="28px" color="white" />
            <span class="text-h6">Админ-панель</span>
          </div>
        </q-toolbar-title>

        <!-- Breadcrumbs -->
        <div class="admin-breadcrumbs q-mr-md">
          <q-breadcrumbs active-color="white" separator-color="white">
            <q-breadcrumbs-el
              v-for="(item, index) in breadcrumbs"
              :key="index"
              :label="item.label"
              :icon="item.icon"
              :to="item.to"
              :clickable="item.clickable"
            />
          </q-breadcrumbs>
        </div>

        <!-- User Profile Menu -->
        <div class="admin-user-menu">
          <user-profile-menu />
        </div>
      </q-toolbar>
    </q-header>

    <!-- Sidebar -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="admin-sidebar"
      :width="280"
    >
      <div class="admin-sidebar-header">
        <div class="text-h6 q-pa-md">
          <q-icon name="admin_panel_settings" size="24px" color="primary" class="q-mr-sm" />
          Администрирование
        </div>
      </div>

      <q-list class="admin-menu">
        <!-- Dashboard -->
        <q-item
          clickable
          v-ripple
          :to="{ name: 'AdminDashboard' }"
          :active="$route.name === 'AdminDashboard'"
          class="admin-menu-item"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <!-- Analytics Dashboard -->
        <q-item
          clickable
          v-ripple
          :to="{ name: 'AdminAnalytics' }"
          :active="$route.name === 'AdminAnalytics'"
          class="admin-menu-item"
        >
          <q-item-section avatar>
            <q-icon name="analytics" />
          </q-item-section>
          <q-item-section>Аналитика</q-item-section>
        </q-item>

        <!-- Content Dashboard -->
        <q-item
          clickable
          v-ripple
          :to="{ name: 'AdminContent' }"
          :active="$route.name === 'AdminContent'"
          class="admin-menu-item"
        >
          <q-item-section avatar>
            <q-icon name="article" />
          </q-item-section>
          <q-item-section>Контент</q-item-section>
        </q-item>

        <!-- System Dashboard -->
        <q-item
          clickable
          v-ripple
          :to="{ name: 'AdminSystem' }"
          :active="$route.name === 'AdminSystem'"
          class="admin-menu-item"
        >
          <q-item-section avatar>
            <q-icon name="speed" />
          </q-item-section>
          <q-item-section>Система</q-item-section>
        </q-item>

        <!-- Users Dashboard -->
        <q-item
          clickable
          v-ripple
          :to="{ name: 'AdminUsers' }"
          :active="$route.name === 'AdminUsers'"
          class="admin-menu-item"
        >
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Пользователи</q-item-section>
        </q-item>

        <!-- Content Management -->
        <q-expansion-item
          icon="article"
          label="Управление контентом"
          :default-opened="$route.path.startsWith('/Admin/Content')"
          class="admin-menu-group"
        >
          <q-item
            clickable
            v-ripple
            :to="{ name: 'NewsMainPage' }"
            :active="$route.name === 'NewsMainPage'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="article" size="sm" />
            </q-item-section>
            <q-item-section>Новость на главную</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :to="{ name: 'DateEditor' }"
            :active="$route.name === 'DateEditor'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="schedule" size="sm" />
            </q-item-section>
            <q-item-section>Правка дат</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :to="{ name: 'SiteUpdate' }"
            :active="$route.name === 'SiteUpdate'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="update" size="sm" />
            </q-item-section>
            <q-item-section>Обновление сайта</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :to="{ name: 'NewsSite' }"
            :active="$route.name === 'NewsSite'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="article" size="sm" />
            </q-item-section>
            <q-item-section>Новости сайта</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :to="{ name: 'NewsClub' }"
            :active="$route.name === 'NewsClub'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="sports_soccer" size="sm" />
            </q-item-section>
            <q-item-section>Новости клуба</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Games Management -->
        <q-expansion-item
          icon="sports_soccer"
          label="Управление играми"
          :default-opened="$route.path.startsWith('/Admin/Games')"
          class="admin-menu-group"
        >
          <q-item
            clickable
            v-ripple
            :to="{ name: 'GamesEditor' }"
            :active="$route.name === 'GamesEditor'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="edit" size="sm" />
            </q-item-section>
            <q-item-section>Добавление (правка) игр</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :to="{ name: 'CalendarEditor' }"
            :active="$route.name === 'CalendarEditor'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="calendar_today" size="sm" />
            </q-item-section>
            <q-item-section>Правка в календаре игр</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :to="{ name: 'TournamentTable' }"
            :active="$route.name === 'TournamentTable'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="table_chart" size="sm" />
            </q-item-section>
            <q-item-section>Турнирная таблица</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Design -->
        <q-expansion-item
          icon="palette"
          label="Дизайн"
          :default-opened="$route.path.startsWith('/Admin/Design')"
          class="admin-menu-group"
        >
          <q-item
            clickable
            v-ripple
            :to="{ name: 'MainPageDesign' }"
            :active="$route.name === 'MainPageDesign'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="home" size="sm" />
            </q-item-section>
            <q-item-section>Оформление главной</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Stats -->
        <q-expansion-item
          icon="analytics"
          label="Статистика"
          :default-opened="$route.path.startsWith('/Admin/Stats')"
          class="admin-menu-group"
        >
          <q-item
            clickable
            v-ripple
            :to="{ name: 'PlayerStats' }"
            :active="$route.name === 'PlayerStats'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="person" size="sm" />
            </q-item-section>
            <q-item-section>Статистика игроков</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- System Management -->
        <q-expansion-item
          icon="settings"
          label="Система"
          :default-opened="$route.path.startsWith('/Admin/System')"
          class="admin-menu-group"
        >
          <q-item
            clickable
            v-ripple
            :to="{ name: 'AdminSettings' }"
            :active="$route.name === 'AdminSettings'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="settings" size="sm" />
            </q-item-section>
            <q-item-section>Настройки</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :to="{ name: 'InitEventTable' }"
            :active="$route.name === 'InitEventTable'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="table_chart" size="sm" />
            </q-item-section>
            <q-item-section>Инициализация таблиц</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :to="{ name: 'AboutSite' }"
            :active="$route.name === 'AboutSite'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="map" size="sm" />
            </q-item-section>
            <q-item-section>Дорожная карта</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- User Management -->
        <q-expansion-item
          icon="people"
          label="Пользователи"
          :default-opened="$route.path.startsWith('/Admin/Users')"
          class="admin-menu-group"
        >
          <q-item
            clickable
            v-ripple
            :to="{ name: 'UserRoleManager' }"
            :active="$route.name === 'UserRoleManager'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="admin_panel_settings" size="sm" />
            </q-item-section>
            <q-item-section>Управление ролями</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :to="{ name: 'MakeMeAdmin' }"
            :active="$route.name === 'MakeMeAdmin'"
            class="admin-submenu-item"
          >
            <q-item-section avatar>
              <q-icon name="person_add" size="sm" />
            </q-item-section>
            <q-item-section>Назначить администратора</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Exit -->
        <q-separator class="q-my-md" />
        <q-item
          clickable
          v-ripple
          :to="{ name: 'ExitAdmin' }"
          class="admin-menu-item admin-exit-item"
        >
          <q-item-section avatar>
            <q-icon name="logout" color="negative" />
          </q-item-section>
          <q-item-section class="text-negative">Выйти из админки</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container class="admin-content">
      <div class="admin-content-wrapper">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import UserProfileMenu from 'components/UserProfileMenu.vue'

export default defineComponent({
  name: 'AdminLayout',
  components: {
    UserProfileMenu
  },
  setup () {
    const route = useRoute()
    const leftDrawerOpen = ref(false)

    // Breadcrumbs based on current route
    const breadcrumbs = computed(() => {
      const path = route.path
      const segments = path.split('/').filter(segment => segment)

      if (segments.length === 0) return []

      const breadcrumbItems = [
        { label: 'Главная', icon: 'home', to: '/', clickable: true }
      ]

      if (segments[0] === 'Admin') {
        breadcrumbItems.push({ label: 'Админка', icon: 'admin_panel_settings', to: '/Admin', clickable: true })

        if (segments[1]) {
          // Handle nested paths like /Admin/Content/NewsMainPage
          if (segments[2]) {
            const sectionMap = {
              // Content Management
              NewsMainPage: { label: 'Новость на главную', icon: 'article' },
              DateEditor: { label: 'Правка дат', icon: 'schedule' },
              SiteUpdate: { label: 'Обновление сайта', icon: 'update' },

              // Games Management
              GamesEditor: { label: 'Редактор игр', icon: 'edit' },
              CalendarEditor: { label: 'Календарь игр', icon: 'calendar_today' },
              TournamentTable: { label: 'Турнирная таблица', icon: 'table_chart' },

              // Design
              MainPageDesign: { label: 'Оформление главной', icon: 'palette' },

              // Stats
              PlayerStats: { label: 'Статистика игроков', icon: 'person' }
            }

            const section = sectionMap[segments[2]]
            if (section) {
              // Add section group
              const groupMap = {
                Content: { label: 'Управление контентом', icon: 'article' },
                Games: { label: 'Управление играми', icon: 'sports_soccer' },
                Design: { label: 'Дизайн', icon: 'palette' },
                Stats: { label: 'Статистика', icon: 'analytics' }
              }

              const group = groupMap[segments[1]]
              if (group) {
                breadcrumbItems.push({
                  label: group.label,
                  icon: group.icon,
                  to: `/Admin/${segments[1]}`,
                  clickable: true
                })
              }

              breadcrumbItems.push({
                label: section.label,
                icon: section.icon,
                to: path,
                clickable: false
              })
            }
          } else {
            // Handle direct paths like /Admin/Settings
            const sectionMap = {
              // System
              Settings: { label: 'Настройки', icon: 'settings' },
              InitEventTable: { label: 'Инициализация таблиц', icon: 'table_chart' },
              UserRoleManager: { label: 'Управление ролями', icon: 'admin_panel_settings' },
              MakeMeAdmin: { label: 'Назначить администратора', icon: 'person_add' },
              AboutSite: { label: 'Дорожная карта', icon: 'map' }
            }

            const section = sectionMap[segments[1]]
            if (section) {
              breadcrumbItems.push({
                label: section.label,
                icon: section.icon,
                to: path,
                clickable: false
              })
            }
          }
        }
      }

      return breadcrumbItems
    })

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {
      leftDrawerOpen,
      breadcrumbs,
      toggleLeftDrawer
    }
  }
})
</script>

<style lang="scss" scoped>
.admin-layout {
  background: #f5f5f5;
}

.admin-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.admin-toolbar {
  min-height: 64px;
}

.admin-title {
  .text-h6 {
    color: white;
    font-weight: 600;
  }
}

.admin-breadcrumbs {
  .q-breadcrumbs {
    color: rgba(255, 255, 255, 0.8);

    .q-breadcrumbs__el {
      color: rgba(255, 255, 255, 0.8);

      &:hover {
        color: white;
      }
    }
  }
}

.admin-sidebar {
  background: white;
  border-right: 1px solid #e0e0e0;
}

.admin-sidebar-header {
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;

  .text-h6 {
    color: #333;
    font-weight: 600;
  }
}

.admin-menu {
  .admin-menu-item {
    border-radius: 0;
    margin: 2px 8px;

    &:hover {
      background: #f0f0f0;
    }

    &.q-item--active {
      background: #e3f2fd;
      color: #1976d2;
      border-left: 4px solid #1976d2;
    }
  }

  .admin-menu-group {
    .q-expansion-item__content {
      background: #fafafa;
    }

    .q-expansion-item__header {
      border-radius: 0;
      margin: 2px 8px;

      &:hover {
        background: #f0f0f0;
      }
    }
  }

  .admin-submenu-item {
    border-radius: 0;
    margin: 1px 8px 1px 32px;
    padding-left: 16px;

    &:hover {
      background: #f0f0f0;
    }

    &.q-item--active {
      background: #e8f5e8;
      color: #2e7d32;
      border-left: 3px solid #2e7d32;
    }
  }

  .admin-exit-item {
    &:hover {
      background: #ffebee;
    }
  }
}

.admin-content {
  background: #f5f5f5;
}

.admin-content-wrapper {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

// Responsive design
@media (max-width: 768px) {
  .admin-breadcrumbs {
    display: none;
  }

  .admin-content-wrapper {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .admin-title {
    .text-h6 {
      font-size: 1.1rem;
    }
  }

  .admin-content-wrapper {
    padding: 12px;
  }
}
</style>
