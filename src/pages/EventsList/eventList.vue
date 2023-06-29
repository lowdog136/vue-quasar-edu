<template>
  <div class="q-pa-md">
    <events-s-z-f-o />
    <cup-s-z-f-o />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import EventsSZFO from 'components/EventsList/eventsSZFO.vue'
import CupSZFO from 'components/EventsList/cupSZFO.vue'

export default defineComponent({
  name: 'PageIndex',
  components: { CupSZFO, EventsSZFO }
})
</script>
