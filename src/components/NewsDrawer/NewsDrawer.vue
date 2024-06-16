<template>
  <div class="q-pa-md" style="max-width: 350px">
    <news-drawer-home />
    <news-drawer-club />
    <news-drawer-event />
<!--    Текущие соревнования-->
    <q-expansion-item
      v-model="expanded"
      icon="perm_identity"
      label="Архив"
      caption="Фото, видео, результаты матчей"
    >
      <q-item clickable v-ripple :active="active" to="/Foto">
        <q-item-section avatar>
          <q-icon name="camera_alt" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $store.state.NavigationListMenu[6].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[6].Caption }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple disable :active="active" to="/Video">
        <q-item-section avatar>
          <q-icon name="movie" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $store.state.NavigationListMenu[7].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[7].Caption }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active" to="/ArchiveGamesBefore">
        <q-item-section avatar>
          <q-icon name="find_in_page" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $store.state.NavigationListMenu[16].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[16].Caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>
    <news-drawer-fanat />
    <news-drawer-contact />
    <news-drawer-site />
  </div>
</template>

<script>
import NewsDrawerClub from 'components/NewsDrawer/Club/newsDrawerClub.vue'
import NewsDrawerEvent from 'components/NewsDrawer/Events/newsDrawerEvent.vue'
import NewsDrawerHome from 'components/NewsDrawer/Home/newsDrawerHome.vue'
import NewsDrawerFanat from 'components/NewsDrawer/Fanats/newsDrawerFanat.vue'
import NewsDrawerContact from 'components/NewsDrawer/Contacts/newsDrawerContact.vue'
import NewsDrawerSite from 'components/NewsDrawer/Site/newsDrawerSite.vue'

export default {
  name: 'NewsDrawer',
  components: { NewsDrawerSite, NewsDrawerContact, NewsDrawerFanat, NewsDrawerHome, NewsDrawerEvent, NewsDrawerClub },
  setup () {
    return {
      labelAboutSite: 'О сайте'
    }
  },
  props: {
    text: String
  }
}
</script>

<style scoped>

</style>
