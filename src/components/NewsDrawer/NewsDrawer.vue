<template>
  <div class="q-pa-md" style="max-width: 350px">
    <news-drawer-home />
    <news-drawer-club />
    <news-drawer-event />
<!--    Текущие соревнования-->
    <news-drawer-archive />
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
import NewsDrawerArchive from 'components/NewsDrawer/Archives/newsDrawerArchive.vue'

export default {
  name: 'NewsDrawer',
  components: { NewsDrawerArchive, NewsDrawerSite, NewsDrawerContact, NewsDrawerFanat, NewsDrawerHome, NewsDrawerEvent, NewsDrawerClub },
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
