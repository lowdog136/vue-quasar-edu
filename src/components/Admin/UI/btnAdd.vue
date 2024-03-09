<template>
  <q-btn :label='btnName' :color=btnColor :icon=btnIcon flat/>
</template>

<script>
export default {
  name: 'btnAdd',
  data () {
    return {
      btnColor: '#3498db'
    }
  },
  props: {
    btnSize: String,
    btnName: String,
    btnIcon: String
  }
}
</script>

<style lang="sass" scoped>
</style>
