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
      <!--            Блок "Турнирная таблица". Дата обновления турнирной таблицы -->
      <q-item-label v-for="GamesNowTable in GamesNowTables"
                    :key="GamesNowTable.id" caption>
        <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">{{ GamesNowTable.datenews }}</span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
import { onMounted, ref } from 'vue'
import { collection, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from 'src/firebase'

export default {
  name: 'expansionItemGamesNowTable',
  components: { },
  setup () {
    const NewsCards = ref([])
    const GamesNowTables = ref([])
    const active = ref([])
    onMounted(async () => {
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
      NewsCards,
      GamesNowTables,
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
