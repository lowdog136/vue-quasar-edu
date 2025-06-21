<template>
  <div class="q-pa-md">
    <q-markup-table flat bordered>
      <thead class="bg-grey-13 text-primary">
      <tr>
        <th colspan="9">
          <div class="row no-wrap items-center">
            <q-img
              style="width: 70px"
              :ratio="1"
              class="rounded-borders"
              src="../../../assets/image/world-cup.png"
            />

            <div class="text-h5 q-ml-md text-primary">{{ tableTitle }}</div>
          </div>
        </th>
      </tr>
      <tr>
        <th v-for="item in columns" :key="item.id" :class=item.text>{{ item.label }}</th>
      </tr>
      </thead>
      <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
      <tr v-for="item in sortedItems" :key="item.id" :class="getRowClass(item)">
        <td :class=item.text_a>
          <div class="row items-center">
            <q-icon :name="item.icon" size="20px" class="q-mr-sm" />
            {{ item.name }}
          </div>
        </td>
        <td class="text-right">{{ item.games }}</td>
        <td class="text-right">{{ item.win }}</td>
        <td class="text-right">{{ item.draw }}</td>
        <td class="text-right">{{ item.lose }}</td>
        <td class="text-right">{{ item.ball_in }}</td>
        <td class="text-right">{{ item.ball_out }}</td>
        <td class="text-right">{{ item.score }}</td>
        <td class="text-right">{{ item.last_game }}</td>
      </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from 'src/firebase'

const columns = [
  {
    id: 1,
    text: 'text-left',
    label: '1 этап'
  },
  {
    id: 2,
    text: 'text-right',
    label: 'И'
  },
  {
    id: 3,
    text: 'text-right',
    label: 'В'
  },
  {
    id: 4,
    text: 'text-right',
    label: 'Н'
  },
  {
    id: 5,
    text: 'text-right',
    label: 'П'
  },
  {
    id: 6,
    text: 'text-right',
    label: 'З'
  },
  {
    id: 7,
    text: 'text-right',
    label: 'П'
  },
  {
    id: 8,
    text: 'text-right',
    label: 'О'
  },
  {
    id: 9,
    text: 'text-right',
    label: 'Ф'
  }
]

export default {
  name: 'gameTable',
  setup () {
    const tableTitle = ref('Чемпионат СЗФО')
    const rows = ref([])
    const loading = ref(true)

    // Firebase collection reference
    const eventTableCollectionRef = collection(db, 'event-table')
    const eventTableQuery = query(eventTableCollectionRef, orderBy('id', 'asc'))

    onMounted(async () => {
      // Load data from Firebase
      onSnapshot(eventTableQuery, (querySnapshot) => {
        const fbRows = []
        querySnapshot.forEach((doc) => {
          const ballIo = doc.data().ball_io || '0-0'
          const [ballIn, ballOut] = ballIo.split('-').map(num => parseInt(num) || 0)

          const row = {
            id: doc.data().id,
            text_a: doc.data().text_a || 'text-left',
            text_c: doc.data().text_c || 'primary',
            name: doc.data().name,
            color: doc.data().color || 'primary',
            games: doc.data().games || 0,
            win: doc.data().win || 0,
            draw: doc.data().draw || 0,
            lose: doc.data().lose || 0,
            ball_in: ballIn,
            ball_out: ballOut,
            score: doc.data().score || 0,
            last_game: doc.data().last_game || '',
            icon: doc.data().icon || 'sports_soccer'
          }
          fbRows.push(row)
        })
        rows.value = fbRows
        loading.value = false
      }, (error) => {
        console.error('Error loading event table data:', error)
        loading.value = false
      })
    })

    const sortedItems = computed(() => {
      return [...rows.value].sort((a, b) => {
        // Первый критерий: score от большего к меньшему
        if (a.score !== b.score) {
          return b.score - a.score
        }

        // Второй критерий: при равенстве очков - разница забитых и пропущенных от меньшей к большей
        const diffA = a.ball_in - a.ball_out
        const diffB = b.ball_in - b.ball_out
        if (diffA !== diffB) {
          return diffA - diffB
        }

        // Третий критерий: при равенстве разницы голов - больше забитых голов
        if (a.ball_in !== b.ball_in) {
          return b.ball_in - a.ball_in
        }

        return 0
      })
    })

    const getRowClass = (item) => {
      if (item.name === 'Север') {
        return 'bg-ae0000'
      }
      return ''
    }

    return {
      tableTitle,
      columns,
      rows,
      loading,
      sortedItems,
      getRowClass
    }
  }
}
</script>

<style lang="sass" scoped>
.bg-ae0000
  background-color: #ae0000 !important
  color: white !important
</style>
