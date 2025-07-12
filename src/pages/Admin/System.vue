<template>
  <div class="admin-system-dashboard">
    <!-- Page Header -->
    <div class="system-header q-mb-lg">
      <div class="row items-center justify-between">
        <div>
          <h1 class="text-h4 q-mb-xs">Системный мониторинг</h1>
          <p class="text-grey-6">Мониторинг производительности и состояния системы</p>
        </div>
        <div class="row q-gutter-sm">
          <AdminButton
            icon="refresh"
            label="Обновить"
            variant="info"
            @click="refreshSystem"
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

    <!-- System Health Overview -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Состояние системы"
          :subtitle="systemHealth.status"
          icon="check_circle"
          :icon-color="systemHealth.color"
          :variant="systemHealth.variant"
        >
          <div class="text-h3" :class="`text-${systemHealth.color}`">{{ systemHealth.score }}%</div>
          <div class="text-caption">
            <q-icon name="fiber_manual_record" :color="systemHealth.color" size="sm" />
            <span class="q-ml-xs">{{ systemHealth.status }}</span>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="CPU"
          :subtitle="`${systemMetrics.cpu}% загрузка`"
          icon="memory"
          icon-color="warning"
          variant="warning"
        >
          <div class="text-h3 text-orange q-mb-sm">{{ systemMetrics.cpu }}%</div>
          <q-linear-progress
            :value="systemMetrics.cpu / 100"
            color="warning"
            class="q-mt-xs"
          />
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Память"
          :subtitle="`${systemMetrics.memory}% использовано`"
          icon="storage"
          icon-color="info"
          variant="info"
        >
          <div class="text-h3 text-info q-mb-sm">{{ systemMetrics.memory }}%</div>
          <q-linear-progress
            :value="systemMetrics.memory / 100"
            color="info"
            class="q-mt-xs"
          />
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Диск"
          :subtitle="`${systemMetrics.disk}% заполнено`"
          icon="hard_drive"
          icon-color="success"
          variant="success"
        >
          <div class="text-h3 text-positive q-mb-sm">{{ systemMetrics.disk }}%</div>
          <q-linear-progress
            :value="systemMetrics.disk / 100"
            color="success"
            class="q-mt-xs"
          />
        </AdminCard>
      </div>
    </div>

    <!-- Performance Monitoring -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-lg-8">
        <AdminCard
          title="Производительность системы"
          icon="speed"
          icon-color="primary"
        >
          <div class="performance-chart">
            <div class="chart-placeholder">
              <q-icon name="show_chart" size="100px" color="grey-4" />
              <div class="text-h6 text-grey-6 q-mt-md">График производительности</div>
              <div class="text-caption text-grey">CPU, память, диск в реальном времени</div>
            </div>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-lg-4">
        <AdminCard
          title="Активные процессы"
          icon="list"
          icon-color="info"
        >
          <div class="active-processes">
            <div
              v-for="process in activeProcesses"
              :key="process.name"
              class="process-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div class="col">
                  <div class="text-caption text-weight-medium">{{ process.name }}</div>
                  <div class="text-caption text-grey">{{ process.cpu }}% CPU</div>
                </div>
                <div class="text-caption text-grey">{{ process.memory }}MB</div>
              </div>
              <q-linear-progress
                :value="process.cpu / 100"
                :color="getProcessColor(process.cpu)"
                class="q-mt-xs"
              />
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- Security & Logs -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-6">
        <AdminCard
          title="Безопасность"
          icon="security"
          icon-color="warning"
        >
          <div class="security-status">
            <div
              v-for="security in securityStatus"
              :key="security.name"
              class="security-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div class="row items-center q-gutter-sm">
                  <q-icon
                    :name="security.icon"
                    :color="security.color"
                    size="sm"
                  />
                  <div>
                    <div class="text-caption text-weight-medium">{{ security.name }}</div>
                    <div class="text-caption text-grey">{{ security.status }}</div>
                  </div>
                </div>
                <q-chip
                  :color="security.color"
                  text-color="white"
                  size="sm"
                >
                  {{ security.level }}
                </q-chip>
              </div>
            </div>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-md-6">
        <AdminCard
          title="Последние логи"
          icon="description"
          icon-color="info"
        >
          <div class="system-logs">
            <div
              v-for="log in systemLogs"
              :key="log.id"
              class="log-item q-mb-sm"
            >
              <div class="row items-center q-gutter-sm">
                <q-icon
                  :name="log.icon"
                  :color="log.color"
                  size="sm"
                />
                <div class="col">
                  <div class="text-caption text-weight-medium">{{ log.message }}</div>
                  <div class="text-caption text-grey">{{ log.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- Network & Services -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-6">
        <AdminCard
          title="Сетевая активность"
          icon="network_check"
          icon-color="primary"
        >
          <div class="network-stats">
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <div class="network-metric">
                  <div class="text-h6 text-primary">{{ networkStats.incoming }} MB/s</div>
                  <div class="text-caption text-grey">Входящий трафик</div>
                </div>
              </div>
              <div class="col-6">
                <div class="network-metric">
                  <div class="text-h6 text-success">{{ networkStats.outgoing }} MB/s</div>
                  <div class="text-caption text-grey">Исходящий трафик</div>
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-6">
                <div class="network-metric">
                  <div class="text-h6 text-info">{{ networkStats.connections }}</div>
                  <div class="text-caption text-grey">Активные соединения</div>
                </div>
              </div>
              <div class="col-6">
                <div class="network-metric">
                  <div class="text-h6 text-warning">{{ networkStats.responseTime }}ms</div>
                  <div class="text-caption text-grey">Время ответа</div>
                </div>
              </div>
            </div>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-md-6">
        <AdminCard
          title="Сервисы"
          icon="dns"
          icon-color="success"
        >
          <div class="services-status">
            <div
              v-for="service in servicesStatus"
              :key="service.name"
              class="service-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div class="row items-center q-gutter-sm">
                  <q-icon
                    :name="service.icon"
                    :color="service.color"
                    size="sm"
                  />
                  <div>
                    <div class="text-caption text-weight-medium">{{ service.name }}</div>
                    <div class="text-caption text-grey">{{ service.port }}</div>
                  </div>
                </div>
                <q-chip
                  :color="service.color"
                  text-color="white"
                  size="sm"
                >
                  {{ service.status }}
                </q-chip>
              </div>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- Alerts & Notifications -->
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <AdminCard
          title="Системные уведомления"
          icon="notifications"
          icon-color="warning"
        >
          <div class="system-alerts">
            <div
              v-for="alert in systemAlerts"
              :key="alert.id"
              class="alert-item q-mb-md"
            >
              <div class="row items-center q-gutter-sm">
                <q-icon
                  :name="alert.icon"
                  :color="alert.color"
                  size="sm"
                />
                <div class="col">
                  <div class="text-caption text-weight-medium">{{ alert.title }}</div>
                  <div class="text-caption text-grey">{{ alert.message }}</div>
                  <div class="text-caption text-grey">{{ alert.time }}</div>
                </div>
                <q-chip
                  :color="alert.severity"
                  text-color="white"
                  size="sm"
                >
                  {{ alert.severity }}
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
  name: 'AdminSystem',
  components: {
    AdminCard,
    AdminButton
  },
  setup () {
    const loading = ref(false)

    // Mock system health data
    const systemHealth = ref({
      score: 98,
      status: 'Отлично',
      color: 'positive',
      variant: 'success'
    })

    const systemMetrics = ref({
      cpu: 45,
      memory: 67,
      disk: 23
    })

    const activeProcesses = ref([
      { name: 'Node.js', cpu: 25, memory: 512 },
      { name: 'Firebase', cpu: 15, memory: 256 },
      { name: 'Webpack', cpu: 8, memory: 128 },
      { name: 'Quasar', cpu: 12, memory: 192 },
      { name: 'Vue.js', cpu: 5, memory: 64 }
    ])

    const securityStatus = ref([
      {
        name: 'Firewall',
        status: 'Активен',
        level: 'Высокий',
        icon: 'security',
        color: 'positive'
      },
      {
        name: 'SSL/TLS',
        status: 'Валидный',
        level: 'Высокий',
        icon: 'lock',
        color: 'positive'
      },
      {
        name: 'Антивирус',
        status: 'Обновлен',
        level: 'Средний',
        icon: 'shield',
        color: 'warning'
      },
      {
        name: 'Бэкапы',
        status: 'Автоматические',
        level: 'Высокий',
        icon: 'backup',
        color: 'positive'
      }
    ])

    const systemLogs = ref([
      {
        id: 1,
        message: 'Система запущена успешно',
        time: '2 минуты назад',
        icon: 'check_circle',
        color: 'positive'
      },
      {
        id: 2,
        message: 'Резервное копирование завершено',
        time: '15 минут назад',
        icon: 'backup',
        color: 'info'
      },
      {
        id: 3,
        message: 'Обновление безопасности установлено',
        time: '1 час назад',
        icon: 'security',
        color: 'warning'
      },
      {
        id: 4,
        message: 'Новый пользователь зарегистрирован',
        time: '2 часа назад',
        icon: 'person_add',
        color: 'primary'
      }
    ])

    const networkStats = ref({
      incoming: 2.4,
      outgoing: 1.8,
      connections: 156,
      responseTime: 245
    })

    const servicesStatus = ref([
      {
        name: 'Web Server',
        port: '8080',
        status: 'Активен',
        icon: 'dns',
        color: 'positive'
      },
      {
        name: 'Database',
        port: '5432',
        status: 'Активен',
        icon: 'storage',
        color: 'positive'
      },
      {
        name: 'Firebase',
        port: '443',
        status: 'Активен',
        icon: 'cloud',
        color: 'positive'
      },
      {
        name: 'Cache',
        port: '6379',
        status: 'Активен',
        icon: 'memory',
        color: 'positive'
      }
    ])

    const systemAlerts = ref([
      {
        id: 1,
        title: 'Высокая загрузка CPU',
        message: 'CPU достиг 85% загрузки',
        time: '5 минут назад',
        icon: 'warning',
        color: 'warning',
        severity: 'warning'
      },
      {
        id: 2,
        title: 'Обновление системы',
        message: 'Доступно обновление безопасности',
        time: '1 час назад',
        icon: 'system_update',
        color: 'info',
        severity: 'info'
      },
      {
        id: 3,
        title: 'Резервное копирование',
        message: 'Автоматическое резервное копирование выполнено',
        time: '2 часа назад',
        icon: 'backup',
        color: 'positive',
        severity: 'success'
      }
    ])

    const getProcessColor = (cpu) => {
      if (cpu > 80) return 'negative'
      if (cpu > 60) return 'warning'
      return 'positive'
    }

    const refreshSystem = async () => {
      loading.value = true
      // Имитация загрузки данных
      await new Promise(resolve => setTimeout(resolve, 1000))
      loading.value = false
    }

    onMounted(() => {
      refreshSystem()
    })

    return {
      loading,
      systemHealth,
      systemMetrics,
      activeProcesses,
      securityStatus,
      systemLogs,
      networkStats,
      servicesStatus,
      systemAlerts,
      getProcessColor,
      refreshSystem
    }
  }
})
</script>

<style lang="scss" scoped>
.admin-system-dashboard {
  .system-header {
    h1 {
      margin: 0;
      color: #333;
    }
  }

  .performance-chart {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chart-placeholder {
    text-align: center;
    color: #999;
  }

  .active-processes {
    .process-item {
      padding: 8px 0;
    }
  }

  .security-status {
    .security-item {
      padding: 8px 0;
    }
  }

  .system-logs {
    .log-item {
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .network-stats {
    .network-metric {
      text-align: center;
      padding: 16px;
      border-radius: 8px;
      background: #f8f9fa;
    }
  }

  .services-status {
    .service-item {
      padding: 8px 0;
    }
  }

  .system-alerts {
    .alert-item {
      padding: 12px;
      border-radius: 8px;
      background: #f8f9fa;
      margin-bottom: 12px;
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .admin-system-dashboard {
    .system-header {
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
