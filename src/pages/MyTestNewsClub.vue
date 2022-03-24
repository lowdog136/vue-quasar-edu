<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <MyTestNewsCard
      v-for="NewsClubNewsCardS in $store.state.NewsClubNewsCard"
      :key="NewsClubNewsCardS.id"
      :product_data="NewsClubNewsCardS"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import MyTestNewsCard from 'components/MyTestNewsCard'

export default {
  components: { MyTestNewsCard },
  data () {
    return {}
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
  max-width: 650px
</style>
