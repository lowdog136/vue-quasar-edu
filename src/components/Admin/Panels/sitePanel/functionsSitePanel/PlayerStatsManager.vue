<template>
  <div class="q-pa-md">
    <div class="text-h6 q-mb-md">Управление статистикой игроков</div>

    <!-- Информационная карточка -->
    <q-card class="bg-blue-1 q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">
          <q-icon name="info" color="blue" />
          Информация о статистике
        </div>
        <div class="text-body2">
          <p>• Статистика игроков автоматически рассчитывается на основе данных из коллекции "all-games"</p>
          <p>• Голевые передачи извлекаются из поля "scorer" (второй элемент массива)</p>
          <p>• Пересчет рекомендуется после обновления данных в Firebase</p>
        </div>
      </q-card-section>
    </q-card>

    <!-- Кнопки управления -->
    <div class="row q-gutter-md q-mb-md">
      <q-btn
        color="primary"
        icon="refresh"
        label="Пересчитать голевые передачи"
        @click="recalculateAssists"
        :loading="loading"
        size="lg"
      >
        <q-tooltip>
          Пересчитать статистику ассистентов на основе текущих данных
        </q-tooltip>
      </q-btn>

      <q-btn
        color="secondary"
        icon="analytics"
        label="Показать текущую статистику"
        @click="showCurrentStats"
        :loading="loading"
        size="lg"
      >
        <q-tooltip>
          Показать текущую статистику ассистентов
        </q-tooltip>
      </q-btn>
    </div>

    <!-- Результаты пересчета -->
    <div v-if="statsResult" class="q-mb-md">
      <q-card :class="statsResult.success ? 'bg-positive' : 'bg-negative'" class="text-white">
        <q-card-section>
          <div class="text-h6">
            <q-icon :name="statsResult.success ? 'check_circle' : 'error'" />
            {{ statsResult.success ? 'Пересчет завершен' : 'Ошибка пересчета' }}
          </div>
          <div class="text-body1 q-mt-sm">{{ statsResult.message }}</div>

          <div v-if="statsResult.data" class="q-mt-md">
            <div class="text-subtitle1">Результаты:</div>
            <div class="row q-gutter-md">
              <div class="col-auto">
                <q-chip color="blue" text-color="white">
                  <q-avatar icon="sports_soccer" />
                  Всего передач: {{ statsResult.data.totalAssists }}
                </q-chip>
              </div>
              <div class="col-auto">
                <q-chip color="green" text-color="white">
                  <q-avatar icon="person" />
                  Ассистентов: {{ statsResult.data.uniqueAssistants }}
                </q-chip>
              </div>
              <div class="col-auto">
                <q-chip color="orange" text-color="white">
                  <q-avatar icon="event" />
                  Игр обработано: {{ statsResult.data.gamesProcessed }}
                </q-chip>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Текущая статистика -->
    <div v-if="currentStats.length > 0" class="q-mb-md">
      <q-card class="bg-grey-2">
        <q-card-section>
          <div class="text-h6">Текущая статистика ассистентов</div>
          <div class="text-caption q-mb-md">Данные на основе последнего пересчета</div>

          <q-list bordered separator>
            <q-item v-for="(assistant, index) in currentStats" :key="assistant.name">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ index + 1 }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-medium">{{ assistant.name }}</q-item-label>
                <q-item-label caption>
                  {{ assistant.totalAssists }} передач в {{ assistant.gamesCount }} играх
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-chip color="blue" text-color="white" size="sm">
                  {{ assistant.totalAssists }}
                </q-chip>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- Лог операций -->
    <div v-if="operationLog.length > 0" class="q-mt-md">
      <q-card class="bg-grey-1">
        <q-card-section>
          <div class="text-h6">Лог операций</div>
          <q-list dense>
            <q-item v-for="(log, index) in operationLog" :key="index">
              <q-item-section>
                <q-item-label class="text-caption text-grey">
                  {{ log.timestamp }}
                </q-item-label>
                <q-item-label>{{ log.message }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, query, orderBy, doc, setDoc } from 'firebase/firestore'
import { db } from 'src/firebase'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const loading = ref(false)
const statsResult = ref(null)
const currentStats = ref([])
const operationLog = ref([])
const allGames = ref([])

