<template>
  <q-tab :name=tabName :icon=tabIcon />
</template>

<script>
export default {
  name: 'tabFootDelete',
  data () {
    return {
      tabName: 'delete',
      tabIcon: 'delete'
    }
  }
}
</script>

<style scoped lang="sass">

</style>
