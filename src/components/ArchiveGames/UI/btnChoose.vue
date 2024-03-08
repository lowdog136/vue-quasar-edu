<template>
  <q-btn :label=btnLabel :type=btnType :color=btnColor />
</template>

<script>
export default {
  name: 'btnChoose',
  data () {
    return {
      btnType: 'submit',
      btnLabel: 'Выбрать',
      btnColor: 'primary'
    }
  }
}
</script>

<style scoped lang="sass">

</style>
