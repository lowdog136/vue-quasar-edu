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
      <q-img
        src='../assets/image/imgTitle/title_1.png'
      />

      <q-card-section>
        <div class="text-overline text-orange-9"> {{ $store.state.NewsCardStatusMatch_F }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ $store.state.NewsClubNewsCard[0].NewsClubNewsCardTitleNews }}</div>
        <div class="text-caption text-grey">
          {{ $store.state.NewsClubNewsCard[0].NewsClubNewsCardPreViewNews }}
        </div>
        <div class="text-caption text-grey">
          {{ $store.state.NewsClubNewsCard[0].NewsClubNewsCardCardNewsSrc }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="dark" label="14.03.22" />
        <NewsCardDetailPopUp />
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
            {{ $store.state.NewsClubNewsCard[0].NewsClubNewsCardExtNews }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
    <!--    2 news
    <q-card class="my-card" flat bordered>
      <q-img
        src='../assets/image/imgTitle/title_1.png'
      />

      <q-card-section>
        <div class="text-overline text-orange-9"> {{ $store.state.NewsCardStatusMatch_O }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ $store.state.NewsClubNewsCard[1].NewsClubNewsCardTitleNews }}</div>
        <div class="text-caption text-grey">
          {{ $store.state.NewsClubNewsCard[1].NewsClubNewsCardPreViewNews }}
        </div>
        <div class="text-caption text-grey">
          {{ $store.state.NewsClubNewsCard[1].NewsClubNewsCardCardNewsSrc }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="dark" label="14.03.22" />
        <q-btn
          flat color="primary"
          replace
          to="/Foto"
          label="Подробно" />

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
            {{ $store.state.NewsClubNewsCard[1].NewsClubNewsCardExtNews }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>  -->
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
      dateNews: '14.03.22'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
