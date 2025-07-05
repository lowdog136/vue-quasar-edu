<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">Тест Pinia Store</div>

    <!-- Loading -->
    <q-card v-if="loading" class="q-mb-md">
      <q-card-section>
        <q-spinner-dots size="50px" color="primary" />
        <div class="text-h6">Загрузка...</div>
      </q-card-section>
    </q-card>

    <!-- Error -->
    <q-banner v-if="error" class="text-white bg-negative q-mb-md">
      {{ error }}
      <template v-slot:action>
        <q-btn flat color="white" label="Закрыть" @click="clearError" />
      </template>
    </q-banner>

    <!-- Data -->
    <q-card v-if="!loading">
      <q-card-section>
        <div class="text-h6">Admin ToDos ({{ adminToDos.length }})</div>

        <q-list>
          <q-item v-for="todo in adminToDos" :key="todo.id">
            <q-item-section>
              <q-item-label>{{ todo.title }}</q-item-label>
              <q-item-label caption>{{ todo.category }} - {{ todo.priority }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-chip :color="todo.done ? 'positive' : 'grey'" text-color="white">
                {{ todo.done ? 'Завершено' : 'Активно' }}
              </q-chip>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Actions -->
    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">Действия</div>
        <q-btn @click="fetchToDos" color="primary" class="q-mr-md">
          Обновить данные
        </q-btn>
        <q-btn @click="addTestTodo" color="secondary">
          Добавить тестовую задачу
        </q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminStore } from 'src/stores/admin'

const adminStore = useAdminStore()
const { adminToDos, loading, error } = storeToRefs(adminStore)

const { fetchToDos, addToDo, clearError } = adminStore

const addTestTodo = async () => {
  try {
    await addToDo({
      title: 'Тестовая задача ' + new Date().toLocaleTimeString(),
      category: 'Тест',
      priority: 'Средний',
      done: false,
      body: ['Описание тестовой задачи'],
      color: 'primary',
      date: new Date()
    })
  } catch (err) {
    console.error('Error adding todo:', err)
  }
}

onMounted(() => {
  fetchToDos()
})
</script>
