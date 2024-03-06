<template>
  <div class="q-pa-md row items-start q-gutter-md"
       v-for="card in historyClub"
       :key="card.id">
    <q-card class="my-card" flat bordered>
      <img
        alt="card logo"
        src="../../assets/image/fcsever_logo.png"
        style="width: 320px; height: 300px"
      >

      <q-card-section>
        <div class="text-overline text-orange-9">{{ card.overline }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ card.title }}</div>
        <div class="text-caption text-grey">
          {{ card.preview.substring(0, 130) }}
        </div>
        <q-card-actions>
          <div class="text-overline text-red-9">{{ card.more }}</div>
          <q-space />

          <q-btn
            color="red"
            round
            flat
            dense
            :icon="card.done ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="card.done = !card.done"
          />
        </q-card-actions>
      </q-card-section>
<!--      Block more-->
      <q-slide-transition>
        <div v-show="card.done">
          <q-separator />
          <q-card-section class="text-subtitle2" v-for="body in card.body" :key="body.id">
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
import { ref } from 'vue'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from 'src/firebase'

const archiveGamesRef = collection(db, 'historyClub')
export default {
  components: {},
  data () {
    return {}
  },
  setup: function () {
    const historyClub = ref([])
    onSnapshot(archiveGamesRef, (querySnapshot) => {
      const fbHClub = []
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
          more: doc.data().more,
          datestamp: doc.data().datestamp,
          img: doc.data().img,
          body: doc.data().body,
          preview: doc.data().preview
        }
        fbHClub.push(event)
      })
      historyClub.value = fbHClub
      console.log('historyClub', historyClub.value)
    })

    return {
      historyClub
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
