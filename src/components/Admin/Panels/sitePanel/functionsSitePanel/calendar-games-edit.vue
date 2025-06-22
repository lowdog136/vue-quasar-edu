<template>
  <div class="q-pa-md">
    <div class="text-h6 q-mb-md">Календарь игр (предстоящие и прошедшие)</div>

    <q-list bordered separator>
      <q-item v-for="game in games" :key="game.id" v-ripple :class="{ 'game-done': game.done }">
        <q-item-section avatar>
          <q-avatar :color="game.color" :text-color="getTextColor(game.color)" :icon="game.icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ game.event }}</q-item-label>
          <q-item-label caption>{{ game.date }} в {{ game.time }}</q-item-label>
          <q-item-label caption>{{ game.place }}</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ game.nameTeamHome }} - {{ game.nameTeamAway }}</q-item-label>
          <q-item-label caption>{{ game.tour }}</q-item-label>
          <!-- Отображение scorer -->
          <q-item-label caption v-if="formatScorer(game.scorer) !== 'Не указано'">
            <q-icon name="sports_soccer" size="xs" />
            {{ formatScorer(game.scorer) }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row items-center q-gutter-xs">
            <!-- Кнопка для редактирования scorer -->
            <q-btn
              flat
              round
              color="orange"
              icon="edit"
              @click.stop="editScorer(game)"
            >
              <q-tooltip>
                Редактировать авторов голов
              </q-tooltip>
            </q-btn>

            <!-- Кнопка для изменения иконки и цвета -->
            <q-btn
              flat
              round
              :color="game.icon === 'done_all' ? 'black' : 'primary'"
              :icon="game.icon === 'done_all' ? 'done_all' : 'bookmark'"
              @click.stop="toggleIconAndColor(game)"
            >
              <q-tooltip>
                {{ game.icon === 'done_all' ? 'Изменить на bookmark' : 'Изменить на done_all' }}
              </q-tooltip>
            </q-btn>

            <!-- Кнопка для изменения статуса done -->
            <q-btn
              flat
              round
              :color="game.done ? 'positive' : 'grey'"
              :icon="game.done ? 'check_circle' : 'radio_button_unchecked'"
              @click.stop="toggleDoneStatus(game)"
            >
              <q-tooltip>
                {{ game.done ? 'Отметить как "не состоялась"' : 'Отметить как "состоялась"' }}
              </q-tooltip>
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
      <q-item v-if="games.length === 0 && !loading">
        <q-item-section class="text-center">
          <q-item-label>Нет игр в календаре.</q-item-label>
        </q-item-section>
      </q-item>
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-list>

    <!-- Диалог редактирования scorer -->
    <q-dialog v-model="scorerDialog" persistent>
      <q-card style="min-width: 600px">
        <q-card-section>
          <div class="text-h6">Редактирование авторов голов</div>
          <div class="text-subtitle2">{{ selectedGame?.nameTeamHome }} - {{ selectedGame?.nameTeamAway }}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle2 q-mb-sm">Забившие голы:</div>
          <div class="row q-gutter-md">
            <div class="col-12">
              <div v-for="(goalArray, index) in Object.keys(editingScorer)" :key="`edit-goal-${index}`" class="q-mb-sm">
                <div class="text-caption">Гол {{ parseInt(index) + 1 }}:</div>
                <q-input
                  v-model="editingScorer[index][0]"
                  hint="Автор гола"
                  dense
                  outlined
                  class="q-mb-xs"
                />
                <q-input
                  v-model="editingScorer[index][1]"
                  hint="Ассистент (необязательно)"
                  dense
                  outlined
                  class="q-mb-xs"
                  :rules="[val => validateAssistant(val, index)]"
                />
                <q-input
                  v-model="editingScorer[index][2]"
                  hint="Время гола (например: 15, 45)"
                  dense
                  outlined
                  :rules="[val => validateGoalTime(val, index)]"
                />
              </div>
              <q-btn
                @click="addGoal"
                color="orange"
                icon="add"
                label="Добавить гол"
                size="sm"
                class="q-mt-xs"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="primary" @click="cancelScorerEdit" />
          <q-btn flat label="Сохранить" color="positive" @click="saveScorerEdit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { collection, onSnapshot, orderBy, query, doc, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase'
import { useQuasar } from 'quasar'

// Запрос для получения всех игр, отсортированных по статусу и дате
const gamesCollectionQuery = query(
  collection(db, '/all-games'),
  orderBy('done', 'asc'),
  orderBy('datestamp', 'desc')
)

export default {
  name: 'CalendarGamesList',
  setup () {
    const $q = useQuasar()
    const games = ref([])
    const loading = ref(true)
    const scorerDialog = ref(false)
    const selectedGame = ref(null)
    const editingScorer = ref({})

    onMounted(() => {
      onSnapshot(gamesCollectionQuery, (querySnapshot) => {
        const fbGames = []
        querySnapshot.forEach((doc) => {
          const game = {
            id: doc.id,
            ...doc.data()
          }
          // Приводим scorer к правильному виду
          if (!game.scorer || typeof game.scorer !== 'object') {
            game.scorer = {
              0: ['', '', '']
            }
          }
          fbGames.push(game)
        })
        games.value = fbGames
        loading.value = false
      }, (error) => {
        console.error('Error fetching games: ', error)
        loading.value = false
        $q.notify({
          color: 'negative',
          message: 'Ошибка загрузки игр.',
          icon: 'warning'
        })
      })
    })

    const getTextColor = (backgroundColor) => {
      if (!backgroundColor) return 'white'
      const color = backgroundColor.charAt(0) === '#' ? backgroundColor.substring(1, 7) : backgroundColor
      const r = parseInt(color.substring(0, 2), 16)
      const g = parseInt(color.substring(2, 4), 16)
      const b = parseInt(color.substring(4, 6), 16)
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? 'black' : 'white'
    }

    // Функция форматирования scorer
    const formatScorer = (scorer) => {
      if (!scorer || typeof scorer !== 'object') return 'Не указано'

      const goals = []
      for (const key in scorer) {
        if (Object.prototype.hasOwnProperty.call(scorer, key) && Array.isArray(scorer[key])) {
          const goalArray = scorer[key]
          if (goalArray[0] && goalArray[0].trim()) {
            let goalText = goalArray[0] // автор
            if (goalArray[1] && goalArray[1].trim()) {
              goalText += ` (ассистент: ${goalArray[1]})`
            }
            if (goalArray[2] && goalArray[2].trim()) {
              goalText += ` (${goalArray[2]})`
            }
            goals.push(goalText)
          }
        }
      }

      return goals.length > 0 ? goals.join(', ') : 'Не указано'
    }

    // Функция редактирования scorer
    const editScorer = (game) => {
      selectedGame.value = game
      // Копируем scorer для редактирования
      editingScorer.value = {}
      for (const key in game.scorer) {
        if (Object.prototype.hasOwnProperty.call(game.scorer, key)) {
          editingScorer.value[key] = [...game.scorer[key]]
        }
      }
      // Если scorer пустой, добавляем первый гол
      if (Object.keys(editingScorer.value).length === 0) {
        editingScorer.value[0] = ['', '', '']
      }
      scorerDialog.value = true
    }

    // Функция добавления гола
    const addGoal = () => {
      const nextIndex = Object.keys(editingScorer.value).length
      editingScorer.value[nextIndex] = ['', '', '']
    }

    // Функция валидации времени гола
    const validateGoalTime = (value, currentIndex) => {
      if (!value || value.trim() === '') return true // пустое значение разрешено

      // Проверяем, что это число
      const time = parseInt(value)
      if (isNaN(time) || time < 0 || time > 120) {
        return 'Время должно быть числом от 0 до 120'
      }

      // Проверяем последовательность времени
      for (let i = 0; i < currentIndex; i++) {
        const prevTime = editingScorer.value[i] && editingScorer.value[i][2] ? parseInt(editingScorer.value[i][2]) : 0
        if (!isNaN(prevTime) && time < prevTime) {
          return `Время гола должно быть больше или равно предыдущему (${prevTime})`
        }
      }

      return true
    }

    // Функция валидации ассистента
    const validateAssistant = (value, index) => {
      if (!value || value.trim() === '') return true // пустое значение разрешено

      // Проверяем, что ассистент не является автором
      if (value.trim().toLowerCase() === editingScorer.value[index][0].trim().toLowerCase()) {
        return 'Ассистент не может быть автором того же гола'
      }

      return true
    }

    // Функция сохранения scorer
    const saveScorerEdit = async () => {
      // Проверяем, что все добавленные голы заполнены корректно
      const scorer = editingScorer.value
      const filledGoals = []

      for (const key in scorer) {
        if (Object.prototype.hasOwnProperty.call(scorer, key)) {
          const goal = scorer[key]
          // Если есть автор гола, то должны быть заполнены все поля
          if (goal[0] && goal[0].trim()) {
            if (!goal[1] || !goal[1].trim()) {
              $q.notify({
                color: 'negative',
                message: 'Пожалуйста, заполните поле "Ассистент" для всех голов',
                icon: 'warning'
              })
              return
            }
            if (!goal[2] || !goal[2].trim()) {
              $q.notify({
                color: 'negative',
                message: 'Пожалуйста, заполните поле "Время гола" для всех голов',
                icon: 'warning'
              })
              return
            }
            // Проверяем, что время - это число
            const time = parseInt(goal[2])
            if (isNaN(time) || time < 0 || time > 120) {
              $q.notify({
                color: 'negative',
                message: 'Время гола должно быть числом от 0 до 120',
                icon: 'warning'
              })
              return
            }
            // Проверяем, что автор не является ассистентом
            if (goal[0].trim().toLowerCase() === goal[1].trim().toLowerCase()) {
              $q.notify({
                color: 'negative',
                message: 'Автор гола не может быть ассистентом того же гола',
                icon: 'warning'
              })
              return
            }

            filledGoals.push({ time, index: parseInt(key) })
          }
        }
      }

      // Проверяем последовательность времени
      filledGoals.sort((a, b) => a.index - b.index)
      for (let i = 1; i < filledGoals.length; i++) {
        if (filledGoals[i].time < filledGoals[i - 1].time) {
          $q.notify({
            color: 'negative',
            message: `Время гола ${filledGoals[i].index + 1} (${filledGoals[i].time}) не может быть меньше времени гола ${filledGoals[i - 1].index + 1} (${filledGoals[i - 1].time})`,
            icon: 'warning'
          })
          return
        }
      }

      try {
        const gameRef = doc(db, '/all-games', selectedGame.value.id)
        await updateDoc(gameRef, {
          scorer: editingScorer.value
        })

        $q.notify({
          color: 'positive',
          message: 'Авторы голов успешно обновлены!',
          icon: 'check_circle'
        })

        scorerDialog.value = false
        selectedGame.value = null
        editingScorer.value = {}
      } catch (error) {
        console.error('Error updating scorer: ', error)
        $q.notify({
          color: 'negative',
          message: 'Ошибка при обновлении авторов голов.',
          icon: 'report_problem'
        })
      }
    }

    // Функция отмены редактирования scorer
    const cancelScorerEdit = () => {
      scorerDialog.value = false
      selectedGame.value = null
      editingScorer.value = {}
    }

    // Функция для изменения иконки и цвета
    const toggleIconAndColor = async (game) => {
      const gameRef = doc(db, '/all-games', game.id)
      const newIcon = game.icon === 'done_all' ? 'bookmark' : 'done_all'
      const newColor = game.icon === 'done_all' ? 'primary' : 'black'

      try {
        await updateDoc(gameRef, {
          icon: newIcon,
          color: newColor
        })
        $q.notify({
          color: 'positive',
          position: 'top',
          message: `Иконка и цвет игры "${game.event}" изменены.`,
          icon: 'check_circle'
        })
      } catch (error) {
        console.error('Error updating icon and color: ', error)
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Ошибка при изменении иконки и цвета.',
          icon: 'report_problem'
        })
      }
    }

    // Функция для изменения статуса done
    const toggleDoneStatus = async (game) => {
      const gameRef = doc(db, '/all-games', game.id)
      try {
        await updateDoc(gameRef, {
          done: !game.done
        })
        $q.notify({
          color: 'positive',
          position: 'top',
          message: `Статус игры "${game.event}" изменен.`,
          icon: 'check_circle'
        })
      } catch (error) {
        console.error('Error updating done status: ', error)
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Ошибка при изменении статуса.',
          icon: 'report_problem'
        })
      }
    }

    return {
      games,
      loading,
      scorerDialog,
      selectedGame,
      editingScorer,
      getTextColor,
      formatScorer,
      editScorer,
      addGoal,
      validateGoalTime,
      validateAssistant,
      saveScorerEdit,
      cancelScorerEdit,
      toggleIconAndColor,
      toggleDoneStatus
    }
  }
}
</script>

<style scoped>
.game-done {
  opacity: 0.7;
  text-decoration: line-through;
}
.game-done .q-item__section--avatar {
  filter: grayscale(80%);
}
.q-item {
  transition: all 0.3s;
}
.q-item:hover {
  background-color: #f5f5f5;
}
</style>