// Добавление записи в лог
const addLog = (message) => {
  const timestamp = new Date().toLocaleString('ru-RU')
  operationLog.value.unshift({
    timestamp,
    message
  })
  // Ограничиваем лог 10 последними записями
  if (operationLog.value.length > 10) {
    operationLog.value = operationLog.value.slice(0, 10)
  }
}

// Загрузка данных из Firebase
onMounted(() => {
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
    addLog(`Загружено ${games.length} игр из базы данных`)
  }, (error) => {
    console.error('Error fetching games: ', error)
    addLog(`Ошибка загрузки игр: ${error.message}`)
  })
})

// Пересчет голевых передач
const recalculateAssists = async () => {
  loading.value = true
  statsResult.value = null

  try {
    addLog('Начат пересчет голевых передач...')

    const assistantsMap = new Map()
    let gamesProcessed = 0
    let totalAssists = 0

    // Обработка всех игр
    allGames.value.forEach(game => {
      if (game.scorer && typeof game.scorer === 'object') {
        let gameHasAssists = false

        Object.values(game.scorer).forEach(goalArray => {
          if (Array.isArray(goalArray) && goalArray[1] && goalArray[1].trim()) {
            const assistantName = goalArray[1].trim()

            if (!assistantsMap.has(assistantName)) {
              assistantsMap.set(assistantName, {
                name: assistantName,
                totalAssists: 0,
                games: new Set()
              })
            }

            const assistant = assistantsMap.get(assistantName)
            assistant.totalAssists++
            assistant.games.add(game.id)
            totalAssists++
            gameHasAssists = true
          }
        })

        if (gameHasAssists) {
          gamesProcessed++
        }
      }
    })

    // Преобразование в массив для сохранения
    const assistantsArray = Array.from(assistantsMap.values()).map(assistant => ({
      name: assistant.name,
      totalAssists: assistant.totalAssists,
      gamesCount: assistant.games.size,
      games: Array.from(assistant.games)
    })).sort((a, b) => b.totalAssists - a.totalAssists)

    // Сохранение результатов в Firebase
    const statsRef = doc(db, 'player-stats', 'assists')
    await setDoc(statsRef, {
      lastUpdated: new Date().toISOString(),
      totalAssists,
      uniqueAssistants: assistantsArray.length,
      gamesProcessed,
      assistants: assistantsArray
    })

    // Обновление локального состояния
    currentStats.value = assistantsArray

    statsResult.value = {
      success: true,
      message: `Пересчет завершен успешно! Обработано ${gamesProcessed} игр.`,
      data: {
        totalAssists,
        uniqueAssistants: assistantsArray.length,
        gamesProcessed
      }
    }

    addLog(`Пересчет завершен: ${totalAssists} передач, ${assistantsArray.length} ассистентов`)

    $q.notify({
      color: 'positive',
      message: 'Статистика ассистентов успешно пересчитана!',
      icon: 'check_circle'
    })
  } catch (error) {
    console.error('Error recalculating assists: ', error)

    statsResult.value = {
      success: false,
      message: `Ошибка при пересчете: ${error.message}`
    }

    addLog(`Ошибка пересчета: ${error.message}`)

    $q.notify({
      color: 'negative',
      message: 'Ошибка при пересчете статистики',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

// Показать текущую статистику
const showCurrentStats = async () => {
  loading.value = true

  try {
    addLog('Загрузка текущей статистики...')

    // Попытка загрузить сохраненную статистику
    const statsRef = doc(db, 'player-stats', 'assists')
    const statsDoc = await statsRef.get()

    if (statsDoc.exists()) {
      const data = statsDoc.data()
      currentStats.value = data.assistants || []

      statsResult.value = {
        success: true,
        message: `Загружена статистика от ${new Date(data.lastUpdated).toLocaleString('ru-RU')}`,
        data: {
          totalAssists: data.totalAssists,
          uniqueAssistants: data.uniqueAssistants,
          gamesProcessed: data.gamesProcessed
        }
      }

      addLog(`Загружена статистика: ${data.totalAssists} передач, ${data.uniqueAssistants} ассистентов`)
    } else {
      // Если статистика не найдена, выполняем пересчет
      addLog('Сохраненная статистика не найдена, выполняется пересчет...')
      await recalculateAssists()
    }
  } catch (error) {
    console.error('Error loading current stats: ', error)
    addLog(`Ошибка загрузки статистики: ${error.message}`)

    $q.notify({
      color: 'negative',
      message: 'Ошибка при загрузке статистики',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.q-card {
  transition: all 0.3s ease;
}
</style>
