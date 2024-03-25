<template>
  <q-tab-panel :name=tabName>
    <div class="text-h6">{{ tabClassTitle }}</div>
    {{ compProps }}
  </q-tab-panel>
</template>

<script>
export default {
  name: 'tabPanel',
  data () {
    return {
      btnColor: '#3498db'
    }
  },
  props: {
    tabName: String,
    tabClassTitle: String,
    compProps: String
  }
}
</script>

<style lang="sass" scoped>
</style>
