<template>
  <div class="q-pa-md">
    <silence-table />
  </div>
</template>

<script>
import SilenceTable from 'components/Admin/Tables/silence-table.vue'

export default {
  components: { SilenceTable },
  setup () {
    return {}
  }
}
</script>
<style lang="sass">
.header-table
  /* height or max-height is important */
  height: 540px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #e5e5e5

  thead tr th
    position: sticky
    z-index: 1

  thead tr:first-child th
    top: 0
</style>
