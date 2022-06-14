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

          <q-btn @click="panelViewOnResultCard" @dblclick="panelViewOffResultCard" color="white" flat round dense icon="smart_toy" />
          <q-btn @click="panelViewOnNewsCard" @dblclick="panelViewOffNewsCard" color="white" flat round dense icon="help" />
        </q-toolbar>
      </q-header>

      <q-page-container v-if="panelViewItem">
        <q-page padding>
          <p v-for="n in 1" :key="n">
            <ResultMatchAddDataAdmin />
          </p>
        </q-page>
      </q-page-container>
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
import { defineComponent } from 'vue'
import ResultMatchAddDataAdmin from 'components/ResultMatchAddDataAdmin'
import ResultMatchResultCardAddDataAdmin from 'components/ResultMatchResultCardAddDataAdmin'

export default defineComponent({
  name: 'CarrotAdminPage',
  components: { ResultMatchAddDataAdmin, ResultMatchResultCardAddDataAdmin },
  data () {
    return {
      panelViewItem: false,
      panelViewItemResultCard: false,
      falseValue: false
    }
  },
  methods: {
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
