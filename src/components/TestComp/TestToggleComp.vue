<template>
  <div class="q-pa-md">
    <q-toggle
      v-model='value'
      color="primary"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'TestToggleComp',
  setup () {
    return {
      value: ref(true)
    }
  },
  props: {
    greetingDone: {
      type: [Boolean],
      required: true
    }
  }
}
</script>

<style scoped>

</style>
