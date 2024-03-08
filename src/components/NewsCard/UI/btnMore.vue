<template>
  <q-btn :label='btnName' :color=btnColor :size=btnSize />
</template>

<script>
export default {
  name: 'btnMore',
  data () {
    return {}
  },
  props: {
    btnSize: String,
    btnName: String,
    btnColor: String
  }
}
</script>

<style scoped lang="sass">

</style>
