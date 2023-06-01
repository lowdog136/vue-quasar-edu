<template>
  <div>
    <q-item-label v-for="NewsCard in GamesNowEvents"
                  :key="NewsCard.id" caption>
      <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">{{ NewsCard.title }}</span>
    </q-item-label>
    <q-item-label v-for="NewsCard in GamesNowEvents"
                  :key="NewsCard.id" caption>
      <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">{{ NewsCard.title }}</span>
    </q-item-label>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from 'src/firebase'
// раздел "Календарь игр"
const eventCollectionRefGamesNowEvent = collection(db, '/siteNewsDrawer/GamesNowEvent/dateUpdate/')
const eventCollectionQueryGamesNowEvent = query(eventCollectionRefGamesNowEvent, orderBy('date', 'desc'))
// раздел "Турнирная таблица"
const eventCollectionRefGamesNowTable = collection(db, 'siteNewsDrawer/')
const eventCollectionQueryGamesNowTable = query(eventCollectionRefGamesNowTable, orderBy('date', 'desc'))
export default {
  name: 'NewsDrawer',
  setup () {
    const events = ref([])
    const NewsCards = ref([])
    const GamesNowEvents = ref([])
    const GamesNowTables = ref([])
    onMounted(async () => {
      // раздел "Календарь игр"
      onSnapshot(eventCollectionQueryGamesNowEvent, (querySnapshot) => {
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
      // раздел "Турнирная таблица"
      onSnapshot(eventCollectionQueryGamesNowTable, (querySnapshot) => {
        const fbGamesNowTables = []
        querySnapshot.forEach((doc) => {
          const GamesNowTable = {
            datenews: doc.data().datenews
          }
          fbGamesNowTables.push(GamesNowTable)
        })
        GamesNowTables.value = fbGamesNowTables
      })
    })
    return {
      labelAboutSite: 'О сайте',
      NewsCards,
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
