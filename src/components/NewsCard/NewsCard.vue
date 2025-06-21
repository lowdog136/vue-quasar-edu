<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md"
         v-for="NewsCard in paginatedNewsCards"
         :key="NewsCard.id"
    >
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
            :body_data="NewsCard.fullnews"
            :PopyUpTitleNews="NewsCard.title"
            :PopyUpItem="NewsCard.item"
            :PopyUpBtnName="btnName"
            :PopyUpBtnColor="btnColor"
            :PopyUpDivMain = "btnDivMain"
          />
        </q-tabs>
      </q-card>
      <ScrollUp />
    </div>
    <div class="q-pa-md flex flex-center q-gutter-md">
      <q-select
        v-model="rowsPerPage"
        :options="rowsPerPageOptions"
        label="Новостей на странице"
        dense
        outlined
        style="width: 180px"
        @update:model-value="onRowsPerPageChange"
      />
      <q-pagination
        v-model="page"
        :max="maxPage"
        :max-pages="7"
        boundary-numbers
        direction-links
        color="primary"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import NewsCardDetailPopUp from 'components/NewsCard/NewsCardDetailPopUp'
import NewsCardFootTab from '../NewsCard/NewsCardFootTab'
import { mapActions, mapGetters } from 'vuex'
import { collection, doc, increment, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase'
import ScrollUp from 'components/ScrollUp'

// NewsCard block
const newsCardCollectionRef = collection(db, 'siteNews')
const newsCardCollectionQuery = query(newsCardCollectionRef, orderBy('date', 'desc'))

export default {
  name: 'NewsCard',
  components: { ScrollUp, NewsCardDetailPopUp, NewsCardFootTab },
  data () {
    return {
      btnColor: 'primary',
      btnName: 'Подробно',
      // кнопка что бы не прилипала к краю
      btnDivMain: 'q-pa-md',
      divclassFootTab: 'q-pa-m',
      tab: null
    }
  },
  setup () {
    const page = ref(1)
    const rowsPerPage = ref(5)
    const rowsPerPageOptions = [3, 5, 10, 20]
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
    const paginatedNewsCards = computed(() => {
      const start = (page.value - 1) * rowsPerPage.value
      const end = start + rowsPerPage.value
      return NewsCards.value.slice(start, end)
    })
    const maxPage = computed(() => Math.ceil(NewsCards.value.length / rowsPerPage.value) || 1)
    const onRowsPerPageChange = () => {
      page.value = 1
    }
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
      paginatedNewsCards,
      page,
      rowsPerPage,
      rowsPerPageOptions,
      maxPage,
      countUpEvent,
      onRowsPerPageChange
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
