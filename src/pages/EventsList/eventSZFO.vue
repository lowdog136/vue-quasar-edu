<template>
  <div class="q-pa-md">
    <events-s-z-f-o />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import EventsSZFO from 'components/EventsList/eventsSZFO.vue'

export default defineComponent({
  name: 'PageIndex',
  components: { EventsSZFO }
})
</script>
