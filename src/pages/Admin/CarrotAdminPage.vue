<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 800px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img alt="logo" src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>
            CarrotAdminPage
          </q-toolbar-title>
          <q-btn to="/" color="black" flat round dense icon="first_page" />
          <q-toggle
            :false-value="false"
            :true-value="true"
            color="white"
            v-model="panelViewSiteUpdate"
            icon="sync_alt"
          />
          <q-btn @click="panelViewOnEventCard" @dblclick="panelViewOffEventCard" color="white" flat round dense icon="event" />
          <q-btn @click="panelViewOnResultCard" @dblclick="panelViewOffResultCard" color="white" flat round dense icon="smart_toy" />
          <q-toggle
            :false-value="false"
            :true-value="true"
            color="white"
            v-model="panelViewNewsCard"
            icon="help"
          />
        </q-toolbar>
      </q-header>
      <!--      Показать админку добавление обновления сайта-->
      <q-page-container v-if="panelViewSiteUpdate">
        <q-page padding>
          <p v-for="n in 1" :key="n">
            <NewsSiteContentAdd />
          </p>
        </q-page>
      </q-page-container>
      <!--      Показать админку добавление событий-->
      <q-page-container v-if="panelViewEvent">
        <q-page padding>
          <p v-for="n in 1" :key="n">
            <GamesNowEventAdd />
          </p>
        </q-page>
      </q-page-container>
      <!--      Показать админку добавление новостей-->
      <q-page-container v-if="panelViewNewsCard">
        <q-page padding>
          <p v-for="n in 1" :key="n">
            <NewsCardContentAdd />
      <!--            <ResultMatchAddDataAdmin />-->
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
    </q-layout>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import NewsCardContentAdd from 'components/Admin/NewsCardContentAdd'
import ResultMatchResultCardAddDataAdmin from 'components/ResultMatchResultCardAddDataAdmin'
import NewsSiteContentAdd from 'components/Admin/NewsSiteContentAdd'
import GamesNowEventAdd from 'components/Admin/GamesNowEventAdd'

export default defineComponent({
  name: 'CarrotAdminPage',
  components: { NewsCardContentAdd, ResultMatchResultCardAddDataAdmin, GamesNowEventAdd, NewsSiteContentAdd },
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
    panelViewOnSiteUpdate () {
      this.panelSiteUpdate = true
    },
    panelViewOffSiteUpdate () {
      this.panelSiteUpdate = false
    },
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
    },
    panelViewOnNewsCard () {
      this.panelViewItem = true
    },
    panelViewOffNewsCard () {
      this.panelViewItem = false
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
