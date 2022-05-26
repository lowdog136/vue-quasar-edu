<template>
  <div class="q-pa-md">
    <q-btn label="Подробно" color="primary" @click="dialog = true" />

    <q-dialog v-model="dialog">
      <q-card class="my-card">
        <q-img :src="require('../assets/image/imgTitle/title_0.png' )" />
        <q-card-section>
          <div class="text-overline text-orange-9"> {{ PopyUpSubTitleNews }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ PopyUpTitleNews }}</div>
          <div class="text-caption text-blue-grey-10">
            <h6>{{ PopyUpFullNews }} </h6>
          </div>
          <div class="text-caption text-grey">
            {{ PopyUpSrcNews }}
          </div>
        </q-card-section>
      <q-card >
        <q-card-section class="row items-center q-gutter-sm">
          <q-btn v-close-popup label="Закрыть" color="primary" />
        </q-card-section>
      </q-card>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  data () {
    return {
      items: [],
      ResultCardTitle: '',
      ResultCardTeam1: '',
      ResultCardTeam2: '',
      ResultCardResult: ''
    }
  },
  async created () {
    try {
      const res = await axios.get('http://localhost:3001/items')
      this.items = res.data
    } catch (error) {
      console.log(error)
    }
  },
  setup () {
    return {
      dialog: ref(false),
      dialog2: ref(false)
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
    PopyUpSubTitleNews: String,
    PopyUpSubImgNews: String,
    PopyUpTitleNews: String,
    PopyUpFullNews: String,
    PopyUpSrcNews: String
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
