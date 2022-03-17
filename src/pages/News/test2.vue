<template>
  <NewsCard />
</template>

<script>
import { ref } from 'vue'
import NewsCard from 'components/NewsCard'

export default {
  components: { NewsCard },
  setup () {
    return {
      testCount: 0,
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
