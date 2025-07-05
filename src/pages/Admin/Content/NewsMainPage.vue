<template>
  <q-page class="admin-page">
    <div class="admin-page-header">
      <h1 class="admin-page-title">
        <q-icon name="article" class="q-mr-sm" />
        Новость на главную
      </h1>
      <p class="admin-page-subtitle">Добавление новостей о команде на главную страницу</p>
    </div>

    <div class="admin-page-content">
      <AdminCard>
        <NewsCardContentAdd />
      </AdminCard>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import AdminCard from 'components/Admin/UI/AdminCard.vue'
import NewsCardContentAdd from 'components/Admin/Panels/sitePanel/functionsSitePanel/NewsCardContentAdd.vue'

export default defineComponent({
  name: 'NewsMainPage',
  components: {
    AdminCard,
    NewsCardContentAdd
  }
})
</script>
