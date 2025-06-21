<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Инициализация таблицы событий</div>
        <div class="text-subtitle2">Управление данными коллекции event-table</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-gutter-md">
          <q-btn
            color="primary"
            label="Инициализировать данные"
            @click="initializeData"
            :loading="loading"
          />
          <q-btn
            color="negative"
            label="Очистить коллекцию"
            @click="clearData"
            :loading="loading"
          />
          <q-btn
            color="secondary"
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
import { ref } from 'vue'
import { initEventTable, clearEventTable, db } from 'src/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default {
  name: 'InitEventTable',
  setup () {
    const loading = ref(false)
    const message = ref('')
    const messageType = ref('success')
    const dataList = ref([])

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
  max-width: 800px
  margin: 0 auto
</style>
