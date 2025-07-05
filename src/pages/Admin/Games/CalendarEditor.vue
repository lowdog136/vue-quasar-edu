<template>
  <q-page class="admin-page">
    <div class="admin-page-header">
      <h1 class="admin-page-title">
        <q-icon name="calendar_today" class="q-mr-sm" />
        Календарь игр
      </h1>
      <p class="admin-page-subtitle">Правка в календаре игр</p>
    </div>

    <div class="admin-page-content">
      <AdminCard>
        <calendar-games-edit />
      </AdminCard>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import AdminCard from 'components/Admin/UI/AdminCard.vue'
import CalendarGamesEdit from 'components/Admin/Panels/sitePanel/functionsSitePanel/calendar-games-edit.vue'

export default defineComponent({
  name: 'CalendarEditor',
  components: {
    AdminCard,
    CalendarGamesEdit
  }
})
</script>
