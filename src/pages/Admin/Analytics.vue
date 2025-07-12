<template>
  <div class="admin-analytics">
    <!-- Page Header -->
    <div class="analytics-header q-mb-lg">
      <div class="row items-center justify-between">
        <div>
          <h1 class="text-h4 q-mb-xs">Аналитика</h1>
          <p class="text-grey-6">Детальная статистика и аналитика системы</p>
        </div>
        <div class="row q-gutter-sm">
          <AdminButton
            icon="refresh"
            label="Обновить"
            variant="info"
            @click="refreshAnalytics"
            :loading="loading"
          />
          <AdminButton
            icon="download"
            label="Экспорт"
            variant="default"
            outline
            @click="exportData"
          />
        </div>
      </div>
    </div>

    <!-- Date Range Selector -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12">
        <AdminCard title="Период анализа" icon="schedule" icon-color="primary">
          <div class="row q-col-gutter-md items-center">
            <div class="col-12 col-sm-4">
              <q-select
                v-model="selectedPeriod"
                :options="periodOptions"
                label="Период"
                outlined
                dense
              />
            </div>
            <div class="col-12 col-sm-4">
              <q-date
                v-model="dateRange"
                range
                outlined
                dense
                label="Диапазон дат"
              />
            </div>
            <div class="col-12 col-sm-4">
              <AdminButton
                icon="filter_list"
                label="Применить фильтр"
                variant="primary"
                @click="applyFilter"
              />
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Просмотры"
          :subtitle="`${analytics.pageViews} просмотров`"
          icon="visibility"
          icon-color="primary"
          variant="info"
        >
          <div class="text-h3 text-primary q-mb-sm">{{ analytics.pageViews }}</div>
          <div class="text-caption">
            <q-icon name="trending_up" color="positive" size="sm" />
            <span class="q-ml-xs">+{{ analytics.pageViewsGrowth }}%</span>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Уникальные посетители"
          :subtitle="`${analytics.uniqueVisitors} пользователей`"
          icon="people"
          icon-color="success"
          variant="success"
        >
          <div class="text-h3 text-positive q-mb-sm">{{ analytics.uniqueVisitors }}</div>
          <div class="text-caption">
            <q-icon name="trending_up" color="positive" size="sm" />
            <span class="q-ml-xs">+{{ analytics.visitorsGrowth }}%</span>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Время на сайте"
          :subtitle="`${analytics.avgSessionDuration} мин`"
          icon="schedule"
          icon-color="warning"
          variant="warning"
        >
          <div class="text-h3 text-orange q-mb-sm">{{ analytics.avgSessionDuration }}</div>
          <div class="text-caption">
            <q-icon name="trending_up" color="positive" size="sm" />
            <span class="q-ml-xs">+{{ analytics.durationGrowth }}%</span>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Отказы"
          :subtitle="`${analytics.bounceRate}%`"
          icon="exit_to_app"
          icon-color="negative"
          variant="error"
        >
          <div class="text-h3 text-negative q-mb-sm">{{ analytics.bounceRate }}%</div>
          <div class="text-caption">
            <q-icon name="trending_down" color="positive" size="sm" />
            <span class="q-ml-xs">-{{ analytics.bounceRateChange }}%</span>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-lg-8">
        <AdminCard
          title="Трафик по дням"
          icon="show_chart"
          icon-color="primary"
        >
          <div class="chart-container">
            <div class="chart-placeholder">
              <q-icon name="show_chart" size="100px" color="grey-4" />
              <div class="text-h6 text-grey-6 q-mt-md">График трафика</div>
              <div class="text-caption text-grey">Здесь будет интерактивный график</div>
            </div>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-lg-4">
        <AdminCard
          title="Топ страниц"
          icon="list"
          icon-color="info"
        >
          <div class="top-pages">
            <div
              v-for="(page, index) in topPages"
              :key="index"
              class="top-page-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div class="col">
                  <div class="text-caption text-weight-medium">{{ page.name }}</div>
                  <div class="text-caption text-grey">{{ page.views }} просмотров</div>
                </div>
                <div class="text-caption text-grey">{{ page.percentage }}%</div>
              </div>
              <q-linear-progress
                :value="page.percentage / 100"
                :color="getProgressColor(index)"
                class="q-mt-xs"
              />
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- Device Analytics -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-6">
        <AdminCard
          title="Устройства"
          icon="devices"
          icon-color="primary"
        >
          <div class="device-analytics">
            <div
              v-for="device in deviceAnalytics"
              :key="device.type"
              class="device-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div class="row items-center q-gutter-sm">
                  <q-icon :name="device.icon" :color="device.color" size="sm" />
                  <div>
                    <div class="text-caption text-weight-medium">{{ device.type }}</div>
                    <div class="text-caption text-grey">{{ device.percentage }}%</div>
                  </div>
                </div>
                <div class="text-caption">{{ device.users }} пользователей</div>
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

      <div class="col-12 col-md-6">
        <AdminCard
          title="География"
          icon="public"
          icon-color="success"
        >
          <div class="geography-analytics">
            <div
              v-for="region in geographyAnalytics"
              :key="region.name"
              class="region-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div>
                  <div class="text-caption text-weight-medium">{{ region.name }}</div>
                  <div class="text-caption text-grey">{{ region.percentage }}%</div>
                </div>
                <div class="text-caption">{{ region.users }} пользователей</div>
              </div>
              <q-linear-progress
                :value="region.percentage / 100"
                color="positive"
                class="q-mt-xs"
              />
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- Real-time Analytics -->
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <AdminCard
          title="Активность в реальном времени"
          icon="live_tv"
          icon-color="warning"
        >
          <div class="realtime-analytics">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6 col-md-3">
                <div class="realtime-metric">
                  <div class="text-h6 text-primary">{{ realtime.onlineUsers }}</div>
                  <div class="text-caption text-grey">Онлайн сейчас</div>
                </div>
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <div class="realtime-metric">
                  <div class="text-h6 text-positive">{{ realtime.activePages }}</div>
                  <div class="text-caption text-grey">Активных страниц</div>
                </div>
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <div class="realtime-metric">
                  <div class="text-h6 text-warning">{{ realtime.newSessions }}</div>
                  <div class="text-caption text-grey">Новых сессий</div>
                </div>
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <div class="realtime-metric">
                  <div class="text-h6 text-info">{{ realtime.avgResponseTime }}ms</div>
                  <div class="text-caption text-grey">Среднее время ответа</div>
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

