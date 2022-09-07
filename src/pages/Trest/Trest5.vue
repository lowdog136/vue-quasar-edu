<template>
  <div class="q-pa-md row items-start q-gutter-md" >
    <q-splitter
      v-model="splitterModel"
      style="height: 450px"
    >
      <template v-slot:before>
        <div class="q-pa-md">
          <q-date
            v-model="date"
            :events="listEvents"
            event-color="orange-14"
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="date"
          v-for="itemM in listDateEvent.slice(id).reverse()" :key="itemM.id"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel :name=itemM.date>
            <div class="text-h4 q-mb-md">{{ itemM.date }}</div>
            <p>event:{{ itemM }}</p>
            <p>name:{{ itemM.name }}</p>
            <p>text:{{ itemM.text }}</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
  <q-separator color="primary"/>
<!--  <div class="q-pa-md row items-start q-gutter-md" >-->
<!--    <q-splitter-->
<!--      v-model="splitterModel"-->
<!--      style="height: 450px"-->
<!--    >-->
<!--      <template v-slot:before>-->
<!--        <div class="q-pa-md">-->
<!--          <q-date-->
<!--            v-model="date"-->
<!--            :events="listEvents"-->
<!--            event-color="orange-14"-->
<!--          />-->
<!--        </div>-->
<!--      </template>-->

<!--      <template v-slot:after>-->
<!--        <q-tab-panels-->
<!--          v-model="date"-->
<!--          v-for="event in events" :key="event.id"-->
<!--          animated-->
<!--          transition-prev="jump-up"-->
<!--          transition-next="jump-up"-->
<!--        >-->
<!--          <q-tab-panel :name=event.date>-->
<!--            <div class="text-h4 q-mb-md">{{ event.date }}</div>-->
<!--            <p>event:{{ event }}</p>-->
<!--            <p>name:{{ event.name }}</p>-->
<!--            <p>text:{{ event.text }}</p>-->
<!--            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>-->
<!--          </q-tab-panel>-->
<!--        </q-tab-panels>-->
<!--      </template>-->
<!--    </q-splitter>-->
<!--  </div>-->
  <q-separator color="primary"/>
  <div>
    <div v-for="itemM in listDateEvent.slice(id).reverse()" :key="itemM.id">
      <div>
        {{ itemM }}
      </div>
    </div>
  </div>
  <q-separator color="primary"/>
  <div>
    <div v-for="itemM in listEvent.slice(id).reverse()" :key="itemM.id">
      <div>
        {{ itemM }}
      </div>
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
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss')
const todosCollectionRef = collection(db, 'todos')
const eventCollectionRef = collection(db, 'washes')

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
  name: 'Trest5',
  components: {},
  data () {
    return {
      tests: [],
      author1: ['Room view', 'Room service', 'Food', 'Wash'],
      author2: 'strio',
      BtnName: 'pump',
      BtnSize: 'xs',
      tourCount: 0,
      count: '',
      items: []
    }
  },
  setup () {
    const todos = ref([])
    const events = ref([])
    const listDateEvent = ref([])
    const listEvent = ref([])
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
      onSnapshot(collection(db, 'washes'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const event = {
            id: doc.id,
            done: doc.data().done,
            date: doc.data().date,
            name: doc.data().name,
            text: doc.data().text
          }
          fbEvents.push(event)
        })
        events.value = fbEvents
      })
      onSnapshot(collection(db, 'coffeeWashes/listDateEvents/listDate'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const listDateEvent = {
            id: doc.id,
            date: doc.data().date,
            name: doc.data().name,
            text: doc.data().text
          }
          fbEvents.push(listDateEvent)
        })
        listDateEvent.value = fbEvents
      })
      onSnapshot(collection(db, 'coffeeWashes/listEvents/listEvent'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const listEvent = {
            id: doc.id,
            date: doc.data().date,
            name: doc.data().name,
            text: doc.data().text
          }
          fbEvents.push(listEvent)
        })
        listEvent.value = fbEvents
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
      listEvent,
      register,
      deleteTodo,
      deleteEvent,
      deleteDoc,
      toggleDone,
      countUp,
      addTodo,
      addEvent,
      listEvents: (['2022/09/14', '2022/09/20']),
      events,
      listDateEvent,
      todos,
      store,
      date: ref('2022/09/01'),
      expanded: ref(false)
    }
  },
  computed: {
    ...mapGetters([
      'dropDown',
      'doublemyCount'
    ])
  },
  methods: {
    ...mapActions([
      'togledropDown',
      'incrementCounter',
      'myCountLen',
      'changePush',
      'myCountZero',
      'myCountUp',
      'howWatch'
    ]),
    setSelect (event) {
      this.tourCount = event
    },
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
