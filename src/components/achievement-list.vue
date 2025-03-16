<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-timeline color="secondary" >
      <q-timeline-entry heading >
        Награды и медали
      </q-timeline-entry>
      <q-timeline-entry v-for="event in events" :key="event.id"
                        :title=event.title
                        :subtitle=event.dateupd
                        :icon=event.icon
                        :color=event.color
      >
        <div v-for="(item, id) in event.soloPlayerAwards" :key="item.id" class="text-h7">
          <q-item clickable v-ripple>
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img src="../assets/image/football-player.png">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item }}</q-item-label>
              <q-item-label caption>{{ id }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <q-space />
        <q-card v-show="event.done" class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="q-mt-sm text-caption">
                {{ event.body }}
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

const eventCollectionRef = collection(db, 'clubAwardList')
const eventCollectionQuery = query(eventCollectionRef, orderBy('date', 'desc'))
const newEventVer = ref('')
const newEventTitle = ref('')
const newEventBody = ref('')
const newEventDateUpd = ref('')
const newEventCount = ref('')

export default {
  name: 'achievement-list',
  components: {},
  data () {
    return {
      avatar: 'src="https://cdn.quasar.dev/img/avatar4.jpg"'
    }
  },
  setup () {
    const todos = ref([])
    const events = ref([])
    onMounted(async () => {
      onSnapshot(eventCollectionQuery, (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const event = {
            id: doc.id,
            ver: doc.data().ver,
            title: doc.data().title,
            body: doc.data().body,
            dateupd: doc.data().dateupd,
            date: doc.data().date,
            color: doc.data().color,
            icon: doc.data().icon,
            done: doc.data().done,
            soloPlayerAwards: doc.data().soloPlayerAwards
          }
          fbEvents.push(event)
        })
        events.value = fbEvents
      })
    })
    const toggleDone = id => {
      const index = events.value.findIndex(event => event.id === id)
      updateDoc(doc(eventCollectionRef, id), {
        done: !events.value[index].done
      })
    }
    const countUpEvent = id => {
      const index = events.value.findIndex(event => event.id === id)
      updateDoc(doc(eventCollectionRef, id), {
        count: events.value[index].count++
      })
      console.log('countUP', events.value[index].count)
    }
    return {
      newEventVer,
      newEventTitle,
      newEventBody,
      newEventDateUpd,
      newEventCount,
      done: ref(true),
      redModel: ref(false),
      deleteDoc,
      toggleDone,
      countUpEvent,
      events,
      todos,
      tab: ref(['alarms', 'mails']),
      expanded: ref(false)
    }
  },
  computed: {
    ...mapGetters([
      'dropDown'
    ])
  },
  methods: {
    ...mapActions([
      'togledropDown',
      'changePush',
      'myCountZero',
      'myCountUp',
      'howWatch'
    ])
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
