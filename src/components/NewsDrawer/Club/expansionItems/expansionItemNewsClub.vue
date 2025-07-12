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
      <!--            Блок "Новости клуба". Дата новости -->
      <q-item-label v-for="NewsCard in NewsCards.slice(0,1)"
                    :key="NewsCard.id" caption>
        <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">{{ NewsCard.datenews }}</span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
import { onMounted, ref } from 'vue'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from 'src/firebase'
// NewsCard block
const newsCardCollectionRef = collection(db, 'siteNews')
const newsCardCollectionQuery = query(newsCardCollectionRef, orderBy('date', 'desc'))

export default {
  name: 'expansionItemNewsClub',
  components: { },
  setup () {
    const NewsCards = ref([])
    const active = ref(false)
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
    })
    return {
      labelAboutSite: 'О сайте',
      NewsCards,
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
