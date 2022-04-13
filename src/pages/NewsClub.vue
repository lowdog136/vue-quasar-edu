<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <NewsCard
      v-for="NewsClubNewsCardS in $store.state.NewsClubNewsCard.slice(id).reverse()"
      :key="NewsClubNewsCardS.id"
      :product_data="NewsClubNewsCardS"
    />
    <q-card class="my-card" flat>
      <q-card-section flat>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import NewsCard from 'components/NewsCard'

export default {
  components: { NewsCard },
  props: {
    NewsClubNewsCardStatus: String
  },
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
  max-width: 350px
</style>
