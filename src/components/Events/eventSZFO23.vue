<template>
  <div class="q-pa-sm wrap rounded-borders">
    <q-item>
      <q-timeline :layout="layout" :side="side" color="secondary">
        <q-timeline-entry heading>
          <div class="title" style="color: #ae0000">
            Июнь, 2024
          </div>
        </q-timeline-entry>
        <q-timeline-entry v-for="item in NewsCardsJ.slice(id)" :key="item.id"
                          :title="item.eventName"
                          :subtitle="item.date"
                          :color="item.color"
                          :icon="item.icon"
                          side="left"
                          class="q-pa-sm wrap rounded-borders"
        >
          <div>
            {{ item.tour}}
            {{ item.mounth}}
          </div>
          <div>
            <!--          {{ item.title }}-->
            <q-item >
              <q-item-section>
                <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary ">
                  {{ item.title }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item >
              <q-item-section >
                <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-blue-grey-5 ">
                  голы: {{ item.scorer }}
                </q-item-label>
                <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-grey-5 ">
                  планируют посетить: 0
                </q-item-label>
                <q-item-label lines="1" class="q-pt-xs text-body2 text-weight-bold text-primary text-uppercase">
                <span class="cursor-pointer">
                  <NewsCardDetailPopUp
                    :PopyUpSubTitleNews="item.event"
                    :PopyUpFullNews="item.body"
                    :PopyUpTitleNews="item.title"
                    :PopyUpBtnColor="btnColor"
                    :PopyUpBtnName="btnName"
                    :PopyUpDivMain = "btnDivMain"
                  /></span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <!--          <q-item-label caption>голы: {{ item.scorer }} </q-item-label>-->
            <!--          <q-item-label caption>планируют посетить: 0 </q-item-label>-->
          </div>
        </q-timeline-entry>
      </q-timeline>
    </q-item>
    <q-item>
      <q-timeline :layout="layout" :side="side" color="secondary">
        <q-timeline-entry heading>
          <div class="title" style="color: #ae0000">
            Июль, 2024
          </div>
        </q-timeline-entry>
        <q-timeline-entry v-for="item in NewsCardsJl.slice(id)" :key="item.id"
                          :title="item.eventName"
                          :subtitle="item.date"
                          :color="item.color"
                          :icon="item.icon"
                          side="left"
                          class="q-pa-sm wrap rounded-borders"
        >
          <div>
            {{ item.tour}}
            {{ item.mounth}}
          </div>
          <div>
            <!--          {{ item.title }}-->
            <q-item >
              <q-item-section>
                <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary ">
                  {{ item.title }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item >
              <q-item-section >
                <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-blue-grey-5 ">
                  голы: {{ item.scorer }}
                </q-item-label>
                <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-grey-5 ">
                  планируют посетить: 0
                </q-item-label>
                <q-item-label lines="1" class="q-pt-xs text-body2 text-weight-bold text-primary text-uppercase">
                <span class="cursor-pointer">
                  <NewsCardDetailPopUp
                    :PopyUpSubTitleNews="item.event"
                    :PopyUpFullNews="item.body"
                    :PopyUpTitleNews="item.title"
                    :PopyUpBtnColor="btnColor"
                    :PopyUpBtnName="btnName"
                    :PopyUpDivMain = "btnDivMain"
                  /></span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <!--          <q-item-label caption>голы: {{ item.scorer }} </q-item-label>-->
            <!--          <q-item-label caption>планируют посетить: 0 </q-item-label>-->
          </div>
        </q-timeline-entry>
      </q-timeline>
    </q-item>
<!--    <q-item>-->
<!--      <q-timeline :layout="layout" :side="side" color="secondary">-->
<!--        <q-timeline-entry heading>-->
<!--          <div class="title" style="color: #ae0000">-->
<!--            Август, 2024-->
<!--          </div>-->
<!--        </q-timeline-entry>-->
<!--        <q-timeline-entry v-for="item in NewsCardsAu.slice(id)" :key="item.id"-->
<!--                          :title="item.eventName"-->
<!--                          :subtitle="item.date"-->
<!--                          :color="item.color"-->
<!--                          :icon="item.icon"-->
<!--                          side="left"-->
<!--        >-->
<!--          <div>-->
<!--            &lt;!&ndash;          {{ item.title }}&ndash;&gt;-->
<!--            <q-item>-->
<!--              <q-item-section>-->
<!--                {{ item.tour}}-->
<!--                {{ item.mounth}}-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--            <q-item>-->
<!--              <q-item-section>-->
<!--                <q-item-label lines="1" class="q-mt-xs text-body4 text-weight-bold text-primary ">-->
<!--                  {{ item.title }}-->
<!--                </q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--            <q-item >-->
<!--              <q-item-section>-->
<!--                <q-item-label lines="1" class="q-mt-xs text-body2 ">-->
<!--                  голы: {{ item.scorer }}-->
<!--                </q-item-label>-->
<!--                <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary ">-->
<!--                  планируют посетить: 0-->
<!--                </q-item-label>-->
<!--                <q-item-label lines="1" class="q-pt-xs text-body2 text-weight-bold text-primary text-uppercase">-->
<!--                <span class="cursor-pointer">-->
<!--                  <NewsCardDetailPopUp-->
<!--                    :PopyUpSubTitleNews="item.event"-->
<!--                    :PopyUpFullNews="item.body"-->
<!--                    :PopyUpTitleNews="item.title"-->
<!--                    :PopyUpBtnColor="btnColor"-->
<!--                    :PopyUpBtnName="btnName"-->
<!--                    :PopyUpDivMain = "btnDivMain"-->
<!--                  /></span>-->
<!--                </q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--            &lt;!&ndash;          <q-item-label caption>голы: {{ item.scorer }} </q-item-label>&ndash;&gt;-->
<!--            &lt;!&ndash;          <q-item-label caption>планируют посетить: 0 </q-item-label>&ndash;&gt;-->
<!--          </div>-->
<!--        </q-timeline-entry>-->
<!--      </q-timeline>-->
<!--    </q-item>-->
<!--    <q-item>-->
<!--      <q-timeline :layout="layout" :side="side" color="secondary">-->
<!--        <q-timeline-entry heading>-->
<!--          <div class="title" style="color: #ae0000">-->
<!--            Сентябрь, 2024-->
<!--          </div>-->
<!--        </q-timeline-entry>-->
<!--        <q-timeline-entry v-for="item in NewsCardsSep.slice(id)" :key="item.id"-->
<!--                          :title="item.eventName"-->
<!--                          :subtitle="item.date"-->
<!--                          :color="item.color"-->
<!--                          :icon="item.icon"-->
<!--                          side="left"-->
<!--        >-->
<!--          <div>-->
<!--            &lt;!&ndash;          {{ item.title }}&ndash;&gt;-->
<!--            <q-item>-->
<!--              <q-item-section>-->
<!--                {{ item.tour}}-->
<!--                {{ item.mounth}}-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--            <q-item>-->
<!--              <q-item-section>-->
<!--                <q-item-label lines="1" class="q-mt-xs text-body4 text-weight-bold text-primary ">-->
<!--                  {{ item.title }}-->
<!--                </q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--            <q-item >-->
<!--              <q-item-section>-->
<!--                <q-item-label lines="1" class="q-mt-xs text-body2 ">-->
<!--                  голы: {{ item.scorer }}-->
<!--                </q-item-label>-->
<!--                <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary ">-->
<!--                  планируют посетить: 0-->
<!--                </q-item-label>-->
<!--                <q-item-label lines="1" class="q-pt-xs text-body2 text-weight-bold text-primary text-uppercase">-->
<!--                <span class="cursor-pointer">-->
<!--                  <NewsCardDetailPopUp-->
<!--                    :PopyUpSubTitleNews="item.eventName"-->
<!--                    :PopyUpFullNews="item.body"-->
<!--                    :PopyUpTitleNews="item.title"-->
<!--                    :PopyUpBtnColor="btnColor"-->
<!--                    :PopyUpBtnName="btnName"-->
<!--                    :PopyUpDivMain = "btnDivMain"-->
<!--                  /></span>-->
<!--                </q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--            &lt;!&ndash;          <q-item-label caption>голы: {{ item.scorer }} </q-item-label>&ndash;&gt;-->
<!--            &lt;!&ndash;          <q-item-label caption>планируют посетить: 0 </q-item-label>&ndash;&gt;-->
<!--          </div>-->
<!--        </q-timeline-entry>-->
<!--      </q-timeline>-->
<!--    </q-item>-->
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { computed, onMounted, ref } from 'vue'
import { collection, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from 'src/firebase'
import NewsCardDetailPopUp from 'components/NewsCard/NewsCardDetailPopUp.vue'

// import NewsCardDetailPopUp from 'components/NewsCardDetailPopUp'
// const newsCardCollectionRef = collection(db, 'events', 'polpred')
// const newsCardCollectionQuery = query(newsCardCollectionRef, orderBy('date', 'desc'))

// import NewsCardDetailPopUp from 'components/NewsCardDetailPopUp'

export default {
  name: 'eventSZFO23',
  components: { NewsCardDetailPopUp },
  data () {
    return {
      btnColor: 'blue-grey-10',
      btnName: 'Подробно',
      // кнопка что бы не прилипала к краю
      btnDivMain: '',
      divclassFootTab: 'q-pa-m'
    }
  },
  setup () {
    const $q = useQuasar()
    const matchEvents = ref([])
    const NewsCards = ref([])
    const NewsCardsJ = ref([])
    const NewsCardsJl = ref([])
    const NewsCardsAu = ref([])
    const NewsCardsSep = ref([])
    const NewsCardsA = ref([])
    onMounted(async () => {
      // NewsCard Module
      onSnapshot(collection(db, '/events/szfo/2024/may/match'), orderBy('date', 'desc'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const listDateEvent = {
            id: doc.id,
            title: doc.data().title,
            color: doc.data().color,
            date: doc.data().date,
            mounth: doc.data().mounth,
            tour: doc.data().tour,
            eventName: doc.data().eventName,
            time: doc.data().time,
            icon: doc.data().icon,
            body: doc.data().body,
            scorer: doc.data().scorer
          }
          fbEvents.push(listDateEvent)
        })
        NewsCards.value = fbEvents
        console.log(NewsCards)
      })
      onSnapshot(collection(db, '/events/szfo/2024/june/match'), orderBy('date', 'desc'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const listDateEvent = {
            id: doc.id,
            title: doc.data().title,
            color: doc.data().color,
            date: doc.data().date,
            mounth: doc.data().mounth,
            tour: doc.data().tour,
            eventName: doc.data().eventName,
            time: doc.data().time,
            icon: doc.data().icon,
            body: doc.data().body,
            scorer: doc.data().scorer
          }
          fbEvents.push(listDateEvent)
        })
        NewsCardsJ.value = fbEvents
        console.log(NewsCardsJ)
      })
      onSnapshot(collection(db, '/events/szfo/2024/jule/match'), orderBy('date', 'desc'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const listDateEvent = {
            id: doc.id,
            title: doc.data().title,
            color: doc.data().color,
            date: doc.data().date,
            mounth: doc.data().mounth,
            tour: doc.data().tour,
            eventName: doc.data().eventName,
            time: doc.data().time,
            icon: doc.data().icon,
            body: doc.data().body,
            scorer: doc.data().scorer
          }
          fbEvents.push(listDateEvent)
        })
        NewsCardsJl.value = fbEvents
        console.log(NewsCardsJl)
      })
      onSnapshot(collection(db, '/events/szfo/2024/august/match'), orderBy('date', 'desc'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const listDateEvent = {
            id: doc.id,
            title: doc.data().title,
            color: doc.data().color,
            date: doc.data().date,
            mounth: doc.data().mounth,
            tour: doc.data().tour,
            eventName: doc.data().eventName,
            time: doc.data().time,
            icon: doc.data().icon,
            body: doc.data().body,
            scorer: doc.data().scorer
          }
          fbEvents.push(listDateEvent)
        })
        NewsCardsAu.value = fbEvents
        console.log(NewsCardsAu)
      })
      onSnapshot(collection(db, '/events/szfo/2024/september/match'), orderBy('date', 'desc'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const listDateEvent = {
            id: doc.id,
            title: doc.data().title,
            color: doc.data().color,
            date: doc.data().date,
            mounth: doc.data().mounth,
            tour: doc.data().tour,
            eventName: doc.data().eventName,
            time: doc.data().time,
            icon: doc.data().icon,
            body: doc.data().body,
            scorer: doc.data().scorer
          }
          fbEvents.push(listDateEvent)
        })
        NewsCardsSep.value = fbEvents
        console.log(NewsCardsSep)
      })
    })

    return {
      titleEvent: ['XXIV Турнир полпреда СЗФО'],
      titleEventTest: ['1', '2', '3'],
      titleEvent1: 'TitileEventValue1',
      btnSize: 'xs',
      NewsCards,
      NewsCardsJ,
      NewsCardsJl,
      NewsCardsA,
      NewsCardsAu,
      NewsCardsSep,
      matchEvents,
      titleMainEvent: '',
      side: ref('right'),
      layout: computed(() => {
        return $q.screen.lt.sm ? 'dense' : ($q.screen.lt.md ? 'comfortable' : 'loose')
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.title
  font-size: 28px
  text-align: center
  color: #2c3e50
.my-card
  width: 100%
  max-width: 350px
</style>
