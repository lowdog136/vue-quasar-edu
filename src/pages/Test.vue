<!--
<template>
  <div class="q-pa-md">
    <div>
      <q-item-label v-for="NewsCard in GamesNowEvents"
                    :key="NewsCard.id" caption>
        <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">{{ NewsCard.datenews }}</span>
        <span class="q-px-sm">{{ NewsCard.title }}</span>
      </q-item-label>
        <q-item-label v-for="NewsCard in GamesNowEvents"
                      :key="NewsCard.id" caption>
        </q-item-label>
      <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">{{ NewTitle[0] }}</span>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from 'src/firebase'
export default {
  name: 'NewsDrawer',
  setup () {
    const events = ref([])
    const NewsCards = ref([])
    const GamesNowEvents = ref([])
    const GamesNowTables = ref([])
    const NewTitle = ref([GamesNowEvents])
    onMounted(async () => {
      // раздел "Календарь игр"
      onSnapshot(collection(db, '/siteNewsDrawer/GamesNowTest/dateUpdate/'), (querySnapshot) => {
        const fbGamesNowEvents = []
        querySnapshot.forEach((doc) => {
          const GamesNowEvent = {
            datenews: doc.data().datenews,
            title: doc.data().title
          }
          fbGamesNowEvents.push(GamesNowEvent)
        })
        GamesNowEvents.value = fbGamesNowEvents
        console.log('Дата обновления календаря игр', GamesNowEvents)
      })
    })
    return {
      labelAboutSite: 'О сайте',
      NewsCards,
      NewTitle,
      GamesNowEvents,
      GamesNowTables,
      events
    }
  },
  props: {
    text: String
  }
}
</script>
-->
<template>
  <q-card v-if="submitResult.length > 0" flat bordered class="row items-start">
    <div
      v-for="(item, index) in submitResult"
      :key="index"
      class="q-px-sm q-py-xs rounded-borders text-left text-overline text-black-9"
    >{{ item.name }} = {{ item.value }}
      <div v-for="itema in archiveGames" :key="itema.id">
        <div v-show="itema.year === item.value">
          <q-card class="my-card" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">
                  <div class="example-cell col-5" tabindex="0"> {{ itema.event }}</div>
                </div>
                <div class="text-overline text-orange-14">{{ itema.tour }}</div>
                <div class="text-h5 q-mt-sm q-mb-xs">{{ itema.title }} {{ itema.score }}</div>
                <div class="q-mt-sm text-caption">
                  Результат матча: {{ itema.result }}
                </div>
              </q-card-section>
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <q-btn flat color="primary">
                {{ itema.date }}
              </q-btn>
              <q-btn flat color="primary">
                <NewsCardDetailPopUp
                  :PopyUpSubTitleNews="itema.event"
                  :PopyUpFullNews="itema.body"
                  :PopyUpTitleNews="itema.title + itema.score"
                  :PopyUpBtnColor="btnColor"
                  :PopyUpBtnName="btnName"
                  :PopyUpDivMain = "btnDivMain"
                />
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-card>
  <div class="q-pa-md example-break-row">
    <div class="row items-start example-container" v-for="itema in archiveGames" :key="itema.id">
      <div class="example-cell col-5" tabindex="0"> {{ itema.event }}</div>
      <div class="flex-break q-py-md"></div>
      <div class="example-cell" tabindex="0">Фк "Север"</div>
      <div class="example-cell" tabindex="0">Мурманск</div>
      <div class="example-cell" tabindex="0">3</div>
      <div class="flex-break q-py-md"></div>
      <div class="example-cell" tabindex="0">Фк Псков</div>
      <div class="example-cell" tabindex="0">Псков</div>
      <div class="example-cell" tabindex="0">2</div>
      <div class="flex-break q-py-md"></div>
      <div class="example-cell" tabindex="0">Результат матча: {{ itema.result }}</div>
      <div class="flex-break"></div>
      <div class="example-cell" tabindex="0">Иванов</div>
      <div class="flex-break"></div>
      <div class="example-cell" tabindex="0">Победа была сложной, но команда старалась как могла</div>
    </div>

  </div>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="bg-grey-2 q-pa-sm rounded-borders">
        Выберите год:
        <q-separator color="primary"/>
        <q-option-group
          name="выбран"
          v-model="preferred"
          :options="options"
          color="primary"
          inline
        />
      </div>
      <div>
        <q-btn label="Выбрать" type="submit" color="primary"/>
      </div>
    </q-form>

    <q-card v-if="submitResult.length > 0" flat bordered class="row items-start">
      <div
        v-for="(item, index) in submitResult"
        :key="index"
        class="q-px-sm q-py-xs rounded-borders text-left text-overline text-black-9"
      >{{ item.name }} = {{ item.value }}
        <div v-for="itema in archiveGames" :key="itema.id">
          <div v-show="itema.year === item.value">
            <q-card class="my-card" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs">
                  <div class="text-overline">{{ itema.event }}</div>
                  <div class="text-overline text-orange-14">{{ itema.tour }}</div>
                  <div class="text-h5 q-mt-sm q-mb-xs">{{ itema.title }} {{ itema.score }}</div>
                  <div class="q-mt-sm text-caption">
                    Результат матча: {{ itema.result }}
                  </div>
                </q-card-section>
              </q-card-section>
              <q-separator />
              <q-card-actions>
                <q-btn flat color="primary">
                  {{ itema.date }}
                </q-btn>
                <q-btn flat color="primary">
                  <NewsCardDetailPopUp
                    :PopyUpSubTitleNews="itema.event"
                    :PopyUpFullNews="itema.body"
                    :PopyUpTitleNews="itema.title + itema.score"
                    :PopyUpBtnColor="btnColor"
                    :PopyUpBtnName="btnName"
                    :PopyUpDivMain = "btnDivMain"
                  />
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import NewsCardDetailPopUp from 'components/NewsCard/NewsCardDetailPopUp'

