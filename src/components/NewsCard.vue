<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-inner-loading
      :showing="visible"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
    <q-card class="my-card" flat bordered>
      <q-img :src="require('../assets/image/imgTitle/' + product_data.NewsClubNewsCardTitleUrlImg )" />

      <q-card-section>
        <div class="text-overline text-orange-9">
          {{ product_data.NewsCardAnnounceNews }}
        </div>
        <div class="text-h5 q-mt-sm q-mb-xs">
          {{ product_data.NewsClubNewsCardTitleNews }}
        </div>
        <div class="text-caption text-grey">
          {{ product_data.NewsClubNewsCardPreViewNews }}
        </div>
        <div class="text-caption text-grey">
          {{ product_data.NewsClubNewsCardCardNewsSrc }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="dark" label="" />
        <div class="labelDate">
          {{ product_data.NewsClubNewsCardDateNews }}
        </div>
        <NewsCardDetailPopUp
        :NewsClubNewsCardPopUpFullNews="product_data.NewsClubNewsCardFullNews"
        :NewsClubNewsCardPopUpTitleUrlImg="product_data.NewsClubNewsCardTitleUrlImg"
        :NewsClubNewsCardCardPopUpNewsSrc="product_data.NewsClubNewsCardCardNewsSrc"
        :NewsClubNewsCardPopUpTitleNews="product_data.TitleNewsCard"/>
        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            {{ product_data.NewsClubNewsCardExtNews }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import NewsCardDetailPopUp from 'components/NewsCardDetailPopUp'
export default {
  name: 'NewsCard',
  components: { NewsCardDetailPopUp },
  data () {
    return {
      dialog: ref(false),
      cancelEnabled: ref(false),
      expanded: ref(false),
      dateNews222: '14.03.22'
    }
  },
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
  max-width: 350px
</style>
