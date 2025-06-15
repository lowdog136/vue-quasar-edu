<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="bg-grey-2 q-pa-sm wrap rounded-borders">
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
      <div class="btnChoose">
        <btn-choose />
      </div>
      <q-space />
    </q-form>
    <q-card v-if="submitResult.length > 0" flat bordered class="row items-start">
      <div
        v-for="(item, index) in submitResult"
        :key="index"
        class="q-px-sm q-py-xs rounded-borders text-left text-overline text-black-9"
      >{{ item.name }} = {{ item.value }}
        <div v-for="itema in archiveGames" :key="itema.id">
          <div v-show="itema.year === item.value">
            <div class="q-pa-md example-row-variable-width">
              <div class="row">
                <div class="col1 text-red-14">
                  {{ itema.date }}
                </div>
                <div class="col1">
                  {{ itema.event }}
                </div>
                <div class="col text-orange-14">
                  {{ itema.tour }}
                </div>
              </div>
              <div class="row">
                <div class="col1">
                  <q-icon name="style" size="3em" />
                </div>
                <div class="col2 col-md-auto">
                  {{ itema.nameTeamHome }}
                </div>
                <div class="col1 col-md-auto">
                  {{ itema.nameCityTeamHome }}
                </div>
                <div class="col1">
                  {{ itema.goalTeamHome }}
                </div>
              </div>
              <div class="row">
                <div class="col1">
                  <q-icon name="style" size="3em" />
                </div>
                <div class="col2 col-md-auto">
                  {{ itema.nameTeamAway }}
                </div>
                <div class="col1 col-md-auto">
                  {{ itema.nameCityTeamAway }}
                </div>
                <div class="col1">
                  {{ itema.goalTeamAway }}
                </div>
              </div>
            </div>
            <q-separator />
          </div>
        </div>
      </div>
    </q-card>
    <q-space />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from 'src/firebase'
import BtnChoose from 'components/ArchiveGames/UI/btnChoose.vue'

/* const archiveGamesRef = collection(db, 'clubArchiveGames/archive/year') */
const archiveGamesRef = collection(db, 'all-games')
const archiveGamesQuery = query(archiveGamesRef, orderBy('datestamp'))
export default {
  name: 'ArchiveGamesViewList',
  components: { BtnChoose },
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
          nameTeamHome: doc.data().nameTeamHome,
          nameTeamAway: doc.data().nameTeamAway,
          nameCityTeamHome: doc.data().nameCityTeamHome,
          nameCityTeamAway: doc.data().nameCityTeamAway,
          iconHome: doc.data().iconHome,
          iconAway: doc.data().iconAway,
          goalTeamHome: doc.data().goalTeamHome,
          goalTeamAway: doc.data().goalTeamAway,
          score: doc.data().score,
          scoreTest: {
            scoreHome: doc.data().scoreHome,
            scoreAway: doc.data().scoreAway
          },
          date: doc.data().date,
          result: doc.data().result,
          tour: doc.data().tour,
          datestamp: doc.data().datestamp,
          pobeda: doc.data().pobeda,
          body: doc.data().body
        }
        fbAGames.push(event)
      })
      archiveGames.value = fbAGames
      console.log('fbAGames', archiveGames.value)
    })

    const submitResult = ref([])
    const Zagolovok = ref('Game result:')
    const randomTritle = ref([])
    const Pobeda = ref('')
    const Winirs = computed(
      {
        get () {
          return Zagolovok.value + ' ' + Pobeda.value
        },
        set (newValue) {
          [Zagolovok.value, Pobeda.value] = newValue.split('')
        }
      }
    )
    const myTest = computed(
      {
        get () {
          return randomTritle.value
        }
      }
    )

    return {
      preferred: ref('2025'),
      Winirs,
      myTest,
      archiveGames,
      accepted: ref([]),
      submitResult,
      dialog: ref(false),
      cancelEnabled: ref(false),

      options: [
        {
          id: 0,
          label: '2006',
          value: '2006',
          done: true
        },
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
          label: '2012',
          value: '2012',
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
        },
        {
          id: 11,
          label: '2024',
          value: '2024',
          done: true
        },
        {
          id: 12,
          label: '2025',
          value: '2025',
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
<style lang="sass">
.example-row-variable-width
  .row > div
    padding: 9px 15px
    background: rgba(#999,.15)
    border: 1px solid rgba(#999,.2)
  .row + .row
    margin-top: 1rem
</style>
