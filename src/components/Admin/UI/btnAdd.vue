<template>
  <q-btn :label='btnName' :color=btnColor :size=btnSize />
</template>

<script>
export default {
  name: 'btnAdd',
  data () {
    return {
      btnName: 'add event',
      btnColor: '#3498db'
    }
  }
}
</script>

<style lang="sass" scoped>
  button
    background-color: #3498db
    padding: 10px 20px
    margin-top: 10px
    border: none
    color: white
</style>
