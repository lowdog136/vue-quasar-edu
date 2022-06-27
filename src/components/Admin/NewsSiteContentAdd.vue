<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="q-pa-md">
      <q-form
        class="q-gutter-md"
      >
        <div>
          <q-input
            v-model='newEventVer'
            hint="add Ver"
            lazy-rules
          />
          <q-input
            v-model='newEventTitle'
            hint="add Title"
            lazy-rules
          />
          <q-input
            v-model='newEventBody'
            hint="add Body"
            lazy-rules
          />
          <q-input
            v-model='newEventDate'
            type="text"
            hint="add date"
            lazy-rules
          />
        </div>
        <q-btn @click="addEvent" label="add event"/>
      </q-form>
    </div>
    <q-toggle
      :false-value="false"
      :label="`Показываем ${redModel}`"
      :true-value="true"
      color="red"
      v-model="redModel"
    />
    <div v-if="redModel">
      <div class="q-pa-md" v-for="event in events" :key="event.id" style="max-width: 650px">
        <q-card>
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>{{ event.ver }}</q-toolbar-title>
          </q-toolbar>
          <q-list v-if="event.done">
            <q-item-section>
              {{ event.data }}
            </q-item-section>
            <q-item>
              {{ event.title }}
            </q-item>
            <q-item>
              {{ event.body }}
            </q-item>
          </q-list>
          <q-tabs
            v-model="tab"
            class="bg-teal text-yellow shadow-2"
          >
            <q-tab  @click="countUpEvent(event.id)" name="mails" icon="arrow_upward" />
            <q-tab @click="toggleEvent(event.id)" name="alarms" icon="done" />
            <q-tab @click="deleteEvent(event.id)" name="movies" icon="delete" />
          </q-tabs>
        </q-card>
      </div>
    </div>
  </div>
  <div class="q-px-lg q-pb-md">
    <q-timeline color="secondary" >
      <q-timeline-entry heading >
        Timeline heading
      </q-timeline-entry>
      <q-timeline-entry v-for="event in events" :key="event.id"
                        :title=event.title
                        :subtitle=event.date
                        icon="done"
      >
        <div>
          ver: {{ event.ver }}
        </div>
        <div>
          {{ event.body }}
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase'

const eventCollectionRef = collection(db, 'siteUpdates')
const eventCollectionQuery = query(eventCollectionRef, orderBy('date', 'desc'), limit(3))
const newEventVer = ref('')
const newEventTitle = ref('')
const newEventBody = ref('')
const newEventTeam2 = ref('')
const newEventDate = ref('')
const newEventCount = ref('')

const addEvent = () => {
  addDoc(eventCollectionRef, {
    ver: newEventVer.value,
    title: newEventTitle.value,
    body: newEventBody.value,
    date: newEventDate.value,
    done: true
  })
  newEventVer.value = ''
  newEventTitle.value = ''
  newEventBody.value = ''
  newEventDate.value = ''
  newEventCount.value = ''
  console.log('add todo', newEventDate.value)
}

const deleteEvent = id => {
  deleteDoc(doc(eventCollectionRef, id))
}

export default {
  name: 'GamesNowEventAdd',
  components: {},
  data () {
    return {
      tests: [],
      author1: ['Room view', 'Room service', 'Food'],
      author2: 'Room service',
      BtnName: 'pump',
      BtnSize: 'xs',
      tourCount: 0,
      count: '',
      items: []
    }
  },
  mounted () {
    // axios
    //   .post('http://localhost:3001/posts/', {
    //     id: '4',
    //     userId: '3',
    //     title: 'Article title4-1',
    //     body: 'Article body content44'
    //   })
    //   .then((response) => console.log(response))
    // axios
    //   .get('http://localhost:3001/posts')
    //   .then((response) => {
    //     this.posts = response.data
    //   })
  },
  setup () {
    const todos = ref([])
    const events = ref([])
    onMounted(async () => {
      onSnapshot(eventCollectionQuery, (querySnapshot) => {
        const fbTodos = []
        querySnapshot.forEach((doc) => {
          const todo = {
            id: doc.id,
            content: doc.data().content,
            title: doc.data().title,
            done: doc.data().done
          }
          fbTodos.push(todo)
        })
        todos.value = fbTodos
      })
      onSnapshot(collection(db, 'siteUpdates'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const event = {
            id: doc.id,
            ver: doc.data().ver,
            title: doc.data().title,
            body: doc.data().body,
            date: doc.data().date,
            done: doc.data().done
          }
          fbEvents.push(event)
        })
        events.value = fbEvents
      })
    })
    const toggleEvent = id => {
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
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      titleMainEvent: 'samething title2',
      newEventVer,
      newEventTitle,
      newEventBody,
      newEventDate,
      newEventTeam2,
      newEventCount,
      done: ref(true),
      redModel: ref(false),
      deleteEvent,
      deleteDoc,
      toggleEvent,
      countUpEvent,
      addEvent,
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
