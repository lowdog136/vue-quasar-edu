<template>
  <div class="q-pa-md row items-start q-gutter-md">
        <q-btn label="Подробно" color="primary" @click="dialog = true" />

        <q-dialog v-model="dialog" persistent>
          <q-card>
            <q-card-section>
              <div class="text-overline text-orange-9"> 11</div>
              <div class="text-h5 q-mt-sm q-mb-xs">22</div>
              <div class="text-caption text-grey">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
                <br>
                {{ item.fullnews }}
              </div>
              <div class="text-caption text-grey">
                {{ item.srcnews }}
              </div>
            </q-card-section>

            <q-slide-transition>
              <div v-show="expanded">
                <q-separator />
                <q-card-section class="text-subitle2">
                  {{ item.srcnews }}
                </q-card-section>
              </div>
            </q-slide-transition>
            <!-- Notice v-close-popup -->
            <q-card-actions align="right">
              <q-btn flat label="закрыть" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-space />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'NewsCardDetailPopUp',
  data () {
    return {
      dialog: ref(false),
      cancelEnabled: ref(false),
      expanded: ref(false),
      dateNews1: '14.03.22'
    }
  },
  props: {
    product_data: {
      type: Object,
      default () {
        return {}
      }
    },
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
    NewsClubNewsCardPopUpFullNews: String,
    NewsClubNewsCardPopUpTitleUrlImg: String,
    NewsClubNewsCardCardPopUpNewsSrc: String,
    NewsClubNewsCardPopUpTitleNews: String
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
