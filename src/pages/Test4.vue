<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="q-pa-md">
      <q-form
        class="q-gutter-md"
      >
        <div>
          <q-input
            v-model='newEventSubTitle'
            hint="add SubTitle"
            lazy-rules
          />
          <q-input
            v-model='newEventTitle'
            hint="add Title"
            lazy-rules
          />
          <q-input
            v-model='newEventTeam1'
            hint="add Team1"
            lazy-rules
          />
          <q-input
            v-model='newEventTeam2'
            hint="add Team2"
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
      <div>
        <q-btn @click="listCount--" label="down"/>
        {{ listCount }}
        <q-btn @click="listCount++" label="up"/>
        <div class="q-pa-md" v-for="event in events" :key="event.date" style="max-width: 650px">
          {{ events.length }}
          <q-card>
            <q-toolbar class="bg-primary text-white shadow-2">
              <!--            Update subtitle block-->
              <q-toolbar-title>
                <q-input v-model="event.subtitle" @submit="updateSubTitle"/>
                <div>
                  <q-btn @click="updateSubTitle(event.id)" size="xs" icon="done" />
                </div>
              </q-toolbar-title>
            </q-toolbar>
            <q-list v-if="event.done">
              <q-item-section>
                {{ event.count }}
              </q-item-section>
              <!--            Update title block-->
              <q-item>
                <q-input v-model="event.title" @submit="updateTitle(event.id)"/>
                <q-btn @click="updateTitle(event.id)" size="xs" icon="done"/>
              </q-item>
              <q-item>
                <q-input v-model="event.team1" @submit="updateTeam1"/>
                <q-btn @click="updateTeam1(event.id)" size="xs" icon="done"/>
                <q-input v-model="event.team2" @submit="updateTeam2"/>
                <q-btn @click="updateTeam2(event.id)" size="xs" icon="done"/>
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
  </div>
  <div v-if="redModel">
    <div>
      <h4> Text here </h4>
    </div>
    <q-btn @click="listCount++" label="+"/>
    <q-btn @click="listCount--" label="-"/>
    <div>
      {{ listCount }}
    </div>
    <div v-if="author2[listCount]">
      {{ author1[listCount] }}
    </div>
  </div>
  <div>
    <h5>text herer 2</h5>
    <div v-for="text in texts" :key="text.length">
      {{ text }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy, limit, increment } from 'firebase/firestore'
import { db } from '../firebase'

const eventCollectionRef = collection(db, 'events')
const eventCollectionQuery = query(eventCollectionRef, orderBy('date', 'desc'), limit(3))
const newEventSubTitle = ref('')
const newEventTitle = ref('')
const newEventTeam1 = ref('')
const newEventTeam2 = ref('')
const newEventCount = ref('')

const addEvent = () => {
  addDoc(eventCollectionRef, {
    subtitle: newEventSubTitle.value,
    title: newEventTitle.value,
    team1: newEventTeam1.value,
    team2: newEventTeam2.value,
    date: Date.now(),
    count: 0,
    done: true
  })
  newEventSubTitle.value = ''
  newEventTitle.value = ''
  newEventTeam1.value = ''
  newEventTeam2.value = ''
  newEventCount.value = ''
  console.log('add todo', newEventSubTitle.value)
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
      author1: ['Room view', 'Room service', 'Food', 'Clean', 'Washing'],
      author2: [1, 2, 3, 4, 5],
      BtnName: 'pump',
      BtnSize: 'xs',
      count: ''
    }
  },
  setup () {
    const texts = ref('12 33 44 55')
    const listCount = ref('')
    const activeCard = ref('')
    const todos = ref([])
    const events = ref([])
    onMounted(async () => {
      onSnapshot(eventCollectionQuery, (querySnapshot) => {
        const fbTodos = []
        querySnapshot.forEach((doc) => {
          const todo = {
            id: doc.id,
            content: doc.data().content,
            date: doc.date().date,
            title: doc.data().title,
            done: doc.data().done
          }
          fbTodos.push(todo)
        })
        todos.value = fbTodos
      })
      onSnapshot(collection(db, 'events'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const event = {
            id: doc.id,
            subtitle: doc.data().subtitle,
            title: doc.data().title,
            team1: doc.data().team1,
            team2: doc.data().team2,
            count: doc.data().count,
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
        count: increment(1)
      })
      console.log('countUP', events.value[index].count)
    }
    const updateSubTitle = id => {
      const index = events.value.findIndex(event => event.id === id)
      updateDoc(doc(eventCollectionRef, id), {
        subtitle: events.value[index].subtitle
      })
      console.log('subtitle update', events.value[index].subtitle, 'subtitle id', events.value[index].id)
    }
    const updateTitle = id => {
      const index = events.value.findIndex(event => event.id === id)
      updateDoc(doc(eventCollectionRef, id), {
        title: events.value[index].title
      })
      console.log('title update', events.value[index].title)
    }
    const updateTeam1 = id => {
      const index = events.value.findIndex(event => event.id === id)
      updateDoc(doc(eventCollectionRef, id), {
        team1: events.value[index].team1
      })
      console.log('team1 update', events.value[index].team1)
    }
    const updateTeam2 = id => {
      const index = events.value.findIndex(event => event.id === id)
      updateDoc(doc(eventCollectionRef, id), {
        team2: events.value[index].team2
      })
      console.log('team2 update', events.value[index].team2)
    }
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      titleMainEvent: 'samething title2',
      newEventSubTitle,
      newEventTitle,
      newEventTeam1,
      newEventTeam2,
      newEventCount,
      done: ref(true),
      redModel: ref(false),
      deleteEvent,
      deleteDoc,
      toggleEvent,
      countUpEvent,
      updateSubTitle,
      updateTitle,
      updateTeam1,
      updateTeam2,
      addEvent,
      activeCard,
      listCount,
      events,
      texts,
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
