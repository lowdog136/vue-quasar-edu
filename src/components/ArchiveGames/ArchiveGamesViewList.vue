<template>
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
        <q-btn label="Submit" type="submit" color="primary"/>
      </div>
    </q-form>

    <q-card v-if="submitResult.length > 0" flat bordered class="q-mt-md bg-grey-11">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs rounded-borders text-left text-no-wrap"
        >{{ item.name }} = {{ item.value }}
          <div v-for="itema in archiveGames.slice(id).reverse()" :key="itema.id">
            <div v-show="itema.year === item.value">
              <q-card class="my-card" flat bordered>
                <q-card-section horizontal>
                  <q-card-section class="q-pt-xs">
                    <div class="text-overline">{{ itema.event }}</div>
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
                  <q-btn flat color="primary" disable>
                    Подробнее
                  </q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>
    </q-card>
  </div>
  <div v-for="itemz in archiveGames2007" :key="itemz.id">
    {{ itemz }}
  </div>
</template>

<script>
import { ref } from 'vue'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'

export default {
  setup: function () {
    const archiveGames = ref([])
    onSnapshot(collection(db, 'clubArchiveGames/archive/year'), (querySnapshot) => {
      const fbAGames = []
      querySnapshot.forEach((doc) => {
        const event = {
          id: doc.id,
          title: doc.data().title,
          year: doc.data().year,
          event: doc.data().event,
          score: doc.data().score,
          datestamp: doc.data().datestamp,
          date: doc.data().date,
          result: doc.data().result,
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

      options: [
        {
          label: '2007',
          value: '2007'
        },
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
<style lang="sass" scoped>
.my-card
  width: 100%
</style>
