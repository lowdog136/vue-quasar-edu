<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <HistoryClubCard />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import HistoryClubCard from 'components/HistoryClubCard/HistoryClubCard'

export default defineComponent({
  name: 'HistoryClub',
  components: { HistoryClubCard }
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  min-width: 350px
  max-width: 750px

</style>
