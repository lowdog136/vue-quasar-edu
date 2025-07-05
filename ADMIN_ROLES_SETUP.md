# 🔐 Система ролей для админ панели

## Обзор

Система ролей позволяет контролировать доступ к админ панели и различным функциям приложения.

## 🏗️ Архитектура

### Роли пользователей

1. **Администратор** (`admin`)
   - Полный доступ к админ панели
   - Управление пользователями и ролями
   - Управление контентом и настройками
   - Доступ ко всем функциям

2. **Модератор** (`moderator`)
   - Доступ к админ панели
   - Управление контентом
   - Ограниченные права

3. **Пользователь** (`user`)
   - Обычный пользователь
   - Доступ только к основному функционалу
   - Нет доступа к админ панели

### Разрешения (Permissions)

```typescript
// Администратор
[
  'admin:read',
  'admin:write',
  'admin:delete',
  'admin:manage_users',
  'admin:manage_content',
  'admin:manage_settings'
]

// Модератор
[
  'admin:read',
  'admin:write',
  'admin:manage_content'
]

// Пользователь
[
  'user:read'
]
```

## 🚀 Настройка доступа

### 1. Создание Auth Store

Создан `src/stores/auth.ts` с полной системой управления ролями:

- Аутентификация пользователей
- Управление ролями в Firestore
- Проверка разрешений
- Middleware для защиты роутов

### 2. Middleware аутентификации

Создан `src/middleware/auth.ts` для проверки доступа:

```typescript
// Проверка аутентификации
if (!authStore.isAuthenticated) {
  next('/')
  return
}

// Проверка прав администратора
if (to.path.startsWith('/Admin')) {
  if (!authStore.isAdmin && !authStore.isModerator) {
    next('/')
    return
  }
}
```

### 3. Компоненты управления

- `UserRoleManager.vue` - управление ролями пользователей
- `MakeMeAdmin.vue` - быстрое назначение роли себе

## 📋 Как назначить себе роль администратора

### Способ 1: Через страницу MakeMeAdmin

1. Войдите в приложение
2. Перейдите на `/Admin/MakeMeAdmin`
3. Нажмите "Сделать администратором"
4. Готово! Теперь у вас есть доступ к админ панели

### Способ 2: Через Firebase Console

1. Откройте Firebase Console
2. Перейдите в Firestore Database
3. Найдите коллекцию `userRoles`
4. Создайте документ с вашим UID:
```json
{
  "uid": "ваш_uid",
  "email": "ваш_email@example.com",
  "role": "admin",
  "permissions": [
    "admin:read",
    "admin:write",
    "admin:delete",
    "admin:manage_users",
    "admin:manage_content",
    "admin:manage_settings"
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Способ 3: Программно

```typescript
import { useAuthStore } from 'src/stores/auth'

const authStore = useAuthStore()
await authStore.makeAdmin('ваш_uid')
```

## 🔧 Использование в компонентах

### Проверка роли

```vue
<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth'

const authStore = useAuthStore()

// Проверка роли
if (authStore.isAdmin) {
  // Показать админ функции
}

// Проверка разрешения
if (authStore.hasPermission('admin:manage_users')) {
  // Показать управление пользователями
}
</script>
```

### Условное отображение

```vue
<template>
  <div v-if="authStore.isAdmin">
    <!-- Админ функции -->
  </div>

  <div v-if="authStore.hasPermission('admin:manage_content')">
    <!-- Управление контентом -->
  </div>
</template>
```

## 🛡️ Безопасность

### Защита роутов

Все админ роуты защищены middleware:

```javascript
{
  path: '/Admin',
  meta: { requiresAuth: true },
  component: () => import('layouts/LayoutAdminPage.vue')
}
```

### Проверка на клиенте и сервере

- **Клиент**: Middleware проверяет роль перед навигацией
- **Сервер**: Firestore Security Rules (рекомендуется настроить)

### Firestore Security Rules (рекомендуется)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Коллекция ролей пользователей
    match /userRoles/{userId} {
      allow read: if request.auth != null &&
        (request.auth.uid == userId ||
         get(/databases/$(database)/documents/userRoles/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/userRoles/$(request.auth.uid)).data.role == 'admin';
    }

    // Админ коллекции
    match /adminPanelToDo/{document} {
      allow read, write: if request.auth != null &&
        get(/databases/$(database)/documents/userRoles/$(request.auth.uid)).data.role in ['admin', 'moderator'];
    }
  }
}
```

## 📁 Структура файлов

```
src/
├── stores/
│   ├── auth.ts              # Auth store с ролями
│   └── admin.ts             # Admin store
├── middleware/
│   └── auth.ts              # Middleware аутентификации
├── components/Admin/
│   └── UserRoleManager.vue  # Управление ролями
├── pages/Admin/
│   ├── MakeMeAdmin.vue      # Быстрое назначение роли
│   └── UserRoleManagerPage.vue # Страница управления
└── boot/
    └── pinia.ts             # Инициализация stores
```

## 🧪 Тестирование

1. **Войдите в приложение**
2. **Перейдите на `/Admin/MakeMeAdmin`**
3. **Нажмите "Сделать администратором"**
4. **Проверьте доступ к админ панели**

## 🔄 Миграция с Vuex

Система ролей полностью интегрирована с Pinia и заменяет старую систему аутентификации Vuex:

- ✅ Auth store с ролями
- ✅ Middleware защиты
- ✅ Компоненты управления
- ⏳ Постепенная миграция компонентов

## 📚 Ресурсы

- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
