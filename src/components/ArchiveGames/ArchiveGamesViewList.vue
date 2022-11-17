<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="bg-grey-2 q-pa-sm rounded-borders">
        Выберите год:
        <q-option-group
          name="preferred_genre"
          v-model="preferred"
          :options="options"
          color="primary"
          inline
        />
      </div>
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div>
    </q-form>

    <q-card v-if="submitResult.length > 0" flat bordered class="q-mt-md bg-grey-2">
      <q-card-section>Submitted form contains the following formData (key = value):</q-card-section>
      <q-separator />
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >{{ item.name }} = {{ item.value }}
          <div v-for="itema in archiveGames" :key="itema.id">
            <div v-show="itema.title === item.value">
              <p>{{ itema.title }}</p>
              <p>{{ itema.body }}</p>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { collection, onSnapshot, doc } from 'firebase/firestore'
import { db } from '../../firebase'

export default {
  setup: function () {
    const archiveGames = ref([])
    const eventsMounth = ref([])
    const eventsMounthL = ref([])
    const matchEvents = ref([])
    onSnapshot(collection(db, 'clubArchiveGames'), (querySnapshot) => {
      const fbAGames = []
      querySnapshot.forEach((doc) => {
        const event = {
          id: doc.id,
          title: doc.data().title,
          body: doc.data().body
        }
        fbAGames.push(event)
      })
      archiveGames.value = fbAGames
      console.log('fbAGames', archiveGames.value)
    })
    onSnapshot(collection(db, 'eventsTeams'), (querySnapshot) => {
      const fbEventsMounth = []
      querySnapshot.forEach((doc) => {
        const eventsTeams = {
          id: doc.id,
          name: doc.data().name,
          city: doc.data().city
        }
        fbEventsMounth.push(eventsTeams)
      })
      matchEvents.value = fbEventsMounth
      // console.log(doc)
      console.log('matchEvents', matchEvents.value)
    })
    onSnapshot(collection(db, 'siteEventsMounth/os/win'), (querySnapshot) => {
      const fbEventsMounth = []
      querySnapshot.forEach((doc) => {
        const eventMounth = {
          id: doc.id,
          name: doc.data().name,
          color: doc.data().color
        }
        fbEventsMounth.push(eventMounth)
      })
      eventsMounth.value = fbEventsMounth
      console.log(doc)
      // console.log('fbEventsMounth', eventsMounth.value)
    })
    onSnapshot(collection(db, 'siteEventsMounth/os/linux'), (querySnapshot) => {
      const fbEventsMounth = []
      querySnapshot.forEach((doc) => {
        const eventMounthL = {
          id: doc.id,
          name: doc.data().name,
          color: doc.data().color
        }
        fbEventsMounth.push(eventMounthL)
      })
      eventsMounthL.value = fbEventsMounth
      console.log(doc)
      // console.log('fbEventsMounth', eventsMounth.value)
    })

    const submitResult = ref([])

    return {
      preferred: ref('2022'),
      archiveGames,
      accepted: ref([]),
      submitResult,

      options: [
        {
          label: '2022',
          value: '2022'
        },
        {
          label: '2010',
          value: '2010'
        },
        {
          label: '2009',
          value: '2009'
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
