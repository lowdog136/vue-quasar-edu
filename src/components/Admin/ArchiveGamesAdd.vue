<template>
  <!--  input block-->
  <div class="q-pa-md row items-start q-gutter-md">

    <q-card dark bordered class="bg-grey-9 my-card">
      <q-form
        class="q-gutter-md"
      >
        <div>
          <q-input
            v-model='newSiteUpdateYear'
            hint="add Year"
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateEvent'
            hint="add Event"
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateTitle'
            hint="add Title"
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateScore'
            hint="add Score"
            autogrow
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateResult'
            hint="add result"
            autogrow
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateDate'
            hint="add date"
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateDateUpd'
            type="date"
            hint="add date"
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateBody'
            hint="add Body"
            autogrow
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

    <q-card
      class="bg-grey-9 my-card"
      v-for="SiteUpdate in SiteUpdates"
      :key="SiteUpdate.id"
      dark bordered >
      <q-card-section>
        <div class="text-h6">
          <q-list>
            <div class="text-subtitle2">
              <q-list>
                <q-item >
                  <q-item-section>
                    <q-item-label style="color: #f1cc19">id:{{ SiteUpdate.id }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <q-separator color="orange" inset />
          </q-list>
        </div>
        <q-separator inset />
        <!--        event edit-->
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>event: {{ SiteUpdate.event }}
                  <q-popup-edit v-model="SiteUpdate.event" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateEvent(SiteUpdate.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-separator inset />
<!--        year edit-->
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>year: {{ SiteUpdate.year }}
                  <q-popup-edit v-model="SiteUpdate.year" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateYear(SiteUpdate.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-separator inset />
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
        <q-separator inset />
        <!--        date edit-->
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>date: {{ SiteUpdate.date }}
                  <q-popup-edit v-model="SiteUpdate.date" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateDate(SiteUpdate.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
<!--        score edit-->
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>score: {{ SiteUpdate.score }}
                  <q-popup-edit v-model="SiteUpdate.score" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateScore(SiteUpdate.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-separator inset />
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>result: {{ SiteUpdate.result }}
                  <q-popup-edit v-model="SiteUpdate.result" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateResult(SiteUpdate.id)"  flat size="xs" icon="done"/>
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

const siteUpdateCollectionRef = collection(db, 'clubArchiveGames/archive/year')
const siteUpdateCollectionQuery = query(siteUpdateCollectionRef, orderBy('date', 'desc'))
const newSiteUpdateEvent = ref('')
const newSiteUpdateTitle = ref('')
const newSiteUpdateScore = ref('')
const newSiteUpdateBody = ref('')
const newSiteUpdateYear = ref('')
const newSiteUpdateResult = ref('')
const newSiteUpdateDate = ref('')
const newSiteUpdateDateUpd = ref('')

const addSiteUpdate = () => {
  addDoc(siteUpdateCollectionRef, {
    event: newSiteUpdateEvent.value,
    title: newSiteUpdateTitle.value,
    score: newSiteUpdateScore.value,
    body: newSiteUpdateBody.value,
    year: newSiteUpdateYear.value,
    result: newSiteUpdateResult.value,
    date: newSiteUpdateDate.value,
    datestamp: Date.now(),
    done: true
  })
  newSiteUpdateEvent.value = ''
  newSiteUpdateTitle.value = ''
  newSiteUpdateScore.value = ''
  newSiteUpdateYear.value = ''
  newSiteUpdateBody.value = ''
  newSiteUpdateDate.value = ''
  newSiteUpdateResult.value = ''
  newSiteUpdateDateUpd.value = ''
  console.log('add SiteUpdate', newSiteUpdateDate.value)
}

const deleteSiteUpdate = id => {
  deleteDoc(doc(siteUpdateCollectionRef, id))
  console.log('del SiteUpdate', newSiteUpdateDate.value)
}

export default {
  name: 'NewsSiteContentAdd',
  components: {},
  data () {
    return {
    }
  },
  setup () {
    const SiteUpdates = ref([])
    onMounted(async () => {
      // Get data in firebase Module
      onSnapshot(siteUpdateCollectionQuery, (querySnapshot) => {
        const fbSiteUpdates = []
        querySnapshot.forEach((doc) => {
          const SiteUpdate = {
            id: doc.id,
            dateupd: doc.data().dateupd,
            title: doc.data().title,
            result: doc.data().result,
            score: doc.data().score,
            year: doc.data().year,
            body: doc.data().body,
            event: doc.data().event,
            date: doc.data().date,
            done: doc.data().done
          }
          fbSiteUpdates.push(SiteUpdate)
        })
        SiteUpdates.value = fbSiteUpdates
      })
    })
    // Edit SiteUpdate Block
    const updateEvent = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        event: SiteUpdates.value[index].ver
      })
      console.log('event update', SiteUpdates.value, 'event id', SiteUpdates.value)
    }
    const updateYear = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        year: SiteUpdates.value[index].year
      })
      console.log('year update', SiteUpdates.value[index].year, 'year id', SiteUpdates.value[index].id)
    }
    const updateTitle = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        title: SiteUpdates.value[index].title
      })
      console.log('title update', SiteUpdates.value[index].title, 'SiteUpdate id', SiteUpdates.value[index].id)
    }
    const updateScore = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        score: SiteUpdates.value[index].score
      })
      console.log('score update', SiteUpdates.value[index].score, 'score id', SiteUpdates.value[index].id)
    }
    const updateResult = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        result: SiteUpdates.value[index].result
      })
      console.log('result update', SiteUpdates.value[index].result, 'result id', SiteUpdates.value[index].id)
    }
    const updateBody = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        body: SiteUpdates.value[index].body
      })
      console.log('body update', SiteUpdates.value[index].body, 'body id', SiteUpdates.value[index].id)
    }
    const updateDate = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        date: SiteUpdates.value[index].date
      })
      console.log('date update', SiteUpdates.value[index].dateupd, 'date id', SiteUpdates.value[index].id)
    }
    return {
      newSiteUpdateEvent,
      newSiteUpdateTitle,
      newSiteUpdateScore,
      newSiteUpdateBody,
      newSiteUpdateYear,
      newSiteUpdateDate,
      newSiteUpdateResult,
      newSiteUpdateDateUpd,
      done: ref(true),
      redModel: ref(false),
      deleteSiteUpdate,
      deleteDoc,
      addSiteUpdate,
      SiteUpdates,
      updateEvent,
      updateYear,
      updateResult,
      updateTitle,
      updateScore,
      updateDate,
      updateBody,
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
