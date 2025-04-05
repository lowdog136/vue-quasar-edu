<template>
  <!--  input block-->
  <div class="q-pa-md row items-start q-gutter-md">

    <q-card bordered class="bg-grey-3 my-card">
      <q-form
        class="q-gutter-md"
      >
        <div>
          <q-input
            v-model='newSiteUpdateYear'
            hint="add Year"
            lazy-rules
          />
          <adm-select
            v-model="newSiteUpdateEvent"
            :options="newSiteUpdateEvent"
            bg-color="red"
            :select-label="selectLabel[0]"
            :select-name="selectName[0]"
          />
          <q-input
            v-model='newSiteUpdatePlace'
            hint="add place (место проведения)"
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateTour'
            hint="add Tour (этап розыгрыша)"
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateNameTeamHome'
            hint="add nameTeamHome"
            lazy-rules
            bg-color="orange-2"
          />
          <q-input
            v-model='newSiteUpdateNameCityTeamHome'
            hint="add nameCityTeamHome"
            lazy-rules
            bg-color="orange-2"
          />
          <q-input
            v-model='newSiteUpdateGoalTeamHome'
            hint="add goalTeamHome"
            lazy-rules
            bg-color="orange-2"
          />
          <q-input
            v-model='newSiteUpdateNameTeamAway'
            hint="add nameTeamAway"
            autogrow
            lazy-rules
            bg-color="red-3"
          />
          <q-input
            v-model='newSiteUpdateNameCityTeamAway'
            hint="add nameCityTeamAway"
            autogrow
            lazy-rules
            bg-color="red-3"
          />
          <q-input
            v-model='newSiteUpdateGoalTeamAway'
            hint="add goalTeamAway"
            autogrow
            lazy-rules
            bg-color="red-3"
          />
          <q-input
            v-model='newSiteUpdateResult'
            hint="add result"
            autogrow
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateDate'
            hint="add date (для отображения в календаре)"
            lazy-rules
            bg-color="blue-2"
          />
          <q-input
            v-model='newSiteUpdateDateUpd'
            type="date"
            hint="add datestamp(хронология)"
            lazy-rules
            bg-color="blue-2"
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
        <btn-add :btn-icon="btnIcon" :btn-name="btnName" @click="addSiteUpdate"/>
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
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>tour: {{ SiteUpdate.tour }}
                  <q-popup-edit v-model="SiteUpdate.tour" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateTour(SiteUpdate.id)"  flat size="xs" icon="done"/>
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
        <!--        DONE edit-->
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>DONE: {{ SiteUpdate.done }}
                </q-item-label>
                <div v-show='SiteUpdate.done'>
                  <div>
                    WINNERS
                  </div>
                </div>
              </q-item-section>
              <q-item-section avatar v-show='SiteUpdate.done'>
                <q-btn @click="updateScore(SiteUpdate.id)"  flat size="xs" icon="bookmark"/>
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
import { collection, onSnapshot, addDoc, doc, deleteDoc, query, orderBy, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from 'src/firebase'
import BtnAdd from 'components/Admin/UI/btnAdd.vue'
import AdmSelect from 'components/Admin/UI/admSelect.vue'

const siteUpdateCollectionRef = collection(db, '/all-games')
const siteUpdateCollectionQuery = query(siteUpdateCollectionRef, orderBy('date', 'desc'))
// const newSiteUpdateEvent = reactive(ref(['Чемпионат СЗФО', 'кубок СЗФО', 'XXV турнир полпреда СЗФО', 'XXVI турнир полпреда СЗФО', 'товарищеский матч', 'Третья лига, финальный этап']))
const newSiteUpdateEvent = ref(['Чемпионат СЗФО', 'кубок СЗФО', 'XXV турнир полпреда СЗФО', 'XXVI турнир полпреда СЗФО', 'товарищеский матч', 'Третья лига, финальный этап'])
const newSiteUpdateTitle = ref('')
const newSiteUpdateTour = ref('')
const newSiteUpdateScore = ref('')
const newSiteUpdateBody = ref('')
const newSiteUpdateYear = ref('2025')
const newSiteUpdateResult = ref('')
const newSiteUpdateDate = ref('')
const newSiteUpdateDateUpd = ref('')
const newSiteUpdateNameTeamHome = ref('')
const newSiteUpdateNameTeamAway = ref('')
const newSiteUpdateNameCityTeamHome = ref('')
const newSiteUpdateNameCityTeamAway = ref('')
const newSiteUpdateGoalTeamHome = ref('')
const newSiteUpdateGoalTeamAway = ref('')
const newSiteUpdatePlace = ref('')
const newSiteUpdateIcon = ref('bookmark')
const newSiteUpdateColor = ref('primary')
const newSiteUpdateScorer = ref('')
const selectedColor = ref(null)
const colorOptions = [
  { label: 'Чемпионат СЗФО', value: 'Чемпионат СЗФО' },
  { label: 'кубок СЗФО', value: 'кубок СЗФО' },
  { label: 'XXV турнир полпреда СЗФО', value: 'XXV турнир полпреда СЗФО' },
  { label: 'XXVI турнир полпреда СЗФО', value: 'XXVI турнир полпреда СЗФО' },
  { label: 'товарищеский матч', value: 'товарищеский матч' },
  { label: 'Третья лига, финальный этап', value: 'Третья лига, финальный этап' }
]

const addSiteUpdate = () => {
  addDoc(siteUpdateCollectionRef, {
    event: newSiteUpdateEvent.value,
    title: newSiteUpdateTitle.value,
    tour: newSiteUpdateTour.value,
    body: newSiteUpdateBody.value,
    year: newSiteUpdateYear.value,
    nameTeamHome: newSiteUpdateNameTeamHome.value,
    nameTeamAway: newSiteUpdateNameTeamAway.value,
    nameCityTeamHome: newSiteUpdateNameCityTeamHome.value,
    nameCityTeamAway: newSiteUpdateNameCityTeamAway.value,
    goalTeamHome: newSiteUpdateGoalTeamHome.value,
    goalTeamAway: newSiteUpdateGoalTeamAway.value,
    date: newSiteUpdateDate.value,
    datestamp: Timestamp.now(),
    done: true,
    icon: newSiteUpdateIcon.value,
    place: newSiteUpdatePlace.value,
    color: newSiteUpdateColor.value,
    scorer: newSiteUpdateScorer.value
  })
  newSiteUpdateEvent.value = ''
  newSiteUpdateTitle.value = ''
  newSiteUpdateTour.value = ''
  newSiteUpdateNameTeamAway.value = ''
  newSiteUpdateYear.value = ''
  newSiteUpdateBody.value = ''
  newSiteUpdateDate.value = ''
  newSiteUpdateNameTeamHome.value = ''
  newSiteUpdateNameCityTeamHome.value = ''
  newSiteUpdateNameCityTeamAway.value = ''
  newSiteUpdateGoalTeamHome.value = ''
  newSiteUpdateGoalTeamHome.value = ''
  newSiteUpdateDateUpd.value = ''
  newSiteUpdateIcon.value = ''
  selectedColor.value = null
  newSiteUpdatePlace.value = ''
  newSiteUpdateColor.value = ''
  newSiteUpdateScorer.value = ''
  console.log('add new events', newSiteUpdateDate.value)
}

const deleteSiteUpdate = id => {
  deleteDoc(doc(siteUpdateCollectionRef, id))
  console.log('del events', newSiteUpdateDate.value)
}

export default {
  name: 'games-now-event-edit',
  components: { AdmSelect, BtnAdd },
  data () {
    return {
      btnIcon: 'post_add',
      btnName: 'add update',
      selectName: ['event', 'color'],
      selectLabel: ['event', 'color']
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
            nameTeamHome: doc.data().nameTeamHome,
            nameTeamAway: doc.data().nameTeamAway,
            nameCityTeamHome: doc.data().nameCityTeamHome,
            nameCityTeamAway: doc.data().nameCityTeamAway,
            goalTeamHome: doc.data().goalTeamHome,
            goalTeamAway: doc.data().goalTeamAway,
            title: doc.data().title,
            tour: doc.data().tour,
            result: doc.data().result,
            score: doc.data().score,
            year: doc.data().year,
            body: doc.data().body,
            event: doc.data().event,
            date: doc.data().date,
            datestamp: doc.data().datestamp,
            done: doc.data().done,
            icon: doc.data().icon,
            place: doc.data().place,
            scorer: doc.data().scorer
          }
          fbSiteUpdates.push(SiteUpdate)
          console.log('event update', SiteUpdates.value)
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
    const updateTour = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        tour: SiteUpdates.value[index].tour
      })
      console.log('tour update', SiteUpdates.value[index].title, 'SiteUpdate id', SiteUpdates.value[index].id)
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
      newSiteUpdateTour,
      newSiteUpdateTitle,
      newSiteUpdateScore,
      newSiteUpdateBody,
      newSiteUpdateYear,
      newSiteUpdateDate,
      newSiteUpdateResult,
      newSiteUpdateDateUpd,
      newSiteUpdateNameTeamHome,
      newSiteUpdateNameTeamAway,
      newSiteUpdateNameCityTeamHome,
      newSiteUpdateGoalTeamHome,
      newSiteUpdateNameCityTeamAway,
      newSiteUpdateGoalTeamAway,
      newSiteUpdateColor,
      newSiteUpdateIcon,
      newSiteUpdatePlace,
      newSiteUpdateScorer,
      done: ref(true),
      redModel: ref(false),
      getYear2024: ref(false),
      deleteSiteUpdate,
      deleteDoc,
      addSiteUpdate,
      SiteUpdates,
      updateEvent,
      updateYear,
      updateResult,
      updateTitle,
      updateTour,
      updateScore,
      updateDate,
      updateBody,
      tab: ref(['alarms', 'mails']),
      expanded: ref(false),
      colorOptions,
      selectedColor
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
