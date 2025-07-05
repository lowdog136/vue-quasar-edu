<template>
  <q-page class="admin-page">
    <div class="admin-page-header">
      <h1 class="admin-page-title">
        <q-icon name="schedule" class="q-mr-sm" />
        Правка дат
      </h1>
      <p class="admin-page-subtitle">Правка дат в NewsDrawer и countdown</p>
    </div>

    <div class="admin-page-content">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-lg-6">
          <AdminCard title="Обновление дат NewsDrawer">
            <NewsDrawerGNEDateUpdate />
          </AdminCard>
        </div>
        <div class="col-12 col-lg-6">
          <AdminCard title="Обновление дат NewsDrawer GNT">
            <NewsDrawerGNTDateUpdate />
          </AdminCard>
        </div>
        <div class="col-12">
          <AdminCard title="Обратный отсчет до событий">
            <CountDown2Events />
          </AdminCard>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import AdminCard from 'components/Admin/UI/AdminCard.vue'
import NewsDrawerGNEDateUpdate from 'components/Admin/Panels/sitePanel/functionsSitePanel/NewsDrawerGNEDateUpdate.vue'
import NewsDrawerGNTDateUpdate from 'components/Admin/Panels/sitePanel/functionsSitePanel/NewsDrawerGNTDateUpdate.vue'
import CountDown2Events from 'components/Admin/Panels/sitePanel/functionsSitePanel/CountDown2Events.vue'

export default defineComponent({
  name: 'DateEditor',
  components: {
    AdminCard,
    NewsDrawerGNEDateUpdate,
    NewsDrawerGNTDateUpdate,
    CountDown2Events
  }
})
</script>
