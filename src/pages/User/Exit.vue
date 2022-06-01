<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <h4>Exit page</h4>
    <q-card class="my-card" flat>
      <q-card-section flat>
      </q-card-section>
    </q-card>
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
