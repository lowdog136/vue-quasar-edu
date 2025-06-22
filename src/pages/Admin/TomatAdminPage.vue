<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-list padding>
      <q-item-label header>{{ labelHeader }}</q-item-label>
      <q-item >
        <q-item-section>
          <q-item-label>Привет, {{ $store.getters.userName }} {{ $store.getters.displayName }}</q-item-label>
          <q-item-label caption>
            {{ labelCaption }}
          </q-item-label>
          <q-item-label>
            <admin-edit-list />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Секция управления event-table -->
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Управление таблицей событий</div>
        <div class="text-subtitle2">Инициализация данных коллекции event-table</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-gutter-md">
          <q-btn
            color="primary"
            icon="table_chart"
            label="Инициализировать данные"
            @click="initializeData"
            :loading="loading"
          />
          <q-btn
            color="negative"
            icon="clear_all"
            label="Очистить коллекцию"
            @click="clearData"
            :loading="loading"
          />
          <q-btn
            color="secondary"
            icon="visibility"
            label="Проверить данные"
            @click="checkData"
            :loading="loading"
          />
        </div>
      </q-card-section>

      <q-card-section v-if="message">
        <q-banner :class="messageType === 'success' ? 'bg-positive' : 'bg-negative'" class="text-white">
          {{ message }}
        </q-banner>
      </q-card-section>

      <q-card-section v-if="dataList.length > 0">
        <div class="text-h6 q-mb-md">Текущие данные в коллекции:</div>
        <q-list bordered separator>
          <q-item v-for="item in dataList" :key="item.id">
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption>
                Игры: {{ item.games }} | Победы: {{ item.win }} | Ничьи: {{ item.draw }} | Поражения: {{ item.lose }} | Очки: {{ item.score }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import AdminEditList from 'components/Admin/Panels/adminEditList.vue'
import { initEventTable, clearEventTable, db } from 'src/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default {
  components: { AdminEditList },
  data () {
    return {
      labelCaption: 'Нужно выбрать раздел для редактирования',
      labelHeader: 'Административная панель управления:'
    }
  },
  setup () {
    const store = useStore()
    const loading = ref(false)
    const message = ref('')
    const messageType = ref('success')
    const dataList = ref([])

    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })

    const showMessage = (text, type = 'success') => {
      message.value = text
      messageType.value = type
      setTimeout(() => {
        message.value = ''
      }, 5000)
    }

    const initializeData = async () => {
      loading.value = true
      try {
        await initEventTable()
        showMessage('Данные успешно инициализированы!')
        await checkData()
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
      } catch (error) {
        showMessage(`Ошибка при проверке данных: ${error.message}`, 'error')
      } finally {
        loading.value = false
      }
    }

    return {
      notifyArchiveGames: ref(false),
      notifyClubNews: ref(false),
      notifySiteNews: ref(false),
      notifyUpdateDate: ref(false),
      notifyEventEdit: ref(false),
      notifyEventEdit2: ref(false),
      notifyEventEdit21: ref(false),
      loading,
      message,
      messageType,
      dataList,
      initializeData,
      clearData,
      checkData
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  max-width: 600px
  margin-top: 16px
</style>
