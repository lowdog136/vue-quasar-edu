<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <history-club-card-ver2 />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import HistoryClubCardVer2 from 'components/HistoryClubCard/historyClubCardVer2.vue'

export default defineComponent({
  name: 'HistoryClub',
  components: { HistoryClubCardVer2 }
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  min-width: 350px
  max-width: 750px

</style>
