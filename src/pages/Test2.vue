<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-form
      class="q-gutter-md"
    >
      <div>
        <q-input
          v-model='newTodoTitle'
          hint="add content"
          lazy-rules
        />
        <q-input
          v-model='newTodoContent'
          hint="add content"
          lazy-rules
        />
      </div>
      <q-btn @click="addTodo" label="add data"/>
    </q-form>
    <div class="q-pa-md" v-for="todo in todos" :key="todo.id" style="max-width: 550px">
      <q-list bordered separator>
        <q-item v-ripple>
          <q-item-section v-if="!todo.done">{{ todo.content }}</q-item-section>
          <q-item-section v-if="!todo.done">{{ todo.title }}</q-item-section>
          <q-item-section><q-btn @click="toggleDone(todo.id)" icon="done"/></q-item-section>
          <q-item-section><q-btn @click="deleteTodo(todo.id)" icon="delete"/></q-item-section>
        </q-item>
      </q-list>
    </div> <br>
    <div>
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
          <q-item-section><q-btn @click="toggleDone(event.id)" icon="done"/></q-item-section>
          <q-item-section><q-btn @click="deleteTodo(event.id)" icon="delete"/></q-item-section>
        </q-item>
      </q-list>
    </div> <br>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useStore, mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const todosCollectionRef = collection(db, 'todos')
const eventCollectionRef = collection(db, 'events')
const newTodoContent = ref('')
const newTodoTitle = ref('')
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

const deleteTodo = id => {
  deleteDoc(doc(todosCollectionRef, id))
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
            done: doc.data().done
          }
          fbEvents.push(event)
        })
        events.value = fbEvents
      })
    })
    const toggleDone = id => {
      const index = todos.value.findIndex(todo => todo.id === id)
      updateDoc(doc(todosCollectionRef, id), {
        done: !todos.value[index].done
      })
    }
    // eslint-disable-next-line camelcase
    const login_form = ref({})
    // eslint-disable-next-line camelcase
    const register_form = ref({})
    const store = useStore()
    const count = ref(0)
    // eslint-disable-next-line no-undef
    const increaseCount = () => {
      count.value++
    }

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
      increaseCount,
      newTodoContent,
      newTodoTitle,
      newEventSubTitle,
      newEventTitle,
      newEventTeam1,
      newEventTeam2,
      register,
      deleteTodo,
      deleteDoc,
      toggleDone,
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
