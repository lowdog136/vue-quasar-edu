<template>
  <q-page class="admin-page">
    <div class="admin-page-header">
      <h1 class="admin-page-title">
        <q-icon name="palette" class="q-mr-sm" />
        Оформление главной
      </h1>
      <p class="admin-page-subtitle">Выбор оформления главной страницы</p>
    </div>

    <div class="admin-page-content">
      <AdminCard>
        <change-main-page-logo />
      </AdminCard>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import AdminCard from 'components/Admin/UI/AdminCard.vue'
import ChangeMainPageLogo from 'components/Admin/Panels/sitePanel/functionsSitePanel/changeMainPageLogo.vue'

export default defineComponent({
  name: 'MainPageDesign',
  components: {
    AdminCard,
    ChangeMainPageLogo
  }
})
</script>
