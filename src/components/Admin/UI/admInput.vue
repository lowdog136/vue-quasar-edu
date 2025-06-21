<template>
  <q-input
    :hint=inputHint
    :type="inputType"
    lazy-rules
    :mask="inputType === 'date' ? 'MMMM DD, YYYY' : undefined"
    :locale="inputType === 'date' ? 'ru' : undefined"
  />
</template>

<script>
export default {
  name: 'admInput',
  data () {
    return {
      btnColor: '#3498db'
    }
  },
  props: {
    inputModel: String,
    inputType: String,
    inputHint: String
  }
}
</script>

<style lang="sass" scoped>
</style>
