<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat>
      <q-card-section horizontal>
        <NewsCard v-bind:TitleNewsCard="$store.state.NewsClubNewsCard[0].NewsClubNewsCardTitleNews"
                  v-bind:NewsClubNewsCardCardNewsSrc="$store.state.NewsClubNewsCard[0].NewsClubNewsCardCardNewsSrc"
                  v-bind:NewsClubNewsCardPreViewNews="$store.state.NewsClubNewsCard[0].NewsClubNewsCardPreViewNews"
                  v-bind:NewsClubNewsCardExtNews="$store.state.NewsClubNewsCard[0].NewsClubNewsCardExtNews"
                  v-bind:NewsCardStatusMatch_F="$store.state.NewsCardStatusMatch_F"
                  v-bind:NewsClubNewsCardDateNews="$store.state.NewsClubNewsCard[0].NewsClubNewsCardDateNews"
                  v-bind:NewsClubNewsCardFullNews="$store.state.NewsClubNewsCard[0].NewsClubNewsCardFullNews"
                  v-bind:NewsClubNewsCardTitleUrlImg="$store.state.NewsClubNewsCard[0].NewsClubNewsCardTitleUrlImg"
        />
      </q-card-section>
    </q-card>
    <q-card class="my-card" flat>
      <q-card-section horizontal>
        <NewsCard v-bind:TitleNewsCard="$store.state.NewsClubNewsCard[1].NewsClubNewsCardTitleNews"
                  v-bind:NewsClubNewsCardCardNewsSrc="$store.state.NewsClubNewsCard[1].NewsClubNewsCardCardNewsSrc"
                  v-bind:NewsClubNewsCardPreViewNews="$store.state.NewsClubNewsCard[1].NewsClubNewsCardPreViewNews"
                  v-bind:NewsClubNewsCardExtNews="$store.state.NewsClubNewsCard[1].NewsClubNewsCardExtNews"
                  v-bind:NewsCardStatusMatch_F="$store.state.NewsCardStatusMatch_F"
                  v-bind:NewsClubNewsCardDateNews="$store.state.NewsClubNewsCard[1].NewsClubNewsCardDateNews"
                  v-bind:NewsClubNewsCardFullNews="$store.state.NewsClubNewsCard[1].NewsClubNewsCardFullNews"
                  v-bind:NewsClubNewsCardTitleUrlImg="$store.state.NewsClubNewsCard[1].NewsClubNewsCardTitleUrlImg"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import NewsCard from 'components/NewsCard'

export default {
  components: { NewsCard },
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
