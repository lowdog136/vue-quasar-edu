<template>
  <div class="news-club-container">
    <!-- Мобильная версия (как есть) -->
    <div class="mobile-version">
      <NewsCard />
    </div>

    <!-- Десктопная версия (4 в ряд, 3 в столбце) -->
    <div class="desktop-version">
      <div class="news-grid">
        <div
          v-for="NewsCard in paginatedNewsCards"
          :key="NewsCard.id"
          class="news-grid-item"
        >
          <q-card v-if="NewsCard.done" class="news-card" flat bordered>
            <q-img :src="require('assets/image/imgTitle/title_0.png' )" />
            <q-card-section>
              <div class="text-overline text-deep-orange-14">
                {{ NewsCard.subtitle }}
              </div>
              <div class="text-h6 q-mt-sm q-mb-xs">
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
        </div>
      </div>

      <!-- Пагинация для десктопной версии -->
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
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import NewsCard from 'components/NewsCard/NewsCard'
import NewsCardDetailPopUp from 'components/NewsCard/NewsCardDetailPopUp'
import NewsCardFootTab from 'components/NewsCard/NewsCardFootTab'
import { collection, doc, onSnapshot, orderBy, query, updateDoc, increment } from 'firebase/firestore'
import { db } from 'src/firebase'

// NewsCard block
const newsCardCollectionRef = collection(db, 'siteNews')
const newsCardCollectionQuery = query(newsCardCollectionRef, orderBy('date', 'desc'))

export default {
  components: { NewsCard, NewsCardDetailPopUp, NewsCardFootTab },
  props: {
    NewsClubNewsCardStatus: String
  },
  data () {
    return {
      btnColor: 'primary',
      btnName: 'Подробно',
      btnDivMain: 'q-pa-md',
      divclassFootTab: 'q-pa-m',
      tab: null
    }
  },
  setup () {
    const page = ref(1)
    const rowsPerPage = ref(12) // 4 в ряд * 3 в столбце = 12
    const rowsPerPageOptions = [12, 24, 36]
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
      const index = NewsCards.value.findIndex(event => event.id === id)
      updateDoc(doc(newsCardCollectionRef, id), {
        count: increment(1)
      })
      console.log('countUP', NewsCards.value[index].id)
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
  }
}
</script>

<style lang="sass" scoped>
.news-club-container
  width: 100%

// Мобильная версия (показывается только на мобильных устройствах)
.mobile-version
  display: block

  @media (min-width: 1024px)
    display: none

// Десктопная версия (показывается только на десктопе)
.desktop-version
  display: none

  @media (min-width: 1024px)
    display: block

.news-grid
  display: grid
  grid-template-columns: repeat(4, 1fr)
  gap: 16px
  padding: 16px
  max-width: 1200px
  margin: 0 auto

.news-grid-item
  display: flex
  flex-direction: column

.news-card
  width: 100%
  height: 100%
  display: flex
  flex-direction: column

  .q-card__section
    flex: 1
    display: flex
    flex-direction: column

  .text-h6
    font-size: 1.1rem
    line-height: 1.3

  .text-caption
    font-size: 0.8rem

// Адаптивность для планшетов
@media (max-width: 1279px) and (min-width: 1024px)
  .news-grid
    grid-template-columns: repeat(3, 1fr)
    max-width: 900px

// Адаптивность для больших экранов
@media (min-width: 1440px)
  .news-grid
    grid-template-columns: repeat(4, 1fr)
    max-width: 1400px
    gap: 20px

.my-card
  width: 100%
  max-width: 450px
</style>
