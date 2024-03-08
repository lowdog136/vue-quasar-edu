<template>
  <q-tab :name=tabName :icon=tabIcon>{{ datenews }}
  </q-tab>
</template>

<script>
export default {
  name: 'tabFootDate',
  data () {
    return {
      tabIcon: 'event',
      tabName: 'event'
    }
  },
  props: {
    datenews: String
  }
}
</script>

<style scoped lang="sass">

</style>