const archiveGamesRef = collection(db, 'clubArchiveGames/archive/year')
const archiveGamesQuery = query(archiveGamesRef, orderBy('datestamp'))
export default {
  components: { NewsCardDetailPopUp },
  data () {
    return {
      btnColor: 'blue-grey-10',
      btnName: 'Подробно',
      // кнопка что бы не прилипала к краю
      btnDivMain: 'q-pa-md',
      divclassFootTab: 'q-pa-m'
    }
  },
  setup: function () {
    const archiveGames = ref([])
    onSnapshot(archiveGamesQuery, (querySnapshot) => {
      const fbAGames = []
      querySnapshot.forEach((doc) => {
        const event = {
          id: doc.id,
          title: doc.data().title,
          year: doc.data().year,
          event: doc.data().event,
          score: doc.data().score,
          date: doc.data().date,
          result: doc.data().result,
          tour: doc.data().tour,
          datestamp: doc.data().datestamp,
          body: doc.data().body
        }
        fbAGames.push(event)
      })
      archiveGames.value = fbAGames
      console.log('fbAGames', archiveGames.value)
    })

    const submitResult = ref([])

    return {
      preferred: ref('2007'),
      archiveGames,
      accepted: ref([]),
      submitResult,
      dialog: ref(false),
      cancelEnabled: ref(false),

      options: [
        {
          id: 1,
          label: '2007',
          value: '2007',
          done: true
        },
        {
          id: 2,
          label: '2008',
          value: '2008',
          done: true
        },
        {
          id: 3,
          label: '2009',
          value: '2009',
          done: true
        },
        {
          id: 4,
          label: '2010',
          value: '2010',
          done: true
        },
        {
          id: 5,
          label: '2011',
          value: '2011',
          done: true
        },
        {
          id: 6,
          label: '2013',
          value: '2013',
          done: true
        },
        {
          id: 7,
          label: '2014',
          value: '2014',
          done: true
        },
        {
          id: 8,
          label: '2016',
          value: '2016',
          done: true
        },
        {
          id: 9,
          label: '2022',
          value: '2022',
          done: true
        },
        {
          id: 10,
          label: '2023',
          value: '2023',
          done: true
        }

      ],

      onSubmit (evt) {
        const formData = new FormData(evt.target)
        const data = []

        for (const [name, value] of formData.entries()) {
          data.push({
            name,
            value
          })
        }

        submitResult.value = data
        console.log(submitResult.value)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
.example-break-row
  .flex-break
    flex: 1 0 100% !important
    height: 0 !important

  .example-container
    .example-cell
      margin: 1px
      padding: 4px 8px
</style>
