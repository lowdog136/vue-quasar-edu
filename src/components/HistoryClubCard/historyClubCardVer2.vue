<template>
  <div class="q-pa-md">
    <q-card-section>
      <div class="text-h6 text-deep-orange-14 ">История ФК Север г. Мурманск</div>
      <div class="text-subtitle2 text-grey">Материал из Википедии — свободной энциклопедии.</div>
      <q-img :src="require('assets/image/imgTitle/title_0.png' )" style="max-height: 450px; max-width: 450px"/>
    </q-card-section>
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      header-nav
      animated
      v-for="itema in archiveGames" :key="itema.id">
    >
      <q-step
        :name=itema.name
        :title=itema.title
        :caption=itema.caption
        :icon=itema.icon
        :error=itema.error
        :done=itema.done
      >
        <div class="text-h7">
          {{ itema.body }}
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" color="primary" :label="itema.step === 3 ? 'Конец' : 'Далее'" />
          <q-btn v-if="itema.step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Назад" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
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
          datestamp: doc.data().datestamp,
          error: doc.data().error,
          body: doc.data().body
        }
        fbAGames.push(event)
      })
      archiveGames.value = fbAGames
      console.log('historyClub', archiveGames.value)
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
      preferred: ref('2024'),
      Winirs,
      myTest,
      archiveGames,
      step: ref(1),
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
<style scoped lang="sass">

</style>
