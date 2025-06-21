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
    />
    <q-btn @click="addData" label="Добавить данные" color="primary" />
    <q-banner v-if="successMessage" class="q-mt-md" color="green">
      {{ successMessage }}
    </q-banner>
    <q-banner v-if="errorMessage" class="q-mt-md" color="red">
      {{ errorMessage }}
    </q-banner>
  </div>
</template>

<script>
import { ref } from 'vue'
import { db } from 'src/firebase' // Импортируйте вашу настройку Firebase
import { collection, addDoc } from 'firebase/firestore'

export default {
  name: 'my-test',
  setup () {
    const stringData = ref('')
    const arrayInput = ref('')
    const selectedColor = ref(null)
    const selectedDate = ref(null)
    const successMessage = ref('')
    const errorMessage = ref('')

    const colorOptions = [
      { label: 'Красный', value: 'red' },
      { label: 'Синий', value: 'blue' },
      { label: 'Зеленый', value: 'green' }
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
      } catch (error) {
        errorMessage.value = `Ошибка при добавлении данных: ${error.message}`
        successMessage.value = ''
      }
    }

    return {
      stringData,
      arrayInput,
      selectedColor,
      selectedDate,
      colorOptions,
      addData,
      successMessage,
      errorMessage
    }
  }
}
</script>

<style scoped>
/* Ваши стили */
</style>
