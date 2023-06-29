<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-item clickable v-ripple :active="active" to="/">
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $store.state.NavigationListMenu[0].Name }}</q-item-label>
        <q-item-label caption>{{ $store.state.NavigationListMenu[0].Caption }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-expansion-item
      v-model="expanded"
      icon="sports_soccer"
      label="ФК Север"
      caption="О клубе, новости, стадион"
    >
      <q-item clickable v-ripple :active="active" to="/NewsClub">
        <q-item-section avatar>
          <q-icon name="newspaper" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $store.state.NavigationListMenu[2].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[2].Caption }}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <!--            Блок "Новости клуба". Дата новости -->
          <q-item-label v-for="NewsCard in NewsCards.slice(0,1)"
                        :key="NewsCard.id" caption>
            <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">{{ NewsCard.datenews }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active" to="/HistoryClub">
        <q-item-section avatar>
          <q-icon name="people_alt" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $store.state.NavigationListMenu[3].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[3].Caption }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active" to="/Achievement">
        <q-item-section avatar>
          <q-icon name="celebration" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $store.state.NavigationListMenu[15].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[15].Caption }}</q-item-label>
        </q-item-section>
      </q-item>
<!--      Стадион-->
      <q-expansion-item
        v-model="expanded"
        icon="stadium"
        label="Стадион"
        caption="Стадион"
        to="/Stadium"
        disable
      />
    </q-expansion-item>
<!--    Текущие соревнования-->
    <q-expansion-item
      v-model="expanded"
      icon="emoji_events"
      label="Текущие соревнования"
      caption="Чемпионат СЗФО"
    >
      <q-item clickable v-ripple :active="active" to="/GamesNow/GamesNowEvent">
        <q-item-section avatar>
          <q-icon name="calendar_month" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Календарь игр</q-item-label>
          <q-item-label caption>Расписание матчей</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <!--            Блок "Календарь игр". Дата обновления календаря игр -->
          <q-item-label v-for="GamesNowEvent in GamesNowEvents"
                        :key="GamesNowEvent.id" caption>
            <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">{{ GamesNowEvent.datenews }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active" to="/GamesNow/GamesNowTable">
        <q-item-section avatar>
          <q-icon name="table_chart" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Турнирная таблица</q-item-label>
          <q-item-label caption>Итоговая таблица</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <!--            Блок "Турнирная таблица". Дата обновления турнирной таблицы -->
          <q-item-label v-for="GamesNowTable in GamesNowTables"
                        :key="GamesNowTable.id" caption>
            <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">{{ GamesNowTable.datenews }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>
    <q-expansion-item
      v-model="expanded"
      icon="perm_identity"
      label="Архив"
      caption="Фото, видео, результаты матчей"
    >
      <q-item clickable v-ripple :active="active" to="/Foto">
        <q-item-section avatar>
          <q-icon name="camera_alt" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $store.state.NavigationListMenu[6].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[6].Caption }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple disable :active="active" to="/Video">
        <q-item-section avatar>
          <q-icon name="movie" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $store.state.NavigationListMenu[7].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[7].Caption }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active" to="/ArchiveGamesBefore">
        <q-item-section avatar>
          <q-icon name="find_in_page" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $store.state.NavigationListMenu[16].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[16].Caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>
    <q-item clickable v-ripple disable :active="active" to="/Fanats">
      <q-item-section avatar>
        <q-icon name="emoji_people" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $store.state.NavigationListMenu[9].Name }}</q-item-label>
        <q-item-label caption>{{ $store.state.NavigationListMenu[9].Caption }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple :active="active" to="/Contact">
      <q-item-section avatar>
        <q-icon name="email" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $store.state.NavigationListMenu[11].Name }}</q-item-label>
        <q-item-label caption>{{ $store.state.NavigationListMenu[11].Caption }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-expansion-item
      v-model="expanded"
      icon="info"
      label="О сайте"
      caption="Новости сайта, история развития"
    >
      <q-item clickable v-ripple :active="active" to="/NewsSite">
        <q-item-section avatar>
          <q-icon name="update" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $store.state.NavigationListMenu[13].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[13].Caption }}</q-item-label>
        </q-item-section>
          <q-item-section side top>
<!--            Блок "о сайте". Дата новости -->
            <q-item-label caption v-for="event in events.slice(0,1)" :key="event.id">
              <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders"> {{ event.dateupd }}</span>
            </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active" to="/AboutSite">
        <q-item-section avatar>
          <q-icon name="timeline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $store.state.NavigationListMenu[14].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[14].Caption }}</q-item-label>
        </q-item-section>
      </q-item>
     </q-expansion-item>
  </div>
</template>

<script>

import { onMounted, ref } from 'vue'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from 'src/firebase'
// NewsCard block
const newsCardCollectionRef = collection(db, 'siteNews')
const newsCardCollectionQuery = query(newsCardCollectionRef, orderBy('date', 'desc'))
// раздел "О сайте"
const eventCollectionRef = collection(db, 'siteUpdates')
const eventCollectionQuery = query(eventCollectionRef, orderBy('date', 'desc'))

export default {
  name: 'NewsDrawer',
  setup () {
    const events = ref([])
    const NewsCards = ref([])
    const GamesNowEvents = ref([])
    const GamesNowTables = ref([])
    onMounted(async () => {
      onSnapshot(newsCardCollectionQuery, (querySnapshot) => {
        const fbNewsCards = []
        querySnapshot.forEach((doc) => {
          const NewsCard = {
            datenews: doc.data().datenews
          }
          fbNewsCards.push(NewsCard)
        })
        NewsCards.value = fbNewsCards
      })
      // раздел "О сайте"
      onSnapshot(eventCollectionQuery, (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const event = {
            dateupd: doc.data().dateupd
          }
          fbEvents.push(event)
        })
        events.value = fbEvents
      })
      // раздел "Календарь игр"
      onSnapshot(collection(db, '/siteNewsDrawer/GamesNowEvent/dateUpdate/'), orderBy('date', 'desc'), (querySnapshot) => {
        const fbGamesNowEvents = []
        querySnapshot.forEach((doc) => {
          const GamesNowEvent = {
            datenews: doc.data().datenews
          }
          fbGamesNowEvents.push(GamesNowEvent)
        })
        GamesNowEvents.value = fbGamesNowEvents
        console.log('Дата обновления календаря игр', GamesNowEvents)
      })
      // раздел "Турнирная таблица"
      onSnapshot(collection(db, '/siteNewsDrawer/GamesNowTable/dateUpdate/'), orderBy('date', 'desc'), (querySnapshot) => {
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

<style scoped>

</style>
