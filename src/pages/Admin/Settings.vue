<template>
  <div class="admin-settings">
    <!-- Page Header -->
    <div class="settings-header q-mb-lg">
      <div class="row items-center justify-between">
        <div>
          <h1 class="text-h4 q-mb-xs">Настройки системы</h1>
          <p class="text-grey-6">Управление системными параметрами и данными</p>
        </div>
        <div class="row q-gutter-sm">
          <AdminButton
            icon="refresh"
            label="Обновить"
            variant="info"
            @click="refreshData"
            :loading="loading"
          />
        </div>
      </div>
    </div>

    <!-- Event Table Management -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-lg-8">
        <AdminCard
          title="Управление таблицей событий"
          subtitle="Инициализация и управление данными коллекции event-table"
          icon="table_chart"
          icon-color="primary"
          variant="info"
        >
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-sm-4">
              <AdminButton
                icon="table_chart"
                label="Инициализировать данные"
                variant="success"
                @click="initializeData"
                :loading="loading"
                class="full-width"
              />
            </div>
            <div class="col-12 col-sm-4">
              <AdminButton
                icon="clear_all"
                label="Очистить коллекцию"
                variant="error"
                @click="clearData"
                :loading="loading"
                class="full-width"
              />
            </div>
            <div class="col-12 col-sm-4">
              <AdminButton
                icon="visibility"
                label="Проверить данные"
                variant="info"
                @click="checkData"
                :loading="loading"
                class="full-width"
              />
            </div>
          </div>

          <!-- Message Banner -->
          <q-banner
            v-if="message"
            :class="messageType === 'success' ? 'bg-positive' : 'bg-negative'"
            class="text-white q-mb-md"
          >
            {{ message }}
          </q-banner>

          <!-- Data List -->
          <div v-if="dataList.length > 0" class="q-mt-md">
            <div class="text-h6 q-mb-md">Текущие данные в коллекции ({{ dataList.length }} записей):</div>
            <q-table
              :rows="dataList"
              :columns="tableColumns"
              row-key="id"
              dense
              flat
              bordered
              class="admin-table"
            >
              <template v-slot:body-cell-score="props">
                <q-td :props="props">
                  <q-chip
                    :color="getScoreColor(props.value)"
                    text-color="white"
                    size="sm"
                  >
                    {{ props.value }}
                  </q-chip>
                </q-td>
              </template>
            </q-table>
          </div>
        </AdminCard>
      </div>

      <!-- System Status -->
      <div class="col-12 col-lg-4">
        <AdminCard
          title="Статус системы"
          subtitle="Информация о текущем состоянии"
          icon="monitor"
          icon-color="success"
          variant="success"
        >
          <div class="system-status">
            <div class="row q-mb-sm">
              <div class="col-6 text-caption text-grey">База данных:</div>
              <div class="col-6 text-caption">
                <q-icon name="check_circle" color="positive" size="sm" />
                <span class="q-ml-xs">Подключена</span>
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-6 text-caption text-grey">Firebase:</div>
              <div class="col-6 text-caption">
                <q-icon name="check_circle" color="positive" size="sm" />
                <span class="q-ml-xs">Активен</span>
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-6 text-caption text-grey">Записей в event-table:</div>
              <div class="col-6 text-caption text-weight-medium">{{ dataList.length }}</div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-6 text-caption text-grey">Последнее обновление:</div>
              <div class="col-6 text-caption">{{ lastUpdateTime }}</div>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- Admin Panels -->
    <div class="row q-col-gutter-md">
      <!-- Site Panel -->
      <div class="col-12 col-lg-6">
        <AdminCard
          title="Панель управления сайтом"
          subtitle="Управление контентом и настройками сайта"
          icon="web"
          icon-color="primary"
        >
          <admin-panel />
        </AdminCard>
      </div>

      <!-- Tech Panel -->
      <div class="col-12 col-lg-6">
        <AdminCard
          title="Техническая панель"
          subtitle="ToDo задачи и технические операции"
          icon="build"
          icon-color="warning"
        >
          <tech-panel />
        </AdminCard>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import AdminCard from 'components/Admin/UI/AdminCard.vue'
