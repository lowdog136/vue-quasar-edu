<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">{{ product_data.NewsCardAnnounceNews }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ product_data.ResultCardTitle }}</div>
          <div class="text-caption text-grey">
            {{ product_data.ResultCardResult }}
          </div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img :src="require('../assets/image/imgTitle/' + product_data.NewsClubNewsCardTitleUrlImg )" />
        </q-card-section>
      </q-card-section>
      <q-separator />
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
          NewsClubNewsCardCardNewsSrc: String,
          NewsClubNewsCardPreViewNews: String,
          NewsClubNewsCardExtNews: String,
          NewsClubNewsCardTitleUrlImg: String,
          NewsCardStatusMatch_F: String,
          NewsCardStatusMatch_O: String,
          dateNews: String,
          NewsClubNewsCardDateNews: String,
          TitleNewsCard: String,
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
.my-card
  width: 100%
  max-width: 400px
</style>
