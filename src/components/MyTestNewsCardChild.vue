<template>
  <div class="my-card">
    {{ tovars_data.name }}
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'MyTestNewsCardChild',
  components: {},
  data () {
    return {
      dialog: ref(false),
      cancelEnabled: ref(false),
      expanded: ref(false),
      dateNews222: '14.03.22'
    }
  },
  props: {
    tovars_data: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 650px
</style>