import AdminButton from 'components/Admin/UI/AdminButton.vue'
import AdminPanel from 'components/Admin/Panels/sitePanel/sitePanel.vue'
import TechPanel from 'components/Admin/Panels/techPanel/techPanel.vue'
import { initEventTable, clearEventTable, db } from 'src/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default defineComponent({
  name: 'AdminSettings',
  components: {
    AdminCard,
    AdminButton,
    AdminPanel,
    TechPanel
  },
  setup () {
    const store = useStore()
    const loading = ref(false)
    const message = ref('')
    const messageType = ref('success')
    const dataList = ref([])
    const lastUpdateTime = ref('Не обновлялось')

    // Table columns for event-table data
    const tableColumns = [
      { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
      { name: 'name', label: 'Название', field: 'name', sortable: true, align: 'left' },
      { name: 'games', label: 'Игры', field: 'games', sortable: true, align: 'center' },
      { name: 'win', label: 'Победы', field: 'win', sortable: true, align: 'center' },
      { name: 'draw', label: 'Ничьи', field: 'draw', sortable: true, align: 'center' },
      { name: 'lose', label: 'Поражения', field: 'lose', sortable: true, align: 'center' },
      { name: 'score', label: 'Очки', field: 'score', sortable: true, align: 'center' }
    ]

    onMounted(() => {
      store.dispatch('fetchUser')
      checkData()
    })

    const showMessage = (text, type = 'success') => {
      message.value = text
      messageType.value = type
      setTimeout(() => {
        message.value = ''
      }, 5000)
    }

    const updateLastUpdateTime = () => {
      lastUpdateTime.value = new Date().toLocaleString('ru-RU')
    }

    const getScoreColor = (score) => {
      const numScore = parseInt(score)
      if (numScore >= 30) return 'positive'
      if (numScore >= 20) return 'warning'
      return 'negative'
    }

    const initializeData = async () => {
      loading.value = true
      try {
        await initEventTable()
        showMessage('Данные успешно инициализированы!')
        await checkData()
        updateLastUpdateTime()
      } catch (error) {
        showMessage(`Ошибка при инициализации: ${error.message}`, 'error')
      } finally {
        loading.value = false
      }
    }

    const clearData = async () => {
      loading.value = true
      try {
        await clearEventTable()
        showMessage('Коллекция очищена!')
        dataList.value = []
        updateLastUpdateTime()
      } catch (error) {
        showMessage(`Ошибка при очистке: ${error.message}`, 'error')
      } finally {
        loading.value = false
      }
    }

    const checkData = async () => {
      loading.value = true
      try {
        const eventTableCollectionRef = collection(db, 'event-table')
        const querySnapshot = await getDocs(eventTableCollectionRef)
        const data = []
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() })
        })
        dataList.value = data.sort((a, b) => a.id - b.id)
        showMessage(`Найдено ${data.length} записей в коллекции`)
        updateLastUpdateTime()
      } catch (error) {
        showMessage(`Ошибка при проверке данных: ${error.message}`, 'error')
      } finally {
        loading.value = false
      }
    }

    const refreshData = async () => {
      await checkData()
    }

    return {
      loading,
      message,
      messageType,
      dataList,
      lastUpdateTime,
      tableColumns,
      initializeData,
      clearData,
      checkData,
      refreshData,
      getScoreColor
    }
  }
})
</script>

<style lang="scss" scoped>
.admin-settings {
  .settings-header {
    h1 {
      margin: 0;
      color: #333;
    }
  }

  .system-status {
    .row {
      align-items: center;
    }
  }

  .admin-table {
    .q-table__top {
      padding: 8px 16px;
    }

    .q-table__bottom {
      padding: 8px 16px;
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .admin-settings {
    .settings-header {
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
