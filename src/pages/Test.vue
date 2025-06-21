<template>
  <div>
    <h2>Добавить данные в коллекцию Firebase</h2>
    <q-input
      v-model="stringData"
      label="Введите строку"
      filled
      class="q-mb-md"
    />
    <q-input
      v-model="arrayInput"
      label="Введите элементы массива (через запятую)"
      filled
      class="q-mb-md"
    />
    <q-select
      v-model="selectedColor"
      :options="colorOptions"
      label="Выберите цвет"
      filled
      class="q-mb-md"
    />
    <q-date
      v-model="selectedDate"
      label="Выберите дату"
      filled
      class="q-mb-md"
      mask="MMMM DD, YYYY"
      locale="ru"
    />
    <q-btn @click="addData" label="Добавить данные" color="primary" />
    <q-banner v-if="successMessage" class="q-mt-md" color="green">
      {{ successMessage }}
    </q-banner>
    <q-banner v-if="errorMessage" class="q-mt-md" color="red">
      {{ errorMessage }}
    </q-banner>

    <h2 class="q-mt-md">Список добавленных данных</h2>
    <q-list>
      <q-item v-for="item in SiteUpdates" :key="item.id">
        <q-item-section>
          <div><strong>id:</strong> {{ item.id }}</div>
          <div><strong>Строка:</strong> {{ item.stringField }}</div>
          <div><strong>Массив:</strong> {{ item.arrayField.join(', ') }}</div>
          <div><strong>Цвет:</strong> {{ item.colorField }}</div>
          <div><strong>Дата:</strong> {{ item.dateField.toDate().toLocaleDateString() }}</div>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list>
      <q-item v-for="item in games" :key="item.id">
        <q-item-section>
          <div><strong>id:</strong> {{ item.id }}</div>
          <div><strong>Строка:</strong> {{ item.stringField }}</div>
          <div><strong>Массив:</strong> {{ item.arrayField.join(', ') }}</div>
          <div><strong>Цвет:</strong> {{ item.colorField }}</div>
          <div><strong>Дата:</strong> {{ item.dateField.toDate().toLocaleDateString() }}</div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from 'src/firebase'
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore'
const siteUpdateCollectionRef = collection(db, '/trest')
const siteUpdateCollectionQuery = query(siteUpdateCollectionRef, orderBy('date', 'desc'))

export default {
  name: 'AddDataComponent',
  setup () {
    const SiteUpdates = ref([])
    const stringData = ref('')
    const arrayInput = ref('')
    const selectedColor = ref(null)
    const selectedDate = ref(null)
    const successMessage = ref('')
    const errorMessage = ref('')
    const games = ref([])

    const colorOptions = [
      { label: 'Красный', value: 'красный' },
      { label: 'Синий', value: 'синий' },
      { label: 'Зеленый', value: 'зеленый' }
    ]

    const addData = async () => {
      try {
        const arrayData = arrayInput.value.split(',').map(item => item.trim())

        const docRef = await addDoc(collection(db, 'trest'), {
          stringField: stringData.value,
          arrayField: arrayData,
          colorField: selectedColor.value,
          dateField: selectedDate.value
        })

        successMessage.value = `Данные успешно добавлены с ID: ${docRef.id}`
        errorMessage.value = ''
        stringData.value = ''
        arrayInput.value = ''
        selectedColor.value = null
        selectedDate.value = null

        // Обновляем список игр после добавления
        fetchGames()
      } catch (error) {
        errorMessage.value = `Ошибка при добавлении данных: ${error.message}`
        successMessage.value = ''
      }
    }
    onSnapshot(siteUpdateCollectionQuery, (querySnapshot) => {
      const fbSiteUpdates = []
      querySnapshot.forEach((doc) => {
        const SiteUpdate = {
          id: doc.id,
          arrayField: doc.data().arrayField,
          colorField: doc.data().colorField,
          stringField: doc.data().stringField,
          dateField: doc.data().dateField
        }
        fbSiteUpdates.push(SiteUpdate)
      })
      SiteUpdates.value = fbSiteUpdates
    })

    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'trest'))
        games.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      } catch (error) {
        console.error('Ошибка при получении данных: ', error)
      }
    }

    onMounted(() => {
      fetchGames()
    })

    return {
      SiteUpdates,
      stringData,
      arrayInput,
      selectedColor,
      selectedDate,
      colorOptions,
      addData,
      successMessage,
      errorMessage,
      games
    }
  }
}
</script>

<style scoped>
/* Ваши стили */
</style>
