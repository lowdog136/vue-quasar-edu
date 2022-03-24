<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <ResultMatchCard
      v-for="NewsClubNewsCardS in $store.state.NewsClubNewsCard"
      :key="NewsClubNewsCardS.id"
      :product_data="NewsClubNewsCardS"/>
  </div>
</template>

<script>
import ResultMatchCard from 'components/ResultMatchCard'
export default {
  components: { ResultMatchCard },
  setup () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
