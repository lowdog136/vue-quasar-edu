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
      <!--            Блок "о сайте". Дата новости -->
      <q-item-label caption v-for="event in events.slice(0,1)" :key="event.id">
        <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders"> {{ formatDate(event.dateupd) }}</span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
import { onMounted, ref } from 'vue'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from 'src/firebase'
// раздел "О сайте"
const eventCollectionRef = collection(db, 'siteUpdates')
const eventCollectionQuery = query(eventCollectionRef, orderBy('date', 'desc'))

export default {
  name: 'expansionItemNews',
  components: { },
  setup () {
    const events = ref([])
    const active = ref([])

    // Функция форматирования даты в русском формате
    const formatDate = (dateStr) => {
      if (!dateStr) return ''
      const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
      ]
      const d = new Date(dateStr)
      if (isNaN(d.getTime())) return dateStr // Если дата невалидна, возвращаем как есть
      const month = months[d.getMonth()]
      const day = d.getDate()
      const year = d.getFullYear()
      return `${month} ${day}, ${year}`
    }

    onMounted(async () => {
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
    })
    return {
      events,
      active,
      formatDate
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
