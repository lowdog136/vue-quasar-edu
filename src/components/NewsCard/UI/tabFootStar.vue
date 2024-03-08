<template>
  <q-tab name="star" :icon=tabIcon :label=tabName>
    <q-badge :color=bdgeColor  :text-color=bdgeTextColor floating>{{ tabFootStarRating }}</q-badge>
  </q-tab>
</template>

<script>
export default {
  name: 'tabFootStar',
  data () {
    return {
      bdgeColor: 'dark',
      bdgeTextColor: 'white'
    }
  },
  props: {
    tabFootStarRating: String,
    tabIcon: String,
    tabName: String,
    btnColor: String
  }
}
</script>

<style scoped lang="sass">

</style>
