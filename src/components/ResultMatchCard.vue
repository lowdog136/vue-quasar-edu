<template>
  <div v-if="product_data.NewsClubNewsCardStatus" class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img :src="require('../assets/image/imgTitle/' + product_data.NewsClubNewsCardTitleUrlImg )" />

      <q-card-section>
        <div class="text-overline text-orange-9">{{ product_data.NewsCardAnnounceNews }}</div>
        <div class="text-caption text-grey">{{ product_data.NewsClubNewsCardDateNews }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ product_data.ResultCardTitle }}</div>
        <div class="text-caption text-grey">
          {{ product_data.ResultCardTeam1 }}<br>
          {{ product_data.ResultCardTeam2 }}<br>
          Счет: {{ product_data.ResultCardResult }}
        </div>
        <div class="text-caption text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  name: 'ResultMatchCard',
  props: {
    product_data: {
      type: Object,
      default () {
        return {
          NewsClubNewsCardStatus: String,
          NewsClubNewsCardCardNewsSrc: String,
          NewsClubNewsCardPreViewNews: String,
          NewsClubNewsCardExtNews: String,
          NewsClubNewsCardTitleUrlImg: String,
          dateNews: String,
          NewsClubNewsCardDateNews: String,
          TitleNewsCard: String,
          ResultCardTeam1: String,
          ResultCardTeam2: String,
          NewsClubNewsCardFullNews: String,
          NewsClubNewsCardFullNews2: String,
          NewsClubNewsCardTitleNews: String
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.result
  display: flex
  height: 60px
.my-card
  display: flex
  width: 100%
  max-width: 400px
</style>
