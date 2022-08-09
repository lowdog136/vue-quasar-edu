<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div v-for="event in events" :key="event.id">
      <h4>
        date:{{ event.date }}
      </h4>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { date } from 'quasar'
import axios from 'axios'
import { useStore, mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '../../firebase'

const timeStamp = Date.now()
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
const todosCollectionRef = collection(db, 'todos')
const eventCollectionRef = collection(db, 'events')
// const eventCollectionCount = collection(db, 'events')

const newTodoContent = ref('')
const newTodoTitle = ref('')
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
    count: newEventCount.value,
    done: true
  })
  newEventSubTitle.value = ''
  newEventTitle.value = ''
  newEventTeam1.value = ''
  newEventTeam2.value = ''
  newEventCount.value = ''
  console.log('add todo', newTodoTitle.value)
}

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    title: newTodoTitle.value,
    done: false
  })
  newTodoContent.value = ''
  newTodoTitle.value = ''
  console.log('add todo', newTodoTitle.value)
}

const deleteEvent = id => {
  deleteDoc(doc(eventCollectionRef, id))
}
const deleteTodo = id => {
  deleteDoc(doc(todosCollectionRef, id))
}

export default {
  name: 'trest2',
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
      // const querySnapshot = await getDocs(collection(db, 'todos'))
      // const fbTodos = []
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, ' => ', doc.data())
      //   const todo = {
      //     id: doc.id,
      //     content: doc.data().content,
      //     done: doc.data().done
      //   }
      //   fbTodos.push(todo)
      // })
      // todos.value = fbTodos
      // console.log('mounted')
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
            done: doc.data().done,
            date: doc.data().date,
            count: doc.data().count
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
    const countUp = id => {
      const index = events.value.findIndex(event => event.id === id)
      updateDoc(doc(eventCollectionRef, id), {
        count: increment(1)
      })
      console.log('count', events.value[index].count)
    }
    // eslint-disable-next-line camelcase
    const login_form = ref({})
    // eslint-disable-next-line camelcase
    const register_form = ref({})
    const store = useStore()
    // eslint-disable-next-line no-undef
    // const increaseCount = () => {
    //   count.value++
    // }

    const login = () => {
      store.dispatch('login', login_form.value)
    }
    const register = () => {
      store.dispatch('login', register_form.value)
    }
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      login_form,
      titleMainEvent: 'samething title2',
      register_form,
      login,
      formattedString,
      newTodoContent,
      newTodoTitle,
      newEventSubTitle,
      newEventTitle,
      newEventTeam1,
      newEventTeam2,
      newEventCount,
      newCount: 6,
      register,
      deleteTodo,
      deleteEvent,
      deleteDoc,
      toggleDone,
      countUp,
      addTodo,
      addEvent,
      events,
      todos,
      store,
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
    ]),
    async addProfilesT () {
      await axios.post('http://localhost:3001/profile/', {
        name: this.name,
        surname: this.surname,
        other: this.other
      })
    },
    async addPostT () {
      await axios.post('http://localhost:3001/posts/', {
        title: this.title,
        body: this.body,
        count: this.count
      })
    }
  },

  props: {}
}
</script>
