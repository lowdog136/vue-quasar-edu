<template>
  <q-page class="admin-page">
    <div class="admin-page-header">
      <h1 class="admin-page-title">
        <q-icon name="update" class="q-mr-sm" />
        Обновление сайта
      </h1>
      <p class="admin-page-subtitle">Добавление новостей об обновлении на сайте</p>
    </div>

    <div class="admin-page-content">
      <AdminCard>
        <NewsSiteContentAdd />
      </AdminCard>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import AdminCard from 'components/Admin/UI/AdminCard.vue'
import NewsSiteContentAdd from 'components/Admin/Panels/sitePanel/functionsSitePanel/NewsSiteContentAdd.vue'

export default defineComponent({
  name: 'SiteUpdate',
  components: {
    AdminCard,
    NewsSiteContentAdd
  }
})
</script>
