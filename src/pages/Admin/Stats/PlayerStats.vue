<template>
  <q-page class="admin-page">
    <div class="admin-page-header">
      <h1 class="admin-page-title">
        <q-icon name="person" class="q-mr-sm" />
        Статистика игроков
      </h1>
      <p class="admin-page-subtitle">Управление статистикой игроков</p>
    </div>

    <div class="admin-page-content">
      <AdminCard>
        <player-stats-manager />
      </AdminCard>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import AdminCard from 'components/Admin/UI/AdminCard.vue'
import PlayerStatsManager from 'components/Admin/Panels/sitePanel/functionsSitePanel/PlayerStatsManager.vue'

export default defineComponent({
  name: 'PlayerStats',
  components: {
    AdminCard,
    PlayerStatsManager
  }
})
</script>
