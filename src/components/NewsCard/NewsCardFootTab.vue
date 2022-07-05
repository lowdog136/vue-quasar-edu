<template>
  <div :class=divclass>
    <q-tabs
      v-model="tab"
      class="white text-primary shadow-2"
    >
      <q-tab name="event" icon="event">{{ datenews }}
      </q-tab>
      <q-tab name="star" @click={countUpEvent} icon="star" label="Оценить">
        <q-badge color="dark"  text-color="white" floating>{{ count }}</q-badge>
      </q-tab>
    </q-tabs>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'NewsCardFootTab',
  components: {},
  setup () {
    return {
      tab: ref('event')
    }
  },
  props: {
    datenews: String,
    count: String,
    divclass: String,
    countUpEvent: String
  }
}
</script>

<style scoped>

</style>
