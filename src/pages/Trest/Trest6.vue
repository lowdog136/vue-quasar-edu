<template>
  <div class="q-px-lg q-pb-md">
        <div class="title">
      {{titleMainEvent }}
    </div>
    <div>
      <div v-for="item in events.slice(id).reverse()" :key="item.id">
        <div>
          {{ item.id }}
          <p>date:{{ item.date }}</p>
          <p>mounth:{{ item.mounth }}</p>
          <p>nameEvent:{{ item.nameEvent }}</p>
          ---
        </div>
      </div>
    </div>
    <q-separator color="primary"/>
    <div>
      <div v-for="itemM in eventsMounth.slice(id).reverse()" :key="itemM.id">
        <div>
          {{ itemM }}
        </div>
      </div>
      <div v-for="itemM in eventsMounthL.slice(id).reverse()" :key="itemM.id">
        <div>
          {{ itemM }}
        </div>
      </div>
    </div>
    <q-separator color="primary"/>
    <div>
      <div v-for="itemM in matchEvents.slice(id).reverse()" :key="itemM.id">
        <div>
          {{ itemM }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useQuasar } from 'quasar'

const eventsCollectionRef = collection(db, 'siteEvents')

export default {
  name: 'trest6',
  components: {},
  data () {
    return {
      tames: [
        {
          id: 1,
          mounth: 'Май, 2022'
        },
        {
          id: 2,
          mounth: 'Июнь, 2022'
        },
        {
          id: 3,
          mounth: 'Июль, 2022'
        },
        {
          id: 4,
          mounth: 'Август, 2022'
        },
        {
          id: 5,
          mounth: 'Сентябрь, 2022'
        }
      ],
      games: [
        {
          id: 1,
          mounth: 'Май, 2022',
          matchEvents: [
            {
              id: 1,
              tour: '1 тур',
              nameEvent: 'СШ "Электрон" 0-3 ФК "Север"',
              color: 'orange-14',
              data: 'май 29, 2022',
              mounth: 'май',
              icon: 'done_all'
            }
          ]
        },
        {
          id: 2,
          mounth: 'Июнь, 2022',
          matchEvents: [
            {
              id: 1,
              tour: '2 тур',
              nameEvent: 'СШ "Ленинградец" 1-2 ФК "Север"',
              color: 'orange-14',
              data: 'Июнь 1, 2022',
              mounth: 'June',
              icon: 'done_all'
            },
            {
              id: 2,
              tour: '3 тур',
              nameEvent: 'ФК "Новград" 1-1 ФК "Север"',
              color: 'orange-14',
              data: 'Июнь 11, 2022',
              mounth: 'June',
              icon: 'done_all'
            },
            {
              id: 3,
              tour: '4 тур',
              nameEvent: 'ФК "Псков" 0-2 ФК "Север"',
              color: 'red',
              data: 'Июнь 15, 2022',
              mounth: 'June',
              icon: 'local_fire_department'
            },
            {
              id: 3,
              tour: '5 тур',
              nameEvent: 'СШ №2 ВО "Звезда" 1-2 ФК "Север"',
              color: 'orange-14',
              data: 'Июнь 18, 2022',
              mounth: 'June',
              icon: 'done_all'
            },
            {
              id: 3,
              tour: '6 тур',
              nameEvent: 'ФК "Север" 3-0 ФК "Химик',
              color: 'orange-14',
              data: 'Июнь 29, 2022',
              mounth: 'June',
              icon: 'done_all'
            }
          ]
        },
        {
          id: 3,
          mounth: 'Июль, 2022',
          matchEvents: [
            {
              id: 1,
              tour: '7 тур',
              nameEvent: 'ФК "Север" 2-0 СШ №7 Карелия',
              color: 'orange-14',
              data: 'июль 2, 2022',
              mounth: 'июль',
              icon: 'sentiment_very_satisfied'
            }
          ]
        },
        {
          id: 4,
          mounth: 'Август, 2022',
          matchEvents: [
            {
              id: 1,
              tour: '8 тур',
              nameEvent: 'ФК "Север" 7-0 СШ "Электрон"',
              color: 'orange-14',
              data: 'август 6, 2022',
              icon: 'done_all',
              planeVisitCount: 0
            },
            {
              id: 2,
              tour: '9 тур',
              nameEvent: 'ФК "Север" 3-0 ФК "Новград"',
              color: 'orange-14',
              data: 'август 9, 2022',
              icon: 'done_all',
              planeVisitCount: 0
            },
            {
              id: 3,
              tour: '10 тур',
              nameEvent: 'ФК "Север" - СШ №2 ВО "Звезда"',
              color: 'teal',
              data: 'август 13, 2022',
              icon: 'event',
              planeVisitCount: 0
            },
            {
              id: 4,
              tour: '11 тур',
              nameEvent: 'СШ №7 Карелия - ФК "Север"',
              color: 'teal',
              data: 'август 20, 2022',
              icon: 'sentiment_very_satisfied',
              planeVisitCount: 0
            },
            {
              id: 5,
              tour: '12 тур',
              nameEvent: 'ФК "Химик" - ФК "Север"',
              color: 'teal',
              data: 'август 25, 2022',
              icon: 'event',
              planeVisitCount: 0
            }
          ]
        },
        {
          id: 5,
          mounth: 'Сентябрь, 2022',
          matchEvents: [
            {
              id: 1,
              tour: '13 тур',
              nameEvent: 'ФК "Север" - ФК "Псков"',
              color: 'red',
              data: 'сентябрь 14, 2022',
              icon: 'local_fire_department',
              planeVisitCount: 0
            },
            {
              id: 1,
              tour: '14 тур',
              nameEvent: 'ФК "Север" - СШ Ленинградец',
              color: 'teal',
              data: 'сентябрь 17, 2022',
              icon: 'event',
              planeVisitCount: 0
            }
          ]
        }
      ]
    }
  },
  setup: function () {
    const events = ref([])
    const eventsMounth = ref([])
    const eventsMounthL = ref([])
    const matchEvents = ref([])
    onSnapshot(collection(db, 'siteEvents'), (querySnapshot) => {
      const fbEvents = []
      querySnapshot.forEach((doc) => {
        const event = {
          id: doc.id,
          color: doc.data().color,
          date: doc.data().date,
          icon: doc.data().icon,
          mounth: doc.data().mounth,
          nameEvent: doc.data().nameEvent,
          tour: doc.data().tour
        }
        fbEvents.push(event)
      })
      events.value = fbEvents
      console.log('fbEvents', events.value)
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
    const toggleDone = id => {
      const index = events.value.findIndex(event => event.id === id)
      updateDoc(doc(eventsCollectionRef, id), {
        done: !events.value[index].done
      })
    }
    const $q = useQuasar()

    return {
      titleEvent: 'Чемпионат СЗФО',
      toggleDone,
      events,
      eventsMounth,
      matchEvents,
      eventsMounthL,
      btnSize: 'xs',
      titleMainEvent: 'Календарь игр ФК "Север" в 2022 году',
      layout: computed(() => {
        return $q.screen.lt.sm ? 'dense' : ($q.screen.lt.md ? 'comfortable' : 'loose')
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.title
  font-size: 28px
  text-align: center
  color: #2c3e50
.my-card
  width: 100%
  max-width: 350px
</style>
