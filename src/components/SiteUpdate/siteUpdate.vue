<template>
  <div class="fit row wrap justify-start items-start content-start">
    <q-timeline color="primary" >
      <q-item-label header>{{ headerName }}</q-item-label>
      <q-timeline-entry v-for="update in siteUpdates" :key="update.id"
                        :title=update.title
                        :subtitle=update.dateupd
                        :icon="update.icon"
      >
        <q-item>
          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium">{{ update.ver }}</span>
            </q-item-label>
            <q-item-label style="max-width: flex" caption lines="1">
              {{ update.body[0] }}
            </q-item-label>
            <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
                <span class="cursor-pointer">
                  <NewsCardDetailPopUp
                    :PopyUpSubTitleNews="update.event"
                    :body_data="update.body"
                    :PopyUpTitleNews="update.title"
                    :PopyUpBtnColor="btnColor"
                    :PopyUpBtnName="btnName"
                    :PopyUpDivMain = "btnDivMain"
                  /></span>
            </q-item-label>
            <q-separator spaced />
          </q-item-section>
        </q-item>
      </q-timeline-entry>
    </q-timeline>
    <ScrollUp />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from 'src/firebase'
import ScrollUp from 'components/ScrollUp'
import NewsCardDetailPopUp from 'components/NewsCard/NewsCardDetailPopUp.vue'

const eventCollectionRef = collection(db, 'siteUpdates')
const eventCollectionQuery = query(eventCollectionRef, orderBy('date', 'desc'))

export default {
  name: 'siteUpdate',
  components: { ScrollUp, NewsCardDetailPopUp },
  data () {
    return {
      headerName: 'Хронология обновлений',
      btnColor: 'blue-grey-10',
      btnName: 'Подробно',
      // кнопка что бы не прилипала к краю
      btnDivMain: '',
      divclassFootTab: 'q-pa-m'
    }
  },
  setup () {
    const siteUpdates = ref([])
    onMounted(async () => {
      onSnapshot(eventCollectionQuery, (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const event = {
            id: doc.id,
            ver: doc.data().ver,
            icon: doc.data().icon,
            title: doc.data().title,
            body: doc.data().body,
            dateupd: doc.data().dateupd,
            date: doc.data().date,
            done: doc.data().done
          }
          fbEvents.push(event)
          console.log('body-', event.body)
        })
        siteUpdates.value = fbEvents
      })
    })
    return {
      siteUpdates
    }
  },

  props: {}
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
  .root
    width: 400px
    margin: 0 auto
    background-color: #fff
    padding: 30px
    margin-top: 100px
    border-radius: 20px
  input
    border: none
    outline: none
    border-bottom: 1px solid #ddd
    font-size: 1em
    padding: 5px 0
    margin: 10px 0 5px 0
    width: 100%
  button
    background-color: #3498db
    padding: 10px 20px
    margin-top: 10px
    border: none
    color: white
</style>
