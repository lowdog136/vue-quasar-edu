<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-inner-loading
      :showing="visible"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
<!--    1 news -->
    <q-card class="my-card" flat bordered>
      <img :src=$store.state.NewsClubNewsCard[0].NewsClubNewsCardTitleUrlImg />
      <q-card-section>
        <div class="text-overline text-orange-9"> {{ NewsCardStatusMatch_F }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ TitleNewsCard }}</div>
        <div class="text-caption text-grey">
          {{ NewsClubNewsCardPreViewNews }}
        </div>
        <div class="text-caption text-grey">
          {{ NewsClubNewsCardCardNewsSrc }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="dark" label="" />
        <div class="labelDate">
          {{ NewsClubNewsCardDateNews }}
        </div>
        <NewsCardDetailPopUp
        :NewsClubNewsCardPopUpFullNews="NewsClubNewsCardFullNews"
        :NewsClubNewsCardPopUpTitleUrlImg="NewsClubNewsCardTitleUrlImg"
        :NewsClubNewsCardCardPopUpNewsSrc="NewsClubNewsCardCardNewsSrc"
        :NewsClubNewsCardPopUpTitleNews="TitleNewsCard"/>
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
            {{ NewsClubNewsCardExtNews }}
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
      dateNews222: '14.03.22',
      products: [
        {
          id: '1',
          name: 'Name1',
          article: 't1'
        },
        {
          id: '2',
          name: 'Name2',
          article: 't2'
        },
        {
          id: '3',
          name: 'Name3',
          article: 't3'
        }
      ]
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
    NewsClubNewsCardFullNews: String,
    NewsClubNewsCardFullNews2: String,
    NewsClubNewsCardTitleNews: String

  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
