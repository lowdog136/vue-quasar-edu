<template>
  <!--  input block-->
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-form
        class="q-gutter-md"
      >
        <div>
          <q-input
            v-model='newSiteUpdateVer'
            hint="add Ver"
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateTitle'
            hint="add Title"
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateBody'
            hint="add Body"
            autogrow
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateDateUpd'
            type="date"
            hint="add date"
            lazy-rules
          />
        </div><br/>
      </q-form>
      <q-separator dark inset />
      <q-card-section>
        <q-btn @click="addSiteUpdate" label="add event"/>
        <q-toggle
          :false-value="false"
          :label="`Показываем ${redModel}`"
          :true-value="true"
          color="red"
          v-model="redModel"
        />
      </q-card-section>
    </q-card>
  </div>
  <!--  edit mode block-->
  <div class="q-pa-md row items-start q-gutter-md" v-if="redModel">
    <event-s-z-f-o23 />
    <q-card
      class="bg-grey-9 my-card"
      v-for="SiteUpdate in SiteUpdates"
      :key="SiteUpdate.id"
      dark bordered >
      <q-card-section>
        <div class="text-h6">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label caption>id:{{ SiteUpdate.id }}</q-item-label>
                <q-item-label>{{ SiteUpdate.ver }}
                  <q-popup-edit v-model="SiteUpdate.ver" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @submit="updateVer(SiteUpdate.ver)" @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateVer(SiteUpdate.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>title: {{ SiteUpdate.title }}
                  <q-popup-edit v-model="SiteUpdate.title" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateTitle(SiteUpdate.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>dateupd: {{ SiteUpdate.dateupd }}
                  <q-popup-edit v-model="SiteUpdate.dateupd" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateDateUpd(SiteUpdate.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <q-list>
          <q-item >
            <q-item-section>
              <q-item-label>Body: {{ SiteUpdate.body }}
                <q-popup-edit v-model="SiteUpdate.body" class="bg-accent text-white" v-slot="scope">
                  <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                    <template v-slot:append>
                      <q-icon name="edit" />
                    </template>
                  </q-input>
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateBody(SiteUpdate.id)"  flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-tabs
        v-model="tab"
        class="bg-teal text-yellow shadow-2"
      >
        <q-tab  name="mails" icon="arrow_upward" />
        <q-tab  name="alarms" icon="done" />
        <q-tab @click="deleteSiteUpdate(SiteUpdate.id)" name="movies" icon="delete" />
      </q-tabs>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, query, orderBy, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase'
import EventSZFO23 from 'pages/Test.vue'

const siteUpdateCollectionRef = collection(db, '/events/szfo/2023/september/match')
const siteUpdateCollectionQuery = query(siteUpdateCollectionRef, orderBy('date', 'desc'))
const mmCollectionRef = collection(db, '/events/szfo/2023/august/match')
const mmCollectionQuery = query(mmCollectionRef, orderBy('date', 'desc'))
// const eventListMonthCollectionRef = collection(db, '/events')
// const eventListMonthCollectionQuery = query(eventListMonthCollectionRef, orderBy('date', 'desc'))
const newSiteUpdateVer = ref('')
const newSiteUpdateTitle = ref('')
const newSiteUpdateBody = ref('')
const newSiteUpdateDate = ref('')
const newSiteUpdateCount = ref('')
const newSiteUpdateDateUpd = ref('')

const addSiteUpdate = () => {
  addDoc(siteUpdateCollectionRef, {
    ver: newSiteUpdateVer.value,
    title: newSiteUpdateTitle.value,
    body: newSiteUpdateBody.value,
    dateupd: newSiteUpdateDateUpd.value,
    date: Date.now(),
    done: true
  })
  newSiteUpdateVer.value = ''
  newSiteUpdateTitle.value = ''
  newSiteUpdateBody.value = ''
  newSiteUpdateDate.value = ''
  newSiteUpdateCount.value = ''
  newSiteUpdateDateUpd.value = ''
  console.log('add SiteUpdate', newSiteUpdateDate.value)
}

const deleteSiteUpdate = id => {
  deleteDoc(doc(siteUpdateCollectionRef, id))
  console.log('del SiteUpdate', newSiteUpdateDate.value)
}

export default {
  name: 'gamesNowEventEdit',
  components: { EventSZFO23 },
  data () {
    return {
    }
  },
  setup () {
    const SiteUpdates = ref([])
    const EventListMonths = ref([])
    onMounted(async () => {
      // Get data in firebase Module
      onSnapshot(siteUpdateCollectionQuery, (querySnapshot) => {
        const fbSiteUpdates = []
        querySnapshot.forEach((doc) => {
          const SiteUpdate = {
            id: doc.id,
            dateupd: doc.data().dateupd,
            title: doc.data().title,
            body: doc.data().body,
            ver: doc.data().ver,
            date: doc.data().date,
            done: doc.data().done
          }
          fbSiteUpdates.push(SiteUpdate)
        })
        SiteUpdates.value = fbSiteUpdates
        console.log('SiteUpdate:', SiteUpdates.value[0])
      })
      onSnapshot(collection(db, '/events/szfo/2023'), (querySnapshot) => {
        const fbEventListMonths = []
        querySnapshot.forEach((doc) => {
          const EventListMonth = {
            id: doc.id,
            name: doc.data().name
          }
          fbEventListMonths.push(EventListMonth)
        })
        EventListMonths.value = fbEventListMonths
        console.log('eventListMonth:', EventListMonths.value[0])
      })
      onSnapshot(mmCollectionQuery, (querySnapshot) => {
        const fbEventListMonths = []
        querySnapshot.forEach((doc) => {
          const EventListMonth = {
            id: doc.id,
            name: doc.data().name
          }
          fbEventListMonths.push(EventListMonth)
        })
        EventListMonths.value = fbEventListMonths
        console.log('mm:', EventListMonths.value)
      })
    })
    // Edit SiteUpdate Block
    const updateVer = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        ver: SiteUpdates.value[index].ver
      })
      console.log('ver update', SiteUpdates.value, 'ver id', SiteUpdates.value)
    }
    const updateTitle = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        title: SiteUpdates.value[index].title
      })
      console.log('title update', SiteUpdates.value[index].title, 'SiteUpdate id', SiteUpdates.value[index].id)
    }
    const updateBody = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        body: SiteUpdates.value[index].body
      })
      console.log('body update', SiteUpdates.value[index].body, 'body id', SiteUpdates.value[index].id)
    }
    const updateDateUpd = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        dateupd: SiteUpdates.value[index].dateupd
      })
      console.log('dateupd update', SiteUpdates.value[index].dateupd, 'dateupd id', SiteUpdates.value[index].id)
    }
    return {
      newSiteUpdateVer,
      newSiteUpdateTitle,
      newSiteUpdateBody,
      newSiteUpdateDate,
      newSiteUpdateCount,
      newSiteUpdateDateUpd,
      done: ref(true),
      redModel: ref(false),
      deleteSiteUpdate,
      deleteDoc,
      addSiteUpdate,
      SiteUpdates,
      EventListMonths,
      updateVer,
      updateTitle,
      updateBody,
      updateDateUpd,
      tab: ref(['alarms', 'mails']),
      expanded: ref(false)
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    ...mapActions([
    ])
  },

  props: {}
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
//.root
//  width: 100%
//    margin: 0 auto
//    background-color: #fff
//    padding: 30px
//    margin-top: 100px
//    border-radius: 20px
//  input
//    border: none
//    outline: none
//    border-bottom: 1px solid #ddd
//    font-size: 1em
//    padding: 5px 0
//    margin: 10px 0 5px 0
//    width: 100%
//  button
//    background-color: #3498db
//    padding: 10px 20px
//    margin-top: 10px
//    border: none
//    color: white
</style>
