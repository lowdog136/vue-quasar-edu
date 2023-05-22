<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      grid
      title="Treats"
      :rows="NewsCardsRows"
      :columns="NewsCardsColumns"
      row-key="name"
      :filter="filter"
      hide-header
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
  <div class="q-pa-md row items-start q-gutter-md"
       v-for="NewsCard in NewsCards"
       :key="NewsCard.id"
  >
    <q-card v-if="NewsCard.done" class="my-card" flat bordered v-model:pagination="pagination">
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
    <ScrollUp />
  </div>
  <div class="q-pa-md row items-start q-gutter-md"
       v-for="NewsCard in NewsCardsColumns"
       :key="NewsCard.id">
    {{ NewsCard.name}}
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import NewsCardDetailPopUp from 'components/NewsCard/NewsCardDetailPopUp'
import NewsCardFootTab from '../NewsCard/NewsCardFootTab'
import { mapActions, mapGetters } from 'vuex'
import { collection, doc, increment, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase'
import ScrollUp from 'components/ScrollUp'

// NewsCard block
const newsCardCollectionRef = collection(db, 'siteNews')
const newsCardCollectionQuery = query(newsCardCollectionRef, orderBy('date', 'desc'))

// NewsCardColumns block
const newsCardColumnsCollectionRef = collection(db, 'Columns')
const newsCardColumnsCollectionQuery = query(newsCardColumnsCollectionRef, orderBy('date', 'desc'))

// NewsCardRows block
const newsCardRowsCollectionRef = collection(db, 'Rows')
const newsCardRowsCollectionQuery = query(newsCardRowsCollectionRef, orderBy('date', 'desc'))

export default {
  name: 'NewsCard',
  components: { ScrollUp, NewsCardDetailPopUp, NewsCardFootTab },
  data () {
    return {
      btnName: 'Подробно',
      // кнопка что бы не прилипала к краю
      btnDivMain: 'q-pa-md',
      divclassFootTab: 'q-pa-m'
    }
  },
  setup () {
    const columns = [
      {
        name: 'desc',
        required: true,
        label: 'Dessert (100g serving)',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
      { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
      { name: 'carbs', label: 'Carbs (g)', field: 'carbs' }
    ]
    const rows = [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49
      }
    ]
    const pagination = ref({ rowsPerPage: 3, page: 1 })
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
      console.log('NewsCard -', NewsCards)
    })
    const NewsCardsColumns = ref([])
    onMounted(async () => {
      // NewsCardColumns Module
      onSnapshot(newsCardColumnsCollectionQuery, (querySnapshot) => {
        const fbNewsCardsColumns = []
        querySnapshot.forEach((doc) => {
          const NewsCardColumn = {
            id: doc.id,
            subtitle: doc.data().subtitle,
            title: doc.data().title,
            preview: doc.data().preview,
            fullnews: doc.data().fullnews,
            datenews: doc.data().datenews,
            srcnews: doc.data().srcnews,
            date: doc.data().date,
            name: doc.data().name,
            done: doc.data().done,
            count: doc.data().count
          }
          fbNewsCardsColumns.push(NewsCardColumn)
        })
        NewsCardsColumns.value = fbNewsCardsColumns
      })
      console.log('Columns -', NewsCardsColumns)
    })
    const NewsCardsRows = ref([])
    onMounted(async () => {
      // NewsCardColumns Module
      onSnapshot(newsCardRowsCollectionQuery, (querySnapshot) => {
        const fbNewsCardsRows = []
        querySnapshot.forEach((doc) => {
          const NewsCardsRows = {
            id: doc.id,
            subtitle: doc.data().subtitle,
            title: doc.data().title,
            preview: doc.data().preview,
            fullnews: doc.data().fullnews,
            datenews: doc.data().datenews,
            srcnews: doc.data().srcnews,
            date: doc.data().date,
            name: doc.data().name,
            done: doc.data().done,
            count: doc.data().count
          }
          fbNewsCardsRows.push(NewsCardsRows)
        })
        NewsCardsRows.value = fbNewsCardsRows
      })
      console.log('Rows -', NewsCardsRows)
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
      columns,
      filter: ref(''),
      rows,
      NewsCards,
      NewsCardsColumns,
      NewsCardsRows,
      pagination,
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
