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
              <div class="q-gutter-md">
                <div class="cursor-pointer" style="width: 100px">
                  {{ event.subtitle }}
                  <q-popup-edit v-model="event.subtitle" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </div>
              </div>
              <q-toolbar-title>
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
                <div class="q-gutter-md">
                  <div class="cursor-pointer" style="width: 100px">
                    {{ event.title }}
                    <q-popup-edit v-model="event.title" class="bg-accent text-white" v-slot="scope">
                      <q-input dark color="white" v-model="scope.value" dense autofocus counter @submit="updateTitle(event.id)" @keyup.enter="scope.set">
                        <template v-slot:append>
                          <q-icon name="edit" />
                        </template>
                      </q-input>
                    </q-popup-edit>
                  </div>
                </div>
                <q-btn @click="updateTitle(event.id)" size="xs" icon="done"/>
              </q-item>
              <q-item>
                <div class="q-gutter-md">
                  <div class="cursor-pointer" style="width: 100px">
                    {{ event.team1 }}
                    <q-popup-edit v-model="event.team1" class="bg-accent text-white" v-slot="scope">
                      <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                        <template v-slot:append>
                          <q-icon name="edit" />
                        </template>
                      </q-input>
                    </q-popup-edit>
                  </div>
                </div>
                <q-btn @click="updateTeam1(event.id)" size="xs" icon="done"/>
                <q-space />
<!--              </q-item>-->
<!--              <q-item>-->
                <div class="q-gutter-md">
                  <div class="cursor-pointer" style="width: 100px">
                    {{ event.team2 }}
                    <q-popup-edit v-model="event.team2" class="bg-accent text-white" v-slot="scope">
                      <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                        <template v-slot:append>
                          <q-icon name="edit" />
                        </template>
                      </q-input>
                    </q-popup-edit>
                  </div>
                </div>
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
<!--  <div v-if="redModel">
    <div>
      <h4> Text here </h4>
    </div>
    <q-btn @click="listCount++" label="+"/>
    <q-btn @click="listCount&#45;&#45;" label="-"/>
    <div>
      {{ listCount }}
    </div>
    <div v-if="author2[listCount]">
      {{ author1[listCount] }}
    </div>
  </div>
  <div>
    <q-btn @click="pageCount&#45;&#45;" icon="chevron_left"/>
    {{ pageCount }}
    <q-btn @click="pageCount++" icon="chevron_right"/>
    <h5>text herer 2</h5>
    <div       v-for="text in texts"
               :key="text.id">
      <q-card
        v-show="pageCount == text.id"
        class="my-card text-white"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
      >
        <q-card-section>
          <div class="text-h6">{{  text.title }}</div>
          <div class="text-subtitle2">by {{ text.author }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ text.body }}
        </q-card-section>
      </q-card>
    </div>
  </div>-->
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy, limit, increment } from 'firebase/firestore'
import { db } from '../../firebase'

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
  name: 'trest4',
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
    const texts = ref([
      { id: 1, title: 'My 1 title', author: 'B.J.Greys', body: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"\n' },
      { id: 2, title: 'My 2 title', author: 'A.Brown', body: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"\n' },
      { id: 3, title: 'My 3 title', author: 'W.Loyds', body: '"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."\n' },
      { id: 4, title: 'My 4 title', author: 'S.K.J.Mouse', body: '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?""\n' }])
    const pageCount = ref('1')
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
      deleteEvent,
      deleteDoc,
      toggleEvent,
      countUpEvent,
      updateSubTitle,
      updateTitle,
      updateTeam1,
      updateTeam2,
      addEvent,
      pageCount,
      activeCard,
      listCount,
      events,
      texts,
      todos,
      done: ref(true),
      redModel: ref(false),
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
  max-width: 550px
  background: #2c3e50
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
