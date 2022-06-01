<template>
  <div>
    <h4> page UserName</h4>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  components: {},
  setup () {
    return {
      testCount: 0,
      expanded: ref(false)
    }
  },
  props: {}
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
