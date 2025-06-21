<template>
  <q-card class="q-pa-md" style="max-width: 500px">
    <q-card-section>
      <div class="text-h6">Добавить данные пользователю</div>
    </q-card-section>

    <q-card-section>
      <q-form @submit="submitData">
        <q-input
            v-model="userId"
            label="ID пользователя"
            outlined
            dense
            :rules="[val => !!val || 'Обязательное поле']"
        />

        <div v-for="(value, key, index) in mapData" :key="index" class="q-mt-sm row items-center">
          <q-input
              v-model="mapData[key].key"
              label="Ключ"
              outlined
              dense
              class="col"
          />
          <q-input
              v-model="mapData[key].value"
              label="Значение"
              outlined
              dense
              class="col q-ml-sm"
          />
          <q-btn
              icon="delete"
              flat
              dense
              color="negative"
              @click="removeField(index)"
              class="q-ml-sm"
          />
        </div>

        <q-btn
            icon="add"
            label="Добавить поле"
            @click="addField"
            class="q-mt-sm"
            color="primary"
            outline
        />

        <q-btn
            type="submit"
            label="Сохранить"
            color="primary"
            class="q-mt-md full-width"
            :loading="loading"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { doc, updateDoc, getFirestore } from 'firebase/firestore'

const $q = useQuasar()
const db = getFirestore()

const userId = ref('')
const mapData = ref([{ key: '', value: '' }])
const loading = ref(false)

const addField = () => {
  mapData.value.push({ key: '', value: '' })
}

const removeField = (index) => {
  if (mapData.value.length > 1) {
    mapData.value.splice(index, 1)
  } else {
    $q.notify({
      message: 'Должно остаться хотя бы одно поле',
      color: 'warning'
    })
  }
}

const submitData = async () => {
  try {
    loading.value = true

    // Преобразуем массив в объект (Map)
    const dataToSave = mapData.value.reduce((acc, item) => {
      if (item.key) acc[item.key] = item.value
      return acc
    }, {})

    // Обновляем документ пользователя const siteUpdateCollectionRef = collection(db, '/all-games')
    await updateDoc(doc(db, '/users', userId.value), {
      userData: dataToSave
    })

    $q.notify({
      message: 'Данные успешно сохранены',
      color: 'positive'
    })

    // Сброс формы
    userId.value = ''
    mapData.value = [{ key: '', value: '' }]
  } catch (error) {
    $q.notify({
      message: `Ошибка: ${error.message}`,
      color: 'negative'
    })
    console.error('Error saving data:', error)
  } finally {
    loading.value = false
  }
}
</script>
