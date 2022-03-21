<template>
  <NewsCard />
  <NewsCard v-bind:TitleNewsCard="$store.state.NewsClubNewsCard[1].NewsClubNewsCardTitleNews" />
</template>

<script>
import { ref } from 'vue'
import NewsCard from 'components/NewsCard'

export default {
  components: { NewsCard },
  data () {
    return {
      TitleNewsCard1: '$store.state.NewsClubNewsCard[0].NewsClubNewsCardTitleNews'
    }
  },
  setup () {
    return {
      expanded: ref(false)
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
