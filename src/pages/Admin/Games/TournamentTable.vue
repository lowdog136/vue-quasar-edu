<template>
  <q-page class="admin-page">
    <div class="admin-page-header">
      <h1 class="admin-page-title">
        <q-icon name="table_chart" class="q-mr-sm" />
        Турнирная таблица
      </h1>
      <p class="admin-page-subtitle">Редактирование турнирной таблицы</p>
    </div>

    <div class="admin-page-content">
      <AdminCard>
        <event-table-editor />
      </AdminCard>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import AdminCard from 'components/Admin/UI/AdminCard.vue'
import EventTableEditor from 'components/Admin/Tables/EventTableEditor.vue'

export default defineComponent({
  name: 'TournamentTable',
  components: {
    AdminCard,
    EventTableEditor
  }
})
</script>
