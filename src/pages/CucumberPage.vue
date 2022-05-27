<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 800px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img alt="logo" src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>
            CucumberPage
          </q-toolbar-title>

          <q-btn flat round dense icon="whatshot" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <LogoPast />
      </q-page-container>
    </q-layout>
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import LogoPast from 'components/LogoPast'

export default defineComponent({
  name: 'CarrotPage',
  components: { LogoPast },
  data () {
    return {
      trueValue: true,
      falseValue: false
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
