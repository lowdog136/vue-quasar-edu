<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="full-width">
      <div class="text-h5 text-center q-mb-md">Статистика игроков ФК "Север"</div>

      <!-- Переключатель типа статистики -->
      <div class="row justify-center q-mb-md">
        <q-btn-toggle
          v-model="statsType"
          :options="[
            { label: 'Бомбардиры', value: 'scorers' },
            { label: 'Ассистенты', value: 'assistants' }
          ]"
          color="primary"
          text-color="white"
          class="q-mb-md"
          spread
          rounded
          unelevated
        />
      </div>

      <!-- Информация о новых записях -->
      <div v-if="newRecordsCount > 0" class="q-mb-md">
        <q-banner class="bg-positive text-white">
          <template v-slot:avatar>
            <q-icon name="new_releases" color="white" />
          </template>
          <div class="text-subtitle1">Новые записи!</div>
          <div class="text-body2">
            {{ newRecordsCount }} новых {{ getNewRecordsLabel(newRecordsCount) }} с последнего просмотра
            <q-btn
              flat
              color="white"
              label="Отметить как просмотренные"
              @click="markAsViewed"
              size="sm"
              class="q-ml-md"
            />
          </div>
        </q-banner>
      </div>

      <!-- Фильтры -->
      <div class="row q-gutter-md q-mb-md">
        <q-select
          v-model="selectedYear"
          :options="yearOptions"
          label="Год"
          outlined
          dense
          style="min-width: 120px"
        />
        <q-select
          v-model="selectedEvent"
          :options="eventOptions"
          label="Турнир"
          outlined
          dense
          style="min-width: 200px"
        />
        <q-toggle
          v-model="showOnlyNew"
          label="Только новые"
          color="positive"
        />
      </div>

      <!-- Статистика -->
      <div class="row q-gutter-md q-mb-md">
        <q-card class="bg-blue-1">
          <q-card-section>
            <div class="text-h6">{{ totalCount }}</div>
            <div class="text-caption">{{ statsType === 'scorers' ? 'Всего голов' : 'Всего передач' }}</div>
          </q-card-section>
        </q-card>
        <q-card class="bg-green-1">
          <q-card-section>
            <div class="text-h6">{{ uniquePlayers }}</div>
            <div class="text-caption">{{ statsType === 'scorers' ? 'Уникальных бомбардиров' : 'Уникальных ассистентов' }}</div>
          </q-card-section>
        </q-card>
        <q-card v-if="newRecordsCount > 0" class="bg-positive text-white">
          <q-card-section>
            <div class="text-h6">{{ newRecordsCount }}</div>
            <div class="text-caption">Новых записей</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Список игроков -->
      <stats-list
        v-if="statsType === 'scorers' || statsType === 'assistants'"
        :items="filteredPlayers"
        :NewsCardHeader="statsType === 'scorers' ? 'Бомбардиры' : 'Ассистенты'"
        NewsCardYear=""
        :lastViewedDate="lastViewedDate"
      />

      <!-- Индикатор загрузки -->
      <div v-if="loading" class="text-center q-pa-md">
        <q-spinner-dots size="50px" color="primary" />
        <div class="text-caption q-mt-sm">Загрузка данных...</div>
      </div>

      <!-- Сообщение об отсутствии данных -->
      <div v-if="!loading && filteredPlayers.length === 0" class="text-center q-pa-md">
        <q-icon name="info" size="50px" color="grey" />
        <div class="text-h6 q-mt-sm text-grey">Нет данных {{ statsType === 'scorers' ? 'о бомбардирах' : 'об ассистентах' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { collection, onSnapshot, query, orderBy, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from 'src/firebase'
import { useQuasar } from 'quasar'
import StatsList from 'components/Stats/stats-list.vue'

const $q = useQuasar()
const loading = ref(true)
const allGames = ref([])
const selectedYear = ref('2025')
const selectedEvent = ref('Все турниры')
const showOnlyNew = ref(false)
const lastViewedDate = ref(null)
const newRecordsCount = ref(0)
const statsType = ref('scorers') // 'scorers' или 'assistants'

// Получение уникальных годов и турниров
const yearOptions = computed(() => {
  const years = [...new Set(allGames.value.map(game => game.year || '2006'))]
  return years.sort((a, b) => b - a)
})

const eventOptions = computed(() => {
  const events = [...new Set(allGames.value.map(game => game.event))]
  return ['Все турниры', ...events.sort()]
})

// Функция для склонения слова "запись"
const getNewRecordsLabel = (count) => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'записей'
  }

  if (lastDigit === 1) {
    return 'запись'
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return 'записи'
  } else {
    return 'записей'
  }
}

// Загрузка даты последнего просмотра
const loadLastViewedDate = async () => {
  try {
    const collectionName = statsType.value === 'scorers' ? 'scorers-viewed' : 'assistants-viewed'
    const userStatsRef = doc(db, 'user-stats', collectionName)
    const userStatsDoc = await getDoc(userStatsRef)

    if (userStatsDoc.exists()) {
      lastViewedDate.value = userStatsDoc.data().lastViewed
    } else {
      // Если нет сохраненной даты, устанавливаем текущую
      lastViewedDate.value = new Date().toISOString()
      await setDoc(userStatsRef, { lastViewed: lastViewedDate.value })
    }
  } catch (error) {
    console.error('Error loading last viewed date:', error)
    lastViewedDate.value = new Date().toISOString()
  }
}

// Отметить как просмотренные
const markAsViewed = async () => {
  try {
    const collectionName = statsType.value === 'scorers' ? 'scorers-viewed' : 'assistants-viewed'
    const userStatsRef = doc(db, 'user-stats', collectionName)
    lastViewedDate.value = new Date().toISOString()
    await setDoc(userStatsRef, { lastViewed: lastViewedDate.value })

    newRecordsCount.value = 0

    $q.notify({
      color: 'positive',
      message: 'Все записи отмечены как просмотренные',
      icon: 'check_circle'
    })
  } catch (error) {
    console.error('Error marking as viewed:', error)
    $q.notify({
      color: 'negative',
      message: 'Ошибка при обновлении статуса просмотра',
      icon: 'error'
    })
  }
}

// Обработка данных о бомбардирах
const processScorersData = (games) => {
  const scorersMap = new Map()
  let newRecords = 0

  games.forEach(game => {
    if (game.scorer && typeof game.scorer === 'object') {
      Object.values(game.scorer).forEach(goalArray => {
        if (Array.isArray(goalArray) && goalArray[0] && goalArray[0].trim() && goalArray[0].trim() !== '-') {
          const scorerName = goalArray[0].trim()

          if (!scorersMap.has(scorerName)) {
            scorersMap.set(scorerName, {
              name: scorerName,
              goals: [],
              totalGoals: 0,
              isNewPlayer: false
            })
          }

          const scorer = scorersMap.get(scorerName)
          const isNewGoal = lastViewedDate.value && game.datestamp &&
            new Date(game.datestamp && typeof game.datestamp.toDate === 'function' ? game.datestamp.toDate() : game.datestamp) > new Date(lastViewedDate.value)

          scorer.goals.push({
            game: game,
            goalTime: goalArray[2] || '',
            assistant: goalArray[1] || '',
            isNew: isNewGoal
          })

          if (isNewGoal) {
            newRecords++
            scorer.isNewPlayer = true
          }

          scorer.totalGoals++
        }
      })
    }
  })

  return { players: Array.from(scorersMap.values()), newRecords }
}

// Обработка данных об ассистентах
const processAssistantsData = (games) => {
  const assistantsMap = new Map()
  let newRecords = 0

  games.forEach(game => {
    if (game.scorer && typeof game.scorer === 'object') {
      Object.values(game.scorer).forEach(goalArray => {
        if (Array.isArray(goalArray) && goalArray[1] && goalArray[1].trim() && goalArray[1].trim() !== '-') {
          const assistantName = goalArray[1].trim()

          if (!assistantsMap.has(assistantName)) {
            assistantsMap.set(assistantName, {
              name: assistantName,
              assists: [],
              totalAssists: 0,
              isNewPlayer: false
            })
          }

          const assistant = assistantsMap.get(assistantName)
          const isNewAssist = lastViewedDate.value && game.datestamp &&
            new Date(game.datestamp && typeof game.datestamp.toDate === 'function' ? game.datestamp.toDate() : game.datestamp) > new Date(lastViewedDate.value)

          assistant.assists.push({
            game: game,
            goalTime: goalArray[2] || '',
            scorer: goalArray[0] || '',
            isNew: isNewAssist
          })

          if (isNewAssist) {
            newRecords++
            assistant.isNewPlayer = true
          }

          assistant.totalAssists++
        }
      })
    }
  })

  return { players: Array.from(assistantsMap.values()), newRecords }
}

// Обработка данных в зависимости от типа статистики
const processData = (games) => {
  if (statsType.value === 'scorers') {
    return processScorersData(games)
  } else {
    return processAssistantsData(games)
  }
}

// Фильтрация игроков
const filteredPlayers = computed(() => {
  let filteredGames = allGames.value

  // Фильтр по году
  if (selectedYear.value && selectedYear.value !== 'Все годы') {
    filteredGames = filteredGames.filter(game => {
      // Если выбран 2006 год, включаем игры с пустым годом
      if (selectedYear.value === '2006') {
        return game.year === '2006' || game.year === ''
      }
      return game.year === selectedYear.value
    })
  }

  // Фильтр по турниру
  if (selectedEvent.value && selectedEvent.value !== 'Все турниры') {
    filteredGames = filteredGames.filter(game => game.event === selectedEvent.value)
  }

  const { players } = processData(filteredGames)

  let result = players.map(player => ({
    id: player.name,
    name: player.name,
    playerUrl: '././assets/image/football-player.png',
    scoreCount: statsType.value === 'scorers' ? player.totalGoals.toString() : player.totalAssists.toString(),
    old: false,
    status: player.isNewPlayer ? 'new' : 'old',
    eventsList: (statsType.value === 'scorers' ? player.goals : player.assists).map(item => ({
      id: item.game.id,
      eventsListDate: formatDate(item.game.date),
      eventsListEvent: statsType.value === 'scorers'
        ? `${item.game.nameTeamHome} ${item.game.goalTeamHome} - ${item.game.goalTeamAway} ${item.game.nameTeamAway}${item.goalTime ? ` (${item.goalTime}')` : ''}`
        : `${item.game.nameTeamHome} ${item.game.goalTeamHome} - ${item.game.goalTeamAway} ${item.game.nameTeamAway}`,
      event: item.game.event || 'Другие турниры',
      isNew: item.isNew
    }))
  })).sort((a, b) => parseInt(b.scoreCount) - parseInt(a.scoreCount))

  // Фильтр только новых записей
  if (showOnlyNew.value) {
    result = result.filter(player => player.status === 'new')
  }

  return result
})

// Статистика
const totalCount = computed(() => {
  return filteredPlayers.value.reduce((total, player) => total + parseInt(player.scoreCount), 0)
})

const uniquePlayers = computed(() => {
  return filteredPlayers.value.length
})

// Функция форматирования даты
const formatDate = (dateString) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString

  const months = [
    'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
    'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
  ]

  const month = months[date.getMonth()]
  const day = date.getDate()

  return `${month} ${day}`
}

// Следим за изменением типа статистики
watch(statsType, async () => {
  await loadLastViewedDate()
})

// Следим за изменением filteredPlayers и обновляем newRecordsCount
watch(filteredPlayers, (players) => {
  let count = 0
  players.forEach(player => {
    if (player.status === 'new') {
      count += (statsType.value === 'scorers' ? player.eventsList.length : player.eventsList.length)
    }
  })
  newRecordsCount.value = count
}, { immediate: true })

// Загрузка данных
onMounted(async () => {
  await loadLastViewedDate()

  const gamesCollectionRef = collection(db, '/all-games')
  const gamesQuery = query(gamesCollectionRef, orderBy('date', 'desc'))

  onSnapshot(gamesQuery, (querySnapshot) => {
    const games = []
    querySnapshot.forEach((doc) => {
      const game = {
        id: doc.id,
        ...doc.data()
      }
      // Приводим scorer к правильному виду
      if (!game.scorer || typeof game.scorer !== 'object') {
        game.scorer = {}
      }
      games.push(game)
    })
    allGames.value = games
    loading.value = false
  }, (error) => {
    console.error('Error fetching games: ', error)
    loading.value = false
  })
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
