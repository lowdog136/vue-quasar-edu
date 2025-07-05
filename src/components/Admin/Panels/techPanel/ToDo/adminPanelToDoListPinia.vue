<template>
  <div>
    <!-- Loading indicator -->
    <q-inner-loading :showing="loading">
      <q-spinner-dots size="50px" color="primary" />
    </q-inner-loading>

    <!-- Error message -->
    <q-banner v-if="error" class="text-white bg-negative q-mb-md">
      {{ error }}
      <template v-slot:action>
        <q-btn flat color="white" label="Закрыть" @click="adminStore.clearError" />
      </template>
    </q-banner>

    <!-- ToDo items -->
    <div class="q-pa-md row items-start q-gutter-md"
         v-for="todo in adminToDos"
         :key="todo.id"
    >
      <q-card dark bordered class="bg-grey-9 my-card"
              v-if="todo.done"
      >
        <q-card-section horizontal :class="todo.color">
          <q-card-section>
            {{ todo.category }}
          </q-card-section>

          <q-separator vertical />

          <q-card-section class="col-4">
            {{ todo.priority }}
          </q-card-section>
          <q-separator vertical />

          <q-card-section class="col-4">
            <btn-add
              @click="adminStore.toggleToDoDone(todo.id)"
              :btn-name="btnName"
              :btn-icon="btnIcon"
            />
          </q-card-section>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">{{ todo.title }}</div>
          <div class="text-subtitle2">{{ todo.category }}</div>
          <div class="text-subtitle2">{{ todo.done }}</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section
          v-for="body in todo.body"
          :key="body"
        >
          {{ body }}
        </q-card-section>
      </q-card>
    </div>

    <!-- Empty state -->
    <div v-if="isEmpty" class="text-center q-pa-lg">
      <q-icon name="task_alt" size="100px" color="grey-5" />
      <div class="text-h6 text-grey-6 q-mt-md">Нет завершенных задач</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminStore } from 'src/stores/admin'
import BtnAdd from 'components/Admin/UI/btnAdd.vue'

// Store
const adminStore = useAdminStore()

// Destructure store for reactivity
const { adminToDos, loading, error } = storeToRefs(adminStore)

// Component data
const btnIcon = 'done'
const btnName = 'done'

// Computed
const isEmpty = computed(() => !loading.value && adminToDos.value.length === 0)

// Lifecycle
onMounted(() => {
  adminStore.fetchToDos()
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
