# 🔄 Pinia Migration Guide

## Обзор

Этот документ описывает процесс миграции с Vuex на Pinia для проекта Vue-Quasar-Edu.

## ✅ Что уже сделано

### 1. Установка и настройка
- ✅ Установлен Pinia: `npm install pinia`
- ✅ Создан boot файл: `src/boot/pinia.ts`
- ✅ Добавлен в quasar.conf.js
- ✅ Настроен TypeScript parser для ESLint

### 2. Создан Admin Store
- ✅ `src/stores/admin.ts` - store для админ панели
- ✅ Полная интеграция с Firestore
- ✅ TypeScript типизация
- ✅ Real-time синхронизация

### 3. Тестовая страница
- ✅ `src/pages/TestPinia.vue` - для тестирования store
- ✅ Роут `/TestPinia` добавлен

## 🏗️ Архитектура Store

### Admin Store (`src/stores/admin.ts`)

```typescript
interface AdminToDo {
  id: string
  title: string
  category: string
  priority: string
  done: boolean
  body: string[]
  color: string
  date: Timestamp
}
```

**State:**
- `adminToDos: AdminToDo[]` - список задач
- `loading: boolean` - состояние загрузки
- `error: string | null` - ошибки

**Getters:**
- `activeToDos` - активные задачи
- `completedToDos` - завершенные задачи
- `todosByCategory` - группировка по категориям

**Actions:**
- `fetchToDos()` - загрузка данных из Firestore
- `addToDo(todoData)` - добавление задачи
- `updateToDo(id, updates)` - обновление задачи
- `deleteToDo(id)` - удаление задачи
- `toggleToDoDone(id)` - переключение статуса
- `clearError()` - очистка ошибок

## 🚀 Использование в компонентах

### Composition API (рекомендуется)

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminStore } from 'src/stores/admin'

const adminStore = useAdminStore()
const { adminToDos, loading, error } = storeToRefs(adminStore)

onMounted(() => {
  adminStore.fetchToDos()
})
</script>
```

### Options API

```vue
<script>
import { useAdminStore } from 'src/stores/admin'

export default {
  setup() {
    const adminStore = useAdminStore()
    return { adminStore }
  },
  mounted() {
    this.adminStore.fetchToDos()
  }
}
</script>
```

## 📋 Следующие шаги

### 1. Миграция компонентов админ панели
- [ ] `adminPanelToDoList.vue` → `adminPanelToDoListPinia.vue`
- [ ] `adminPanelToDoAdd.vue` → `adminPanelToDoAddPinia.vue`
- [ ] `adminPanelToDoInfo.vue` → `adminPanelToDoInfoPinia.vue`

### 2. Создание других stores
- [ ] Auth Store (аутентификация)
- [ ] Games Store (игры и события)
- [ ] News Store (новости)
- [ ] UI Store (локальные состояния)

### 3. Постепенная миграция
- [ ] Заменить Vuex в компонентах на Pinia
- [ ] Обновить импорты и использование
- [ ] Удалить Vuex после полной миграции

## 🧪 Тестирование

1. Запустите приложение: `quasar dev`
2. Перейдите на `/TestPinia`
3. Проверьте:
   - Загрузку данных из Firestore
   - Добавление новых задач
   - Обновление статуса задач
   - Обработку ошибок

## 🔧 Отладка

### Проблемы с TypeScript
- Убедитесь, что `supportTS: true` в quasar.conf.js
- Проверьте ESLint конфигурацию для .ts файлов
- Используйте `storeToRefs()` для реактивности

### Проблемы с Firestore
- Проверьте подключение к Firebase
- Убедитесь в правильности коллекций
- Проверьте права доступа

## 📚 Ресурсы

- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
