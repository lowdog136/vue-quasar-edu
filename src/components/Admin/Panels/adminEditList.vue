<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <!-- Site Block - admin panel -->
      <admin-panel />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AdminPanel from 'components/Admin/Panels/sitePanel/sitePanel.vue'

export default {
  components: {
    AdminPanel
  },
  setup () {
    return {
      panel: ref('reset')
    }
  }
}
</script>
