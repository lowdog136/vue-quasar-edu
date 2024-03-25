<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <!--      Site Block - admin panel-->
      <admin-panel />
      <q-separator color="orange" inset />
      <!--      To Do Block - tech panel-->
      <tech-panel />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import TechPanel from 'components/Admin/Panels/techPanel/techPanel.vue'
import AdminPanel from 'components/Admin/Panels/sitePanel/sitePanel.vue'
export default {
  components: {
    AdminPanel,
    TechPanel
  },
  data () {
    return {
      tabNameInfo: 'todoInfo'
    }
  },
  setup () {
    return {
      panel: ref('reset'),
      techPanel: ref('reset')
    }
  }
}
</script>
