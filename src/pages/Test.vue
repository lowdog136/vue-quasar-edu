<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <NewsCardTest />
    <q-card class="my-card" flat>
      <q-card-section flat>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import NewsCardTest from 'components/NewsCard/NewsCardTest'
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase'

// NewsCard block
const newsCardCollectionRef = collection(db, 'siteNews')
const newsCardCollectionQuery = query(newsCardCollectionRef, orderBy('date', 'desc'))

export default {
  components: { NewsCardTest },
  props: {
    NewsClubNewsCardStatus: String
  },
  data () {
    return {}
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
      const index = NewsCards.value.findIndex(event => event.id === id)
      updateDoc(doc(newsCardCollectionRef, id), {
        count: NewsCards.value[index].count++
      })
      // console.log('countUP', NewsCards.value[index].count)
      console.log('countUP', NewsCards.value[index].id)
    }
    return {
      NewsCards,
      current: ref(3),
      countUpEvent
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
</style>
