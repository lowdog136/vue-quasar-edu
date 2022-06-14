<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 800px" class="shadow-2 rounded-borders">
    </q-layout>
  </div>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProfilePage',
  components: {},
  data () {
    return {
      panelViewItem: false,
      falseValue: false
    }
  },
  methods: {
    panelViewOn () {
      this.panelViewItem = true
    },
    panelViewOff () {
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
