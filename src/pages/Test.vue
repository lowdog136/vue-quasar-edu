<template>
  <div class="q-pa-md">
    <div>
      <q-item-label v-for="NewsCard in GamesNowEvents"
                    :key="NewsCard.id" caption>
        <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">{{ NewsCard.datenews }}</span>
        <span class="q-px-sm">{{ NewsCard.title }}</span>
      </q-item-label>
        <q-item-label v-for="NewsCard in GamesNowEvents"
                      :key="NewsCard.id" caption>
        </q-item-label>
      <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">{{ NewTitle[0] }}</span>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from 'src/firebase'
export default {
  name: 'NewsDrawer',
  setup () {
    const events = ref([])
    const NewsCards = ref([])
    const GamesNowEvents = ref([])
    const GamesNowTables = ref([])
    const NewTitle = ref([GamesNowEvents])
    onMounted(async () => {
      // раздел "Календарь игр"
      onSnapshot(collection(db, '/siteNewsDrawer/GamesNowTest/dateUpdate/'), (querySnapshot) => {
        const fbGamesNowEvents = []
        querySnapshot.forEach((doc) => {
          const GamesNowEvent = {
            datenews: doc.data().datenews,
            title: doc.data().title
          }
          fbGamesNowEvents.push(GamesNowEvent)
        })
        GamesNowEvents.value = fbGamesNowEvents
        console.log('Дата обновления календаря игр', GamesNowEvents)
      })
    })
    return {
      labelAboutSite: 'О сайте',
      NewsCards,
      NewTitle,
      GamesNowEvents,
      GamesNowTables,
      events
    }
  },
  props: {
    text: String
  }
}
</script>
