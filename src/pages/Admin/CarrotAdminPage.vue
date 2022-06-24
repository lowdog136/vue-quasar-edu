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
          <q-btn @click="panelViewOnEventCard" @dblclick="panelViewOffEventCard" color="white" flat round dense icon="event" />
          <q-btn @click="panelViewOnResultCard" @dblclick="panelViewOffResultCard" color="white" flat round dense icon="smart_toy" />
          <q-btn @click="panelViewOnNewsCard" @dblclick="panelViewOffNewsCard" color="white" flat round dense icon="help" />
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
      <!--      Показать админку добавление новостей-->
      <q-page-container v-if="panelViewItem">
        <q-page padding>
          <p v-for="n in 1" :key="n">
            <ResultMatchAddDataAdmin />
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
import ResultMatchAddDataAdmin from 'components/ResultMatchAddDataAdmin'
import ResultMatchResultCardAddDataAdmin from 'components/ResultMatchResultCardAddDataAdmin'
import GamesNowEventAdd from 'components/Admin/GamesNowEventAdd'

export default defineComponent({
  name: 'CarrotAdminPage',
  components: { ResultMatchAddDataAdmin, ResultMatchResultCardAddDataAdmin, GamesNowEventAdd },
  data () {
    return {
      panelViewEvent: false,
      panelViewItem: false,
      panelViewItemResultCard: false,
      falseValue: false
    }
  },
  setup () {
    return {
      redModel: ref('panelViewEvent')
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
