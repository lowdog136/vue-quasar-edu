<template>
  <div :class=PopyUpDivMain>
    <btn-more
      :btnName='PopyUpBtnName'
      :btnColor='PopyUpBtnColor'
      :btnSize='PopyUpBtnSize'
      @click="dialog = true"
    />
    <q-dialog v-model="dialog">
      <q-card class="my-card">
        <q-img :src="require('assets/image/imgTitle/title_0.png' )" />
        <q-card-section>
          <div class="text-overline text-orange-9"> {{ PopyUpSubTitleNews }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ PopyUpTitleNews }}</div>
          <div class="text-caption text-blue-grey-10">
            <h6>{{ PopyUpFullNews }} </h6>
          </div>
          <div class="text-caption text-blue-grey-10" v-for="body in body_data" :key="body.id">
            <h6>{{ body }} </h6>
          </div>
          <div class="text-caption text-grey">
            {{ PopyUpSrcNews }}
          </div>
        </q-card-section>
      <q-card >
        <q-card-section class="row items-center q-gutter-sm">
          <btn-closed />
        </q-card-section>
      </q-card>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mapActions } from 'vuex'
import BtnClosed from 'components/NewsCard/UI/btnClosed.vue'
import BtnMore from 'components/NewsCard/UI/btnMore.vue'
// import axios from 'axios'
// const baseURL = 'https://severfans.ru'

export default {
  components: { BtnMore, BtnClosed },
  data () {
    return {
      items: [],
      ResultCardTitle: '',
      ResultCardTeam1: '',
      ResultCardTeam2: '',
      ResultCardResult: ''
    }
  },
  // async created () {
  //   try {
  //     const res = await axios.get(`${baseURL}/items`)
  //     this.items = res.data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
  setup () {
    return {
      dialog: ref(false)
    }
  },
  props: {
    product_data: {
      type: Object,
      default () {
        return {
          text: String
        }
      }
    },
    body_data: {
      type: Object,
      default () {
        return {
          text: String
        }
      }
    },
    PopyUpSubTitleNews: String,
    PopyUpDivMain: String,
    PopyUpBtnSize: String,
    PopyUpBtnName: String,
    PopyUpBtnColor: String,
    PopyUpSubImgNews: String,
    PopyUpTitleNews: String,
    PopyUpFullNews: String,
    PopyUpFullNews2: String,
    PopyUpSrcNews: String
  },
  methods: {
    ...mapActions([
      'howWatch'
    ])
    // async PopyUphowWatchUp (id) {
    //   await axios.patch(`${baseURL}/items/${id}`, {
    //     howWatch: this.itemNewsClubNewsCardHowWatch++
    //   })
    //   this.items = this.items.map((item) => {
    //     if (item.id === id) {
    //       this.item.howWatch = item.howWatch++
    //       console.log(item.howWatch)
    //     }
    //     return item.howWatch
    //   })
    // }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  min-width: 350px
  max-width: 750px

.h6
  font-size: 10vw
  font-size: max(100px, min(10vw, 150px))
  font-size: clamp(100px, 10vw, 150px)
</style>
