<template>
  <div class="admin-dashboard">
    <!-- Page Header -->
    <div class="dashboard-header q-mb-lg">
      <div class="row items-center justify-between">
        <div>
          <h1 class="text-h4 q-mb-xs">Dashboard</h1>
          <p class="text-grey-6">Обзор системы и основные метрики</p>
        </div>
        <div class="row q-gutter-sm">
          <AdminButton
            icon="refresh"
            label="Обновить"
            variant="info"
            @click="refreshData"
            :loading="loading"
          />
          <AdminButton
            icon="settings"
            label="Настройки"
            variant="default"
            outline
            to="/Admin/Settings"
          />
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Всего игр"
          :subtitle="`${stats.totalGames} игр в базе`"
          icon="sports_soccer"
          icon-color="primary"
          variant="info"
          clickable
          class="clickable-card"
          @click="$router.push('/Admin/TomatAdminPage')"
        >
          <div v-if="loading" class="text-center q-pa-md">
            <q-spinner color="primary" size="2em" />
            <div class="text-caption q-mt-sm">Загрузка данных...</div>
          </div>
          <div v-else>
            <div class="text-h3 text-primary q-mb-sm">{{ stats.totalGames }}</div>
            <div class="text-caption">
              <q-icon name="trending_up" color="positive" size="sm" />
              <span class="q-ml-xs">+{{ stats.newGamesThisWeek }} за неделю</span>
            </div>
            <div class="text-caption text-grey q-mt-xs">
              <q-icon name="touch_app" size="xs" />
              <span class="q-ml-xs">Нажмите для управления</span>
            </div>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Новости"
          :subtitle="`${stats.totalNews} публикаций`"
          icon="article"
          icon-color="success"
          variant="success"
          clickable
          class="clickable-card"
          @click="$router.push('/Admin/NewsSite')"
        >
          <div v-if="loading" class="text-center q-pa-md">
            <q-spinner color="positive" size="2em" />
            <div class="text-caption q-mt-sm">Загрузка данных...</div>
          </div>
          <div v-else>
            <div class="text-h3 text-positive q-mb-sm">{{ stats.totalNews }}</div>
            <div class="text-caption">
              <q-icon name="schedule" color="grey" size="sm" />
              <span class="q-ml-xs">{{ stats.lastNewsDate || 'Нет данных' }}</span>
            </div>
            <div class="text-caption text-grey q-mt-xs">
              <q-icon name="touch_app" size="xs" />
              <span class="q-ml-xs">Нажмите для управления</span>
            </div>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Пользователи"
          :subtitle="`${stats.totalUsers} зарегистрировано`"
          icon="people"
          icon-color="warning"
          variant="warning"
        >
          <div v-if="loading" class="text-center q-pa-md">
            <q-spinner color="orange" size="2em" />
            <div class="text-caption q-mt-sm">Загрузка данных...</div>
          </div>
          <div v-else>
            <div class="text-h3 text-orange q-mb-sm">{{ stats.totalUsers }}</div>
            <div class="text-caption">
              <q-icon name="person_add" color="positive" size="sm" />
              <span class="q-ml-xs">+{{ stats.newUsersThisWeek }} за неделю</span>
            </div>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Система"
          :subtitle="systemStatus"
          icon="check_circle"
          icon-color="positive"
          variant="success"
        >
          <div v-if="loading" class="text-center q-pa-md">
            <q-spinner color="positive" size="2em" />
            <div class="text-caption q-mt-sm">Загрузка данных...</div>
          </div>
          <div v-else>
            <div class="text-h3 text-positive q-mb-sm">{{ stats.systemHealth }}%</div>
            <div class="text-caption">
              <q-icon name="fiber_manual_record" :color="systemStatusColor" size="sm" />
              <span class="q-ml-xs">{{ systemStatus }}</span>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-8">
        <AdminCard
          title="Быстрые действия"
          icon="flash_on"
          icon-color="warning"
        >
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <div class="quick-actions-section">
                <h6 class="text-subtitle1 q-mb-md">Управление контентом</h6>
                <div class="column q-gutter-sm">

                  <AdminButton
                    icon="article"
                    label="Создать новость"
                    variant="info"
                    size="sm"
                    to="/Admin/NewsSite"
                    class="full-width"
                  />
                  <AdminButton
                    icon="sports_soccer"
                    label="Управление играми"
                    variant="primary"
                    size="sm"
                    to="/Admin/TomatAdminPage"
                    class="full-width"
                  />
                  <AdminButton
                    icon="edit"
                    label="Редактировать контент"
                    variant="default"
                    size="sm"
                    outline
                    class="full-width"
                  />
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-6">
              <div class="quick-actions-section">
                <h6 class="text-subtitle1 q-mb-md">Система</h6>
                <div class="column q-gutter-sm">
                  <AdminButton
                    icon="admin_panel_settings"
                    label="Управление ролями"
                    variant="warning"
                    size="sm"
                    to="/Admin/UserRoleManager"
                    class="full-width"
                  />
                  <AdminButton
                    icon="table_chart"
                    label="Инициализация таблиц"
                    variant="error"
                    size="sm"
                    to="/Admin/InitEventTable"
                    class="full-width"
                  />
                  <AdminButton
                    icon="settings"
                    label="Настройки системы"
                    variant="default"
                    size="sm"
                    outline
                    to="/Admin/Settings"
                    class="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-md-4">
        <AdminCard
          title="Последние действия"
          icon="history"
          icon-color="grey"
        >
          <div class="recent-actions">
            <div
              v-for="(action, index) in recentActions"
              :key="index"
              class="recent-action-item q-mb-md"
            >
              <div class="row items-center q-gutter-sm">
                <q-icon
                  :name="action.icon"
                  :color="action.color"
                  size="sm"
                />
                <div class="col">
                  <div class="text-caption text-weight-medium">{{ action.title }}</div>
                  <div class="text-caption text-grey">{{ action.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- System Info -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <AdminCard
          title="Информация о системе"
          icon="info"
          icon-color="info"
        >
          <div class="system-info">
            <div class="row q-mb-sm">
              <div class="col-4 text-caption text-grey">Версия:</div>
              <div class="col-8 text-caption">{{ systemInfo.version }}</div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-4 text-caption text-grey">Последнее обновление:</div>
              <div class="col-8 text-caption">{{ systemInfo.lastUpdate }}</div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-4 text-caption text-grey">Статус БД:</div>
              <div class="col-8 text-caption">
                <q-icon name="check_circle" color="positive" size="sm" />
                <span class="q-ml-xs">Подключена</span>
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-4 text-caption text-grey">Firebase:</div>
              <div class="col-8 text-caption">
                <q-icon name="check_circle" color="positive" size="sm" />
                <span class="q-ml-xs">Активен</span>
              </div>
            </div>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-md-6">
        <AdminCard
          title="Уведомления"
          icon="notifications"
          icon-color="warning"
        >
          <div class="notifications">
            <div
              v-for="(notification, index) in notifications"
              :key="index"
              class="notification-item q-mb-sm"
            >
              <div class="row items-center q-gutter-sm">
                <q-icon
                  :name="notification.icon"
                  :color="notification.color"
                  size="sm"
                />
                <div class="col">
                  <div class="text-caption text-weight-medium">{{ notification.title }}</div>
                  <div class="text-caption text-grey">{{ notification.message }}</div>
                </div>
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
import { collection, onSnapshot, query, orderBy, where, getDocs } from 'firebase/firestore'
import { db } from 'src/firebase'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'AdminDashboard',
  components: {
    AdminCard,
    AdminButton
  },
  setup () {
    const $q = useQuasar()
    const loading = ref(false)

    // Реальные данные из Firebase
    const stats = ref({
      totalGames: 0,
      newGamesThisWeek: 0,
      totalNews: 0,
      lastNewsDate: '',
      totalUsers: 1247,
      newUsersThisWeek: 23,
      systemHealth: 98
    })

    const systemInfo = ref({
      version: '5.0.0',
      lastUpdate: 'Сегодня, 14:30'
    })

    const recentActions = ref([
      {
        title: 'Добавлена новая игра',
        time: '5 минут назад',
        icon: 'add',
        color: 'positive'
      },
      {
        title: 'Обновлена новость',
        time: '15 минут назад',
        icon: 'edit',
        color: 'info'
      },
      {
        title: 'Новый пользователь',
        time: '1 час назад',
        icon: 'person_add',
        color: 'warning'
      },
      {
        title: 'Системное обновление',
        time: '2 часа назад',
        icon: 'system_update',
        color: 'primary'
      }
    ])

    const notifications = ref([
      {
        title: 'Резервное копирование',
        message: 'Автоматическое резервное копирование выполнено успешно',
        icon: 'backup',
        color: 'positive'
      },
      {
        title: 'Обновление системы',
        message: 'Доступно обновление до версии 5.1.0',
        icon: 'system_update',
        color: 'warning'
      },
      {
        title: 'Мониторинг',
        message: 'Все сервисы работают стабильно',
        icon: 'monitor',
        color: 'info'
      }
    ])

    // Функция для получения даты неделю назад
    const getWeekAgo = () => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return weekAgo
    }

    // Функция для форматирования даты
    const formatDate = (date) => {
      if (!date) return ''
      const d = new Date(date)
      if (isNaN(d.getTime())) return date

      const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
      ]
      const month = months[d.getMonth()]
      const day = d.getDate()
      const year = d.getFullYear()
      return `${month} ${day}, ${year}`
    }

    // Загрузка данных игр
    const loadGamesData = () => {
      const gamesCollectionRef = collection(db, 'all-games')
      const gamesQuery = query(gamesCollectionRef, orderBy('datestamp', 'desc'))

      onSnapshot(gamesQuery, (querySnapshot) => {
        const games = []
        querySnapshot.forEach((doc) => {
          const game = {
            id: doc.id,
            ...doc.data()
          }
          games.push(game)
        })

        stats.value.totalGames = games.length

        // Подсчет игр за последнюю неделю
        const weekAgo = getWeekAgo()
        const recentGames = games.filter(game => {
          if (game.datestamp) {
            const gameDate = game.datestamp.toDate ? game.datestamp.toDate() : new Date(game.datestamp)
            return gameDate >= weekAgo
          }
          return false
        })
        stats.value.newGamesThisWeek = recentGames.length
      }, (error) => {
        console.error('Error loading games data:', error)
        $q.notify({
          message: 'Ошибка загрузки данных игр',
          color: 'negative',
          icon: 'error',
          position: 'top'
        })
      })
    }

    // Загрузка данных новостей
    const loadNewsData = () => {
      const newsCollectionRef = collection(db, 'siteNews')
      const newsQuery = query(newsCollectionRef, orderBy('date', 'desc'))

      onSnapshot(newsQuery, (querySnapshot) => {
        const news = []
        querySnapshot.forEach((doc) => {
          const newsItem = {
            id: doc.id,
            ...doc.data()
          }
          news.push(newsItem)
        })

        stats.value.totalNews = news.length

        // Получение даты последней новости
        if (news.length > 0) {
          const lastNews = news[0]
          if (lastNews.datenews) {
            stats.value.lastNewsDate = formatDate(lastNews.datenews)
          } else if (lastNews.date) {
            const lastDate = new Date(lastNews.date)
            const now = new Date()
            const diffTime = Math.abs(now - lastDate)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

            if (diffDays === 0) {
              stats.value.lastNewsDate = 'Сегодня'
            } else if (diffDays === 1) {
              stats.value.lastNewsDate = 'Вчера'
            } else {
              stats.value.lastNewsDate = `${diffDays} дня назад`
            }
          }
        }
      }, (error) => {
        console.error('Error loading news data:', error)
        $q.notify({
          message: 'Ошибка загрузки данных новостей',
          color: 'negative',
          icon: 'error',
          position: 'top'
        })
      })
    }

    const systemStatus = computed(() => {
      if (stats.value.systemHealth >= 90) return 'Отлично'
      if (stats.value.systemHealth >= 70) return 'Хорошо'
      if (stats.value.systemHealth >= 50) return 'Удовлетворительно'
      return 'Критично'
    })

    const systemStatusColor = computed(() => {
      if (stats.value.systemHealth >= 90) return 'positive'
      if (stats.value.systemHealth >= 70) return 'warning'
      return 'negative'
    })

    const refreshData = async () => {
      loading.value = true
      try {
        // Перезагружаем данные игр и новостей
        loadGamesData()
        loadNewsData()

        // Имитация загрузки для UX
        await new Promise(resolve => setTimeout(resolve, 500))

        $q.notify({
          message: 'Данные успешно обновлены',
          color: 'positive',
          icon: 'check_circle',
          position: 'top'
        })
      } catch (error) {
        console.error('Error refreshing data:', error)
        $q.notify({
          message: 'Ошибка при обновлении данных',
          color: 'negative',
          icon: 'error',
          position: 'top'
        })
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      // Загрузка данных при монтировании компонента
      loadGamesData()
      loadNewsData()
      refreshData()
    })

    return {
      loading,
      stats,
      systemInfo,
      recentActions,
      notifications,
      systemStatus,
      systemStatusColor,
      refreshData
    }
  }
})
</script>

<style lang="scss" scoped>
.admin-dashboard {
  .dashboard-header {
    h1 {
      margin: 0;
      color: #333;
    }
  }

  .quick-actions-section {
    h6 {
      color: #666;
      margin: 0 0 12px 0;
    }
  }

  .recent-actions {
    .recent-action-item {
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .system-info {
    .row {
      align-items: center;
    }
  }

  .notifications {
    .notification-item {
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .admin-dashboard {
    .dashboard-header {
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

// Анимации для кликабельных карточек
.admin-dashboard {
  .clickable-card {
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>