export default defineComponent({
  name: 'AdminAnalytics',
  components: {
    AdminCard,
    AdminButton
  },
  setup () {
    const loading = ref(false)
    const selectedPeriod = ref('7d')
    const dateRange = ref({ from: '2024/01/01', to: '2024/01/31' })

    const periodOptions = [
      { label: 'Последние 7 дней', value: '7d' },
      { label: 'Последние 30 дней', value: '30d' },
      { label: 'Последние 90 дней', value: '90d' },
      { label: 'Прошлый год', value: '1y' }
    ]

    // Mock analytics data
    const analytics = ref({
      pageViews: 15420,
      pageViewsGrowth: 12.5,
      uniqueVisitors: 3247,
      visitorsGrowth: 8.3,
      avgSessionDuration: 4.2,
      durationGrowth: 15.7,
      bounceRate: 23.4,
      bounceRateChange: 2.1
    })

    const topPages = ref([
      { name: 'Главная страница', views: 5420, percentage: 35.1 },
      { name: 'Новости клуба', views: 3240, percentage: 21.0 },
      { name: 'Турнирная таблица', views: 2890, percentage: 18.7 },
      { name: 'Календарь игр', views: 2150, percentage: 13.9 },
      { name: 'О клубе', views: 1720, percentage: 11.3 }
    ])

    const deviceAnalytics = ref([
      { type: 'Desktop', users: 2150, percentage: 66.2, icon: 'desktop_windows', color: 'primary' },
      { type: 'Mobile', users: 890, percentage: 27.4, icon: 'smartphone', color: 'success' },
      { type: 'Tablet', users: 207, percentage: 6.4, icon: 'tablet', color: 'warning' }
    ])

    const geographyAnalytics = ref([
      { name: 'Мурманск', users: 1850, percentage: 57.0 },
      { name: 'Санкт-Петербург', users: 420, percentage: 12.9 },
      { name: 'Москва', users: 380, percentage: 11.7 },
      { name: 'Архангельск', users: 290, percentage: 8.9 },
      { name: 'Другие', users: 307, percentage: 9.5 }
    ])

    const realtime = ref({
      onlineUsers: 47,
      activePages: 12,
      newSessions: 8,
      avgResponseTime: 245
    })

    const getProgressColor = (index) => {
      const colors = ['primary', 'success', 'warning', 'info', 'secondary']
      return colors[index % colors.length]
    }

    const refreshAnalytics = async () => {
      loading.value = true
      // Имитация загрузки данных
      await new Promise(resolve => setTimeout(resolve, 1500))
      loading.value = false
    }

    const applyFilter = () => {
      console.log('Applying filter:', { selectedPeriod: selectedPeriod.value, dateRange: dateRange.value })
      refreshAnalytics()
    }

    const exportData = () => {
      console.log('Exporting analytics data')
      // Логика экспорта данных
    }

    onMounted(() => {
      refreshAnalytics()
    })

    return {
      loading,
      selectedPeriod,
      dateRange,
      periodOptions,
      analytics,
      topPages,
      deviceAnalytics,
      geographyAnalytics,
      realtime,
      getProgressColor,
      refreshAnalytics,
      applyFilter,
      exportData
    }
  }
})
</script>

<style lang="scss" scoped>
.admin-analytics {
  .analytics-header {
    h1 {
      margin: 0;
      color: #333;
    }
  }

  .chart-container {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chart-placeholder {
    text-align: center;
    color: #999;
  }

  .top-pages {
    .top-page-item {
      padding: 8px 0;
    }
  }

  .device-analytics {
    .device-item {
      padding: 8px 0;
    }
  }

  .geography-analytics {
    .region-item {
      padding: 8px 0;
    }
  }

  .realtime-analytics {
    .realtime-metric {
      text-align: center;
      padding: 16px;
      border-radius: 8px;
      background: #f8f9fa;
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .admin-analytics {
    .analytics-header {
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
