<template>
  <div class="q-pa-md row items-start q-gutter-md"
       v-for="item in items.slice(id).reverse()"
       :key="item.id">
    <q-card v-if="item.status" class="my-card" flat bordered>
        <q-img :src="require('../assets/image/imgTitle/title_0.png' )" />
        <q-card-section>
          <div class="text-overline text-deep-orange-14">
            {{ item.subtitle }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ item.title }}
          </div>
          <div class="text-caption text-blue-grey-10">
            {{ item.preview }}
          </div> <br>
          <div class="text-caption text-grey">
            {{ item.srcnews }}
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="dark" label="" />
          <div class="labelDate">
            {{ item.datenews }}
          </div>
          <NewsCardDetailPopUp
            :PopyUpSubTitleNews="item.subtitle"
            :PopyUpSrcNews="item.srcnews"
            :PopyUpFullNews="item.fullnews"
            :PopyUpTitleNews="item.title"
          />
          <q-space />
        </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import NewsCardDetailPopUp from 'components/NewsCardDetailPopUp'
export default {
  name: 'NewsCard',
  components: { NewsCardDetailPopUp },
  data () {
    return {
      text: '',
      items: [],
      ResultCardTitle: '',
      ResultCardTeam1: '',
      ResultCardTeam2: '',
      ResultCardResult: ''
    }
  },
  async created () {
    try {
      const res = await axios.get('https://severfans.ru/items')
      this.items = res.data
    } catch (error) {
      console.log(error)
    }
  },
  setup () {
    return {
      expanded: ref(false),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    async boughtItem (id) {
      await axios.patch(`https://severfans.ru/items/${id}`, {
        bought: true
      })
      this.items = this.items.map((item) => {
        if (item.id === id) {
          item.bought = true
        }
        return item
      })
    }
  },
  props: {
    PopyUpSubTitleNews: String,
    PopyUpTitleNews: String,
    PopyUpSrcNews: String,
    PopyUpFullNews: String,

    product_data: {
      type: Object,
      default () {
        return {}
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
