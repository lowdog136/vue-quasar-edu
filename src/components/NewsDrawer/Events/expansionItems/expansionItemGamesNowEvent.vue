<template>
  <q-item clickable v-ripple :active="active" :to=qItemTo>
    <q-item-section avatar>
      <q-icon :name=iconName />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ qItemLabel }}</q-item-label>
      <q-item-label caption>{{ qItemLabelCaption }}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <!--            Блок "Календарь игр". Дата обновления календаря игр -->
      <q-item-label v-for="GamesNowEvent in GamesNowEvents"
                    :key="GamesNowEvent.id" caption>
        <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">{{ GamesNowEvent.datenews }}</span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
import { onMounted, ref } from 'vue'
import { collection, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from 'src/firebase'

export default {
  name: 'expansionItemGamesNowEvent',
  components: { },
  setup () {
    const NewsCards = ref([])
    const GamesNowEvents = ref([])
    const active = ref([])
    onMounted(async () => {
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
    })
    return {
      NewsCards,
      GamesNowEvents,
      active
    }
  },
  props: {
    iconName: String,
    qItemLabel: String,
    qItemLabelCaption: String,
    qItemTo: String
  }
}
</script>
<style scoped lang="sass">

</style>
