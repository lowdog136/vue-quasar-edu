<template>
  <q-page class="admin-page">
    <div class="admin-page-header">
      <h1 class="admin-page-title">
        <q-icon name="sports_soccer" class="q-mr-sm" />
        Редактор игр
      </h1>
      <p class="admin-page-subtitle">Добавление, правка, удаление игр</p>
    </div>

    <div class="admin-page-content">
      <AdminCard>
        <games-now-event-edit />
      </AdminCard>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import AdminCard from 'components/Admin/UI/AdminCard.vue'
import GamesNowEventEdit from 'components/Admin/Panels/sitePanel/functionsSitePanel/games-now-event-edit.vue'

export default defineComponent({
  name: 'GamesEditor',
  components: {
    AdminCard,
    GamesNowEventEdit
  }
})
</script>
