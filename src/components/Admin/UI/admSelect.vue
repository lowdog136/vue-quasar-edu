<template>
  <q-select
    :name=selectName
    :color=selectColor
    filled
    clearable
    :label=selectLabel
  />
</template>

<script>
export default {
  name: 'admSelect',
  data () {
    return {
      btnColor: '#3498db'
    }
  },
  props: {
    selectName: String,
    selectColor: String,
    selectLabel: String
  }
}
</script>

<style lang="sass" scoped>
</style>
