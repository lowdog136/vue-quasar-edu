<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 800px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img alt="logo" src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>
            CarrotAdminPage (experiment panel)
          </q-toolbar-title>
          <q-btn to="/" color="black" flat round dense icon="first_page" />
          <q-btn @click="panelViewOnEventCard" @dblclick="panelViewOffEventCard" color="white" flat round dense icon="event" />
          <q-btn @click="panelViewOnResultCard" @dblclick="panelViewOffResultCard" color="white" flat round dense icon="smart_toy" />
        </q-toolbar>
      </q-header>
      <!--      Показать админку добавление событий-->
      <q-page-container v-if="panelViewEvent">
        <q-page padding>
          <p v-for="n in 1" :key="n">
            <GamesNowEventAdd />
          </p>
        </q-page>
      </q-page-container>
      <!--      Показать админку добавление результатов матчей-->
      <q-page-container v-if="panelViewItemResultCard">
        <q-page padding>
          <p v-for="n in 1" :key="n">
            <ResultMatchResultCardAddDataAdmin />
          </p>
        </q-page>
      </q-page-container>
<!--      <q-page-container>-->
<!--        <q-page padding>-->
<!--          <p v-for="n in 2" :key="n">-->
<!--            <TestCardComp />-->
<!--          </p>-->
<!--        </q-page>-->
<!--      </q-page-container>-->
    </q-layout>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import ResultMatchResultCardAddDataAdmin from 'components/ResultMatchResultCardAddDataAdmin'
import GamesNowEventAdd from 'components/Admin/Panels/sitePanel/functionsSitePanel/GamesNowEventAdd.vue'

export default defineComponent({
  name: 'CarrotAdminPage',
  components: { ResultMatchResultCardAddDataAdmin, GamesNowEventAdd },
  data () {
    return {
      panelSiteUpdate: false,
      panelViewEvent: false,
      panelViewItem: false,
      panelViewItemResultCard: false,
      falseValue: false
    }
  },
  setup () {
    return {
      panelViewSiteUpdate: ref(false),
      panelViewNewsCard: ref(false)
    }
  },
  methods: {
    panelViewOnEventCard () {
      this.panelViewEvent = true
    },
    panelViewOffEventCard () {
      this.panelViewEvent = false
    },
    panelViewOnResultCard () {
      this.panelViewItemResultCard = true
    },
    panelViewOffResultCard () {
      this.panelViewItemResultCard = false
    }
  },
  props: {
    product_data: {
      type: Object,
      default () {
        return {
          NewsClubNewsCardStatus: String
        }
      }
    }
  }
})
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
