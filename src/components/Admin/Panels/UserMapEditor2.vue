<template>
  <q-card class="q-pa-md" style="max-width: 500px">
    <q-card-section>
      <div class="text-h6">Добавить данные пользователю</div>
      <div class="text-caption text-grey">Документ будет создан автоматически</div>
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

        <div v-for="(field, index) in mapData" :key="index" class="q-mt-sm row items-center">
          <q-input
            v-model="field.key"
            label="Ключ"
            outlined
            dense
            class="col"
            :rules="[val => !!val || 'Обязательное поле']"
          />
          <q-input
            v-model="field.value"
            label="Значение"
            outlined
            dense
            class="col q-ml-sm"
          />
          <q-btnur
            icon="delete"
            flat
            dense
            color="negative"
            @click="removeField(index)"
            class="q-ml-sm"
          />
        </div>

        <div class="row q-mt-sm">
          <q-btn
            icon="add"
            label="Добавить поле"
            @click="addField"
            color="primary"
            outline
          />
          <q-space />
          <q-btn
            label="Очистить"
            @click="resetForm"
            color="grey"
            flat
          />
        </div>

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
import { doc, setDoc, getFirestore } from 'firebase/firestore'

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

const resetForm = () => {
  userId.value = ''
  mapData.value = [{ key: '', value: '' }]
}

const submitData = async () => {
  try {
    loading.value = true

    // Проверяем заполненность всех ключей
    const hasEmptyKeys = mapData.value.some(field => !field.key.trim())
    if (hasEmptyKeys) {
      throw new Error('Все ключи должны быть заполнены')
    }

    // Создаем объект для сохранения
    const scorer = mapData.value.reduce((acc, field) => {
      acc[field.key.trim()] = field.value
      return acc
    }, {})

    // Создаем/обновляем документ пользователя
    await setDoc(
      doc(db, 'all-games', userId.value),
      {
        scorer,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { merge: true } // Объединяем с существующими данными
    )

    $q.notify({
      message: 'Данные успешно сохранены',
      color: 'positive',
      icon: 'check_circle'
    })

    resetForm()
  } catch (error) {
    $q.notify({
      message: error.message || 'Ошибка при сохранении',
      color: 'negative',
      icon: 'error'
    })
    console.error('Error saving data:', error)
  } finally {
    loading.value = false
  }
}
</script>
