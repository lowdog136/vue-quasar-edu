<template>
  <div class="q-pa-md">
    <q-btn label="Подробно" color="primary" @click="dialog = true" />

    <q-dialog v-model="dialog">
      <q-card >
        <q-card-section>
          <div class="text-h6"> {{ kfull }}</div>
        </q-card-section>
        <q-card-section class="row items-center q-gutter-sm">
          <q-btn label="Open dialog" color="primary" @click="dialog2 = true" />
          <q-btn v-close-popup label="Close" color="primary" />
        </q-card-section>
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
      NewsClubNewsCardFullNews: '',
      NewsClubNewsCardPreViewNews: '',
      NewsClubNewsCardTitleNews: '',
      NewsCardAnnounceNews: '',
      NewsClubNewsCardExtNews: '',
      NewsClubNewsCardStatus: '',
      NewsClubNewsCardDateNews: '',
      NewsClubNewsCardCardNewsSrc: '',
      ResultCardTitle: '',
      ResultCardTeam1: '',
      ResultCardTeam2: '',
      ResultCardResult: ''
    }
  },
  async created () {
    try {
      const res = await axios.get('http://localhost:3000/items')
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
        return {}
      }
    },
    kfull: String

  }
}
</script>
