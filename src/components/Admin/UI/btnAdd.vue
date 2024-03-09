<template>
  <q-btn :label='btnName' :color=btnColor :icon=btnIcon />
</template>

<script>
export default {
  name: 'btnAdd',
  data () {
    return {
      btnName: 'add event',
      btnIcon: 'post_add',
      btnColor: '#3498db'
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
