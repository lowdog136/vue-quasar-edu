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
    <div class="q-pa-md" v-for="event in events" :key="event.id" style="max-width: 550px">
      <q-list bordered separator>
        <q-item v-ripple>
          <q-item-section v-if="event.done">{{ event.subtitle }}</q-item-section>
          <q-item-section v-if="event.done">{{ event.title }}</q-item-section>
          <q-item-section v-if="event.done">{{ event.team1 }}</q-item-section>
          <q-item-section v-if="event.done">{{ event.team2 }}</q-item-section>
          <q-item-section><q-btn @click="toggleEvent(event.id)" icon="done"/></q-item-section>
          <q-item-section><q-btn @click="deleteEvent(event.id)" icon="delete"/></q-item-section>
        </q-item>
      </q-list>
    </div> <br>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const eventCollectionRef = collection(db, 'events')
const newEventSubTitle = ref('')
const newEventTitle = ref('')
const newEventTeam1 = ref('')
const newEventTeam2 = ref('')

const addEvent = () => {
  addDoc(eventCollectionRef, {
    subtitle: newEventSubTitle.value,
    title: newEventTitle.value,
    team1: newEventTeam1.value,
    team2: newEventTeam2.value,
    done: false
  })
  newEventSubTitle.value = ''
  newEventTitle.value = ''
  newEventTeam1.value = ''
  newEventTeam2.value = ''
  console.log('add todo', newEventSubTitle.value)
}

const deleteEvent = id => {
  deleteDoc(doc(eventCollectionRef, id))
}

export default {
  name: 'test2',
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
      onSnapshot(collection(db, 'todos'), (querySnapshot) => {
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
      onSnapshot(collection(db, 'events'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const event = {
            id: doc.id,
            subtitle: doc.data().subtitle,
            title: doc.data().title,
            team1: doc.data().team1,
            team2: doc.data().team2,
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
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      titleMainEvent: 'samething title2',
      newEventSubTitle,
      newEventTitle,
      newEventTeam1,
      newEventTeam2,
      deleteEvent,
      deleteDoc,
      toggleEvent,
      addEvent,
      events,
      todos,
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
