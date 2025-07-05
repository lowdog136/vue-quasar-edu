# AdminLayout Documentation

## Обзор

Новый AdminLayout предоставляет единый, современный дизайн для всех админских страниц с улучшенной навигацией, breadcrumbs и адаптивным интерфейсом.

## Компоненты

### AdminLayout

Основной layout компонент для админских страниц.

**Особенности:**
- Современный градиентный header
- Боковая навигация с группировкой разделов
- Breadcrumbs для навигации
- Адаптивный дизайн
- Интеграция с UserProfileMenu

**Использование:**
```vue
<template>
  <AdminLayout />
</template>

<script>
import AdminLayout from 'components/Admin/UI/AdminLayout.vue'

export default {
  components: { AdminLayout }
}
</script>
```

### AdminCard

Универсальный компонент карточки для админского интерфейса.

**Props:**
- `title` (String) - Заголовок карточки
- `subtitle` (String) - Подзаголовок
- `icon` (String) - Иконка
- `iconColor` (String) - Цвет иконки
- `iconSize` (String) - Размер иконки
- `elevation` (Number) - Тень карточки
- `flat` (Boolean) - Плоская карточка
- `loading` (Boolean) - Состояние загрузки
- `variant` (String) - Вариант: default, success, warning, error, info
- `padding` (String) - Отступы: none, sm, md, lg

**Slots:**
- `default` - Основной контент
- `header` - Действия в заголовке
- `actions` - Действия внизу карточки

**Пример:**
```vue
<AdminCard
  title="Статистика"
  subtitle="Основные метрики"
  icon="analytics"
  variant="info"
>
  <div class="text-h3">1,234</div>
  <div class="text-caption">Пользователей</div>
</AdminCard>
```

### AdminButton

Улучшенная кнопка для админского интерфейса.

**Props:**
- `label` (String) - Текст кнопки
- `icon` (String) - Иконка
- `color` (String) - Цвет кнопки
- `loading` (Boolean) - Состояние загрузки
- `disabled` (Boolean) - Отключена
- `size` (String) - Размер: xs, sm, md, lg, xl
- `variant` (String) - Вариант: default, success, warning, error, info
- `outline` (Boolean) - Контурная кнопка
- `flat` (Boolean) - Плоская кнопка

**Events:**
- `click` - Клик по кнопке

**Пример:**
```vue
<AdminButton
  icon="add"
  label="Добавить"
  variant="success"
  @click="handleAdd"
/>
```

## Структура навигации

### Основные разделы:
1. **Dashboard** - Главная страница админки
2. **Управление контентом**
   - Редактор игр
   - Новости сайта
   - Новости клуба
3. **Система**
   - Настройки
   - Инициализация таблиц
4. **Пользователи**
   - Управление ролями
   - Назначить администратора
5. **Аналитика**
   - Статистика
   - Отчеты

## Адаптивность

Layout автоматически адаптируется под различные размеры экранов:

- **Desktop (>768px)**: Полная навигация с боковой панелью
- **Tablet (768px)**: Скрытие breadcrumbs, уменьшение отступов
- **Mobile (<480px)**: Полноширинные кнопки, минимальные отступы

## Интеграция

### Обновление существующих страниц

Для использования нового AdminLayout в существующих страницах:

1. Замените старые компоненты на новые:
```vue
<!-- Старый способ -->
<q-card>
  <q-card-section>
    <div class="text-h6">Заголовок</div>
  </q-card-section>
</q-card>

<!-- Новый способ -->
<AdminCard title="Заголовок">
  <!-- контент -->
</AdminCard>
```

2. Используйте AdminButton вместо обычных кнопок:
```vue
<!-- Старый способ -->
<q-btn color="primary" label="Действие" />

<!-- Новый способ -->
<AdminButton label="Действие" variant="success" />
```

### Добавление новых страниц

1. Создайте страницу в `src/pages/Admin/`
2. Добавьте маршрут в `src/router/routes.js`
3. Используйте AdminCard и AdminButton для единообразного дизайна

## Стилизация

Все компоненты используют SCSS с переменными для легкой кастомизации:

```scss
// Основные цвета
$admin-primary: #667eea;
$admin-success: #4caf50;
$admin-warning: #ff9800;
$admin-error: #f44336;
$admin-info: #2196f3;

// Отступы
$admin-padding-sm: 12px;
$admin-padding-md: 16px;
$admin-padding-lg: 24px;
```

## Миграция

### Шаги миграции:

1. **Обновлен LayoutAdminPage** - теперь использует AdminLayout
2. **Создан Dashboard** - главная страница админки
3. **Добавлены UI компоненты** - AdminCard, AdminButton
4. **Обновлены маршруты** - добавлен маршрут для Dashboard

### Следующие шаги:

1. Обновить существующие админские страницы для использования новых компонентов
2. Добавить реальные данные в Dashboard
3. Создать дополнительные UI компоненты по необходимости
4. Добавить анимации и переходы

## Совместимость

- Vue 3
- Quasar Framework 2.x
- Pinia (для состояния)
- Vue Router 4.x

## Производительность

- Ленивая загрузка компонентов
- Оптимизированные стили
- Минимальные перерисовки
- Кэширование маршрутов
