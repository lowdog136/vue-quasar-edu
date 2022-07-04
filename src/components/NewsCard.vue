<template>
  <div class="q-pa-md row items-start q-gutter-md"
       v-for="NewsCard in NewsCards"
       :key="NewsCard.id">
    <q-card v-if="NewsCard.done" class="my-card" flat bordered>
        <q-img :src="require('../assets/image/imgTitle/title_0.png' )" />
        <q-card-section>
          <div class="text-overline text-deep-orange-14">
            {{ NewsCard.subtitle }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ NewsCard.title }}
          </div>
          <div class="text-caption text-blue-grey-10">
            {{ NewsCard.preview }}
          </div> <br>
          <div class="text-caption text-grey">
            <q-icon
              v-for="size in ['xs']"
              :key="size"
              :size="size"
              name="visibility"
            /> {{ NewsCard.howWatch }}
            <q-icon
              v-for="size in ['xs']"
              :key="size"
              :size="size"
              name="link"
            /> {{ NewsCard.srcnews }}
          </div>
        </q-card-section>
      <q-tabs
        v-model="tab"
        class="white text-primary shadow-2"
      >
        <q-tab name="event" icon="event">{{ NewsCard.datenews }}
        </q-tab>
        <q-tab name="star" disable @click="raitingNewsCardUp(NewsCard.raiting)" icon="star" label="Оценить">
          <q-badge color="dark"  text-color="white" floating>{{ NewsCard.raiting }}</q-badge>
        </q-tab>
          <NewsCardDetailPopUp
            :PopyUpSubTitleNews="NewsCard.subtitle"
            :PopyUpSrcNews="NewsCard.srcnews"
            :PopyUpFullNews="NewsCard.fullnews"
            :PopyUpTitleNews="NewsCard.title"
            :PopyUpItem="NewsCard.item"
            :PopyUpBtnName="btnName"
          />
      </q-tabs>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import NewsCardDetailPopUp from 'components/NewsCardDetailPopUp'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from 'src/firebase'

const baseURL = 'https://severfans.ru'
// NewsCard block
const newsCardCollectionRef = collection(db, 'siteNews')
const newsCardCollectionQuery = query(newsCardCollectionRef, orderBy('date', 'desc'))

export default {
  name: 'NewsCard',
  components: { NewsCardDetailPopUp },
  data () {
    return {
      rating: 0,
      text: '',
      items: [],
      ResultCardTitle: '',
      ResultCardTeam1: '',
      ResultCardTeam2: '',
      btnDivMain: 'q-pa-md',
      ResultCardResult: '',
      itemNewsClubNewsCardRaiting: '',
      raiting: '',
      howWatch: ''
    }
  },
  async created () {
    try {
      const res = await axios.get(`${baseURL}/items`)
      this.items = res.data
    } catch (error) {
      console.log(error)
    }
  },
  setup () {
    const NewsCards = ref([])
    onMounted(async () => {
      // NewsCard Module
      onSnapshot(newsCardCollectionQuery, (querySnapshot) => {
        const fbNewsCards = []
        querySnapshot.forEach((doc) => {
          const NewsCard = {
            id: doc.id,
            subtitle: doc.data().subtitle,
            title: doc.data().title,
            preview: doc.data().preview,
            fullnews: doc.data().fullnews,
            datenews: doc.data().datenews,
            srcnews: doc.data().srcnews,
            date: doc.data().date,
            done: doc.data().done
          }
          fbNewsCards.push(NewsCard)
        })
        NewsCards.value = fbNewsCards
      })
    })
    return {
      NewsCards,
      btnName: 'Подробно',
      expanded: ref(false),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  computed: {
    ...mapGetters([
      'ratingNewsCardUp'
    ])
  },
  methods: {
    ...mapActions([
      'ratingNewsCardUp',
      'howWatch'
    ]),
    async raitingNewsCardUp (id) {
      await axios.patch(`http://localhost:3001/items/${id}`, {
        raiting: this.itemNewsClubNewsCardRaiting
      })
      this.items = this.items.map((item) => {
        if (item.id === id) {
          item.raiting = item.raiting++
          console.log(this.item.raiting)
        }
        return item.rating
      })
    },
    async boughtItem (id) {
      await axios.patch(`http://localhost:3001/items/${id}`, {
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
    PopyUpHowWatch: String,

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
