<template>
  <TestComp />
  <NewsCardDetailPopUp v-bind:NewsClubNewsCardFullNews="$store.state.NewsClubNewsCard[0].NewsClubNewsCardFullNews"/>
  <NewsCardDetailPopUp v-bind:NewsClubNewsCardFullNews="$store.state.NewsClubNewsCard[1].NewsClubNewsCardFullNews"/>
</template>

<script>
import { ref } from 'vue'
import NewsCardDetailPopUp from 'components/NewsCardDetailPopUp'
import TestComp from 'components/TestComp'

export default {
  components: { TestComp, NewsCardDetailPopUp },
  setup () {
    return {
      testCount: 0,
      expanded: ref(false)
    }
  },
  props: {
    NewsClubNewsCardCardNewsSrc: String,
    NewsClubNewsCardPreViewNews: String,
    NewsClubNewsCardExtNews: String,
    NewsClubNewsCardTitleUrlImg: String,
    NewsCardStatusMatch_F: String,
    NewsCardStatusMatch_O: String,
    dateNews: String,
    NewsClubNewsCardDateNews: String,
    TitleNewsCard: String,
    NewsClubNewsCardFullNews: String

  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
