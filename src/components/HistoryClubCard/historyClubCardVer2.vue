<template>
  <div class="q-pa-md row items-start q-gutter-md"
       v-for="(itema) in archiveGames"
       :key="itema.id">
    <q-card class="my-card" flat bordered>
      <img
        alt="card logo"
        src="../../assets/image/fcsever_logo.png"
        style="width: 320px; height: 300px"
      >

      <q-card-section>
<!--        <div class="text-overline text-orange-9">{{ itema.overline }}</div>-->
        <div class="text-h5 q-mt-sm q-mb-xs">{{ itema.title }}</div>
        <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        <q-card-actions>
<!--          <q-btn flat color="primary" label="Share" />-->
<!--          <q-btn flat color="secondary" label="Done" />-->
          <div class="text-overline text-orange-9">{{ itema.overline }}</div>
          <q-space />

          <q-btn
            color="red"
            round
            flat
            dense
            :icon="itema.done ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="itema.done = !itema.done"
          />
        </q-card-actions>
      </q-card-section>

<!--      <q-card-actions>-->
<!--        <q-btn flat color="primary" label="Share" />-->
<!--        <q-btn flat color="secondary" label="Book" />-->

<!--        <q-space />-->

<!--        <q-btn-->
<!--          color="red"-->
<!--          round-->
<!--          flat-->
<!--          dense-->
<!--          :icon="itema.done ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"-->
<!--          @click="itema.done = !itema.done"-->
<!--        />-->
<!--      </q-card-actions>-->
      <q-slide-transition>
        <div v-show="itema.done">
          <q-separator />
          <q-card-section class="text-subtitle2" v-for="body in itema.body" :key="body.id">
            <q-list>
              {{ body }}
            </q-list>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'

const archiveGamesRef = collection(db, 'historyClub')
// const archiveGamesQuery = query(archiveGamesRef, orderBy('datestamp'))
export default {
  components: {},
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
    onSnapshot(archiveGamesRef, (querySnapshot) => {
      const fbAGames = []
      querySnapshot.forEach((doc) => {
        const event = {
          id: doc.id,
          title: doc.data().title,
          caption: doc.data().caption,
          color: doc.data().color,
          icon: doc.data().icon,
          date: doc.data().date,
          name: doc.data().name,
          done: doc.data().done,
          overline: doc.data().overline,
          datestamp: doc.data().datestamp,
          img: doc.data().img,
          body: doc.data().body
        }
        fbAGames.push(event)
      })
      archiveGames.value = fbAGames
      console.log('historyClub', archiveGames.value)
    })

    const submitResult = ref([])
    const Zagolovok = ref('Game result:')
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
    const Pinirs = computed(
      {
        get () {
          return Zagolovok.value + ' ' + Pobeda.value
        },
        set (newValue) {
          [Zagolovok.value, Pobeda.value] = newValue.split('')
        }
      }
    )

    return {
      expanded: ref(false),
      expanded1: ref(false),
      step: ref(1),
      preferred: ref('2024'),
      Winirs,
      Pinirs,
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
        },
        {
          id: 11,
          label: '2024',
          value: '2024',
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
  max-width: 350px
</style>
