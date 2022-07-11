<template>
  <div class="q-pa-md row items-start q-gutter-md"
       v-for="NewsCard in NewsCards"
       :key="NewsCard.id">
    <q-card v-if="NewsCard.done" class="my-card" flat bordered>
        <q-img :src="require('assets/image/imgTitle/title_0.png' )" />
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
        <NewsCardFootTab
          :count="NewsCard.count"
          :datenews="NewsCard.datenews"
          :divclassFootTab="divclassFootTab"
          :countUpEvent="countUpEvent"
          :NewsCard="NewsCard"
        />
        <NewsCardDetailPopUp
          :PopyUpSubTitleNews="NewsCard.subtitle"
          :PopyUpSrcNews="NewsCard.srcnews"
          :PopyUpFullNews="NewsCard.fullnews"
          :PopyUpTitleNews="NewsCard.title"
          :PopyUpItem="NewsCard.item"
          :PopyUpBtnName="btnName"
          :PopyUpDivMain = "btnDivMain"
        />
      </q-tabs>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import NewsCardDetailPopUp from 'components/NewsCard/NewsCardDetailPopUp'
import NewsCardFootTab from '../NewsCard/NewsCardFootTab'
import { mapActions, mapGetters } from 'vuex'
import { collection, doc, increment, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase'

// NewsCard block
const newsCardCollectionRef = collection(db, 'siteNews')
const newsCardCollectionQuery = query(newsCardCollectionRef, orderBy('date', 'desc'))

export default {
  name: 'NewsCard',
  components: { NewsCardDetailPopUp, NewsCardFootTab },
  data () {
    return {
      btnName: 'Подробно',
      // кнопка что бы не прилипала к краю
      btnDivMain: 'q-pa-md',
      divclassFootTab: 'q-pa-m'
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
            done: doc.data().done,
            count: doc.data().count
          }
          fbNewsCards.push(NewsCard)
        })
        NewsCards.value = fbNewsCards
      })
    })
    const countUpEvent = id => {
      const index = NewsCards.value.findIndex(NewsCard => NewsCard.id === id)
      updateDoc(doc(newsCardCollectionRef, id), {
        count: increment(1)
      })
      console.log('count id:', NewsCards.value[index].id)
      console.log('count:', NewsCards.value[index].count)
    }
    return {
      NewsCards,
      countUpEvent
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
    ])
  },
  props: {
    PopyUpSubTitleNews: String,
    PopyUpTitleNews: String,
    PopyUpSrcNews: String,
    PopyUpFullNews: String,
    PopyUpHowWatch: String
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
