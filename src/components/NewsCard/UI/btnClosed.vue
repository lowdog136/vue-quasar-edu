<template>
  <q-btn v-close-popup :label=btnName :color=btnColor />
</template>

<script>
export default {
  data () {
    return {
      btnName: 'Закрыть',
      btnColor: 'primary'
    }
  }
}
</script>

<style scoped lang="sass">

</style>
