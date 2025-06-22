<template>
  <div>
    <!-- Форма добавления новой игры -->
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card bordered class="bg-grey-3 my-card">
        <q-card-section>
          <div class="text-h6">Добавить новую игру</div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              v-model="newGame.year"
              label="Год"
              hint="Год проведения"
              outlined
              dense
            />

            <q-select
              v-model="newGame.event"
              :options="eventOptions"
              label="Турнир"
              outlined
              dense
            />

            <q-input
              v-model="newGame.place"
              label="Место проведения"
              hint="Место проведения матча"
              outlined
              dense
            />

            <q-input
              v-model="newGame.tour"
              label="Тур/Этап"
              hint="Тур или этап розыгрыша"
              outlined
              dense
            />

            <q-input
              v-model="newGame.nameTeamHome"
              label="Домашняя команда"
              outlined
              dense
              bg-color="orange-1"
            />

            <q-input
              v-model="newGame.nameCityTeamHome"
              label="Город домашней команды"
              outlined
              dense
              bg-color="orange-1"
            />

            <q-input
              v-model="newGame.goalTeamHome"
              label="Голы домашней команды"
              outlined
              dense
              bg-color="orange-1"
            />

            <q-input
              v-model="newGame.nameTeamAway"
              label="Гостевая команда"
              outlined
              dense
              bg-color="red-1"
            />

            <q-input
              v-model="newGame.nameCityTeamAway"
              label="Город гостевой команды"
              outlined
              dense
              bg-color="red-1"
            />

            <q-input
              v-model="newGame.goalTeamAway"
              label="Голы гостевой команды"
              outlined
              dense
              bg-color="red-1"
            />

            <!-- Структурированный интерфейс для scorer -->
            <div class="q-mt-md">
              <div class="text-subtitle2 q-mb-sm">Забившие голы (scorer):</div>
              <div class="row q-gutter-md">
                <!-- Команда 1 -->
                <div class="col-12">
                  <div class="text-caption q-mb-xs">Команда 1:</div>
                  <div v-for="(goalArray, index) in Object.keys(newGame.scorer)" :key="`goal-${index}`" class="q-mb-sm">
                    <div class="text-caption">Гол {{ parseInt(index) + 1 }}:</div>
                    <q-input
                      v-model="newGame.scorer[index][0]"
                      hint="Автор гола"
                      dense
                      outlined
                      bg-color="orange-1"
                      class="q-mb-xs"
                    />
                    <q-input
                      v-model="newGame.scorer[index][1]"
                      hint="Ассистент (необязательно)"
                      dense
                      outlined
                      bg-color="orange-1"
                      class="q-mb-xs"
                      :rules="[val => validateAssistant(val, index)]"
                    />
                    <q-input
                      v-model="newGame.scorer[index][2]"
                      hint="Время гола (например: 15, 45)"
                      dense
                      outlined
                      bg-color="orange-1"
                      :rules="[val => validateGoalTime(val, index)]"
                    />
                  </div>
                  <q-btn
                    @click="addGoal(1)"
                    color="orange"
                    icon="add"
                    label="Добавить гол"
                    size="sm"
                    class="q-mt-xs"
                  />
                </div>
              </div>
            </div>

            <q-input
              v-model="newGame.result"
              label="Результат"
              hint="Дополнительная информация о результате"
              outlined
              dense
            />

            <!-- Выбор даты с календарём -->
            <q-input
              v-model="newGame.date"
              label="Дата проведения матча"
              hint="Дата проведения матча"
              outlined
              dense
              readonly
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer" @click.stop="openDatePicker" />
              </template>
            </q-input>
            <q-dialog v-model="datePickerAddOpen" persistent>
              <q-card>
                <q-card-section>
                  <div class="text-h6">Выберите дату</div>
                </q-card-section>
                <q-card-section>
                  <q-date v-model="newGame.date" mask="YYYY-MM-DD" locale="ru" today-btn />
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Отмена" color="primary" @click="datePickerAddOpen = false" />
                  <q-btn flat label="OK" color="primary" @click="datePickerAddOpen = false" />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-input
              v-model="newGame.body"
              label="Описание"
              hint="Дополнительное описание"
              outlined
              dense
              type="textarea"
            />

            <q-select
              v-model="newGame.icon"
              :options="iconOptions"
              label="Иконка"
              outlined
              dense
            />

            <q-select
              v-model="newGame.color"
              :options="colorOptions"
              label="Цвет"
              outlined
              dense
            />
          </q-form>
        </q-card-section>

        <q-card-section>
          <q-btn
            @click="addGame"
            color="primary"
            icon="add"
            label="Добавить игру"
            class="full-width"
          />

          <q-toggle
            v-model="showGames"
            :label="`Показывать игры (${showGames})`"
            color="red"
            class="q-mt-md"
          />
        </q-card-section>
      </q-card>
    </div>

    <!-- Список игр для редактирования -->
    <div v-if="showGames" class="q-pa-md row items-start q-gutter-md">
      <q-card
        v-for="game in games"
        :key="game.id"
        class="bg-grey-9 my-card"
        dark
        bordered
      >
        <q-card-section>
          <div class="text-h6">ID: {{ game.id }}</div>
        </q-card-section>

        <q-card-section>
          <!-- Event -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Турнир: {{ game.event }}
                <q-popup-edit v-model="game.event" class="bg-accent text-white" v-slot="scope">
                  <q-input
                    dark
                    color="white"
                    v-model="scope.value"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'event', game.event)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Year -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Год: {{ game.year }}
                <q-popup-edit v-model="game.year" class="bg-accent text-white" v-slot="scope">
                  <q-input
                    dark
                    color="white"
                    v-model="scope.value"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'year', game.year)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Title -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Название: {{ game.title }}
                <q-popup-edit v-model="game.title" class="bg-accent text-white" v-slot="scope">
                  <q-input
                    dark
                    color="white"
                    v-model="scope.value"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'title', game.title)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Tour -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Тур: {{ game.tour }}
                <q-popup-edit v-model="game.tour" class="bg-accent text-white" v-slot="scope">
                  <q-input
                    dark
                    color="white"
                    v-model="scope.value"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'tour', game.tour)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Date -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Дата: {{ formatDate(game.date) }}
                <q-popup-edit v-model="game.date" class="bg-accent text-white" v-slot="scope">
                  <q-input
                    dark
                    color="white"
                    v-model="scope.value"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'date', game.date)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Score -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Счет: {{ game.score }}
                <q-popup-edit v-model="game.score" class="bg-accent text-white" v-slot="scope">
                  <q-input
                    dark
                    color="white"
                    v-model="scope.value"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'score', game.score)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Result -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Результат: {{ game.result }}
                <q-popup-edit v-model="game.result" class="bg-accent text-white" v-slot="scope">
                  <q-input
                    dark
                    color="white"
                    v-model="scope.value"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'result', game.result)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Scorer -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Забившие голы: {{ formatScorer(game.scorer) }}
                <q-popup-edit v-model="game.scorer" class="bg-accent text-white" v-slot="scope">
                  <div class="q-pa-md">
                    <div class="text-subtitle2 q-mb-sm text-white">Редактирование scorer:</div>
                    <div class="row q-gutter-md">
                      <!-- Команда 1 -->
                      <div class="col-12">
                        <div class="text-caption q-mb-xs text-white">Команда 1:</div>
                        <div v-for="(goalArray, index) in Object.keys(scope.value)" :key="`edit-team1-goal-${index}`" class="q-mb-sm">
                          <div class="text-caption text-white">Гол {{ parseInt(index) + 1 }}:</div>
                          <q-input
                            v-model="scope.value[index][0]"
                            hint="Автор гола"
                            dense
                            dark
                            class="q-mb-xs"
                          />
                          <q-input
                            v-model="scope.value[index][1]"
                            hint="Ассистент (необязательно)"
                            dense
                            dark
                            :rules="[val => validateAssistantEdit(val, index, scope.value)]"
                          />
                          <q-input
                            v-model="scope.value[index][2]"
                            hint="Время гола"
                            dense
                            dark
                            :rules="[val => validateGoalTimeEdit(val, index, scope.value)]"
                          />
                        </div>
                        <q-btn
                          @click="addGoalToEdit(scope.value)"
                          color="orange"
                          icon="add"
                          label="Добавить гол"
                          size="sm"
                          class="q-mt-xs"
                        />
                      </div>
                    </div>
                    <div class="q-mt-md">
                      <q-btn @click="scope.set" color="positive" label="Сохранить" />
                    </div>
                  </div>
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'scorer', game.scorer)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Body -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Описание: {{ game.body }}
                <q-popup-edit v-model="game.body" class="bg-accent text-white" v-slot="scope">
                  <q-input
                    dark
                    color="white"
                    v-model="scope.value"
                    dense
                    autofocus
                    type="textarea"
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'body', game.body)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-card-actions>
          <q-btn
            @click="deleteGame(game.id)"
            color="negative"
            icon="delete"
            label="Удалить"
            flat
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, addDoc, doc, deleteDoc, query, orderBy, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from 'src/firebase'

export default {
  name: 'GamesNowEventEdit',

  setup () {
    // Коллекция Firebase
    const gamesCollectionRef = collection(db, '/all-games')
    const gamesCollectionQuery = query(gamesCollectionRef, orderBy('date', 'desc'))

    // Состояние компонента
    const games = ref([])
    const showGames = ref(false)
    const datePickerAddOpen = ref(false)

    // Новая игра
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD формат
    const newGame = ref({
      year: '2025',
      event: 'Чемпионат СЗФО',
      place: '',
      tour: '',
      nameTeamHome: '',
      nameCityTeamHome: '',
      goalTeamHome: '',
      nameTeamAway: '',
      nameCityTeamAway: '',
      goalTeamAway: '',
      scorer: {
        0: ['', '', '']
      },
      result: '',
      date: today,
      body: '',
      icon: 'bookmark',
      color: 'primary'
    })

    // Опции для селектов
    const eventOptions = [
      'Чемпионат СЗФО',
      'Кубок МРО',
      'Кубок СЗФО',
      'Кубок Астории',
      'XXV турнир полпреда СЗФО',
      'XXVI турнир полпреда СЗФО',
      'товарищеский матч',
      'Третья лига, финальный этап'
    ]

    const iconOptions = [
      'bookmark',
      'event',
      'sports_soccer',
      'flag',
      'emoji_events'
    ]

    const colorOptions = [
      'primary',
      'secondary',
      'accent',
      'positive',
      'negative',
      'info',
      'warning'
    ]

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

    // Функция добавления игры
    const addGame = () => {
      // Проверяем, что дата выбрана
      if (!newGame.value.date) {
        alert('Пожалуйста, выберите дату проведения матча')
        return
      }

      // Проверяем, что все добавленные голы заполнены корректно
      const scorer = newGame.value.scorer
      const filledGoals = []

      for (const key in scorer) {
        if (Object.prototype.hasOwnProperty.call(scorer, key)) {
          const goal = scorer[key]
          // Если есть автор гола, то должны быть заполнены все поля
          if (goal[0] && goal[0].trim()) {
            if (!goal[1] || !goal[1].trim()) {
              alert('Пожалуйста, заполните поле "Ассистент" для всех голов')
              return
            }
            if (!goal[2] || !goal[2].trim()) {
              alert('Пожалуйста, заполните поле "Время гола" для всех голов')
              return
            }
            // Проверяем, что время - это число
            const time = parseInt(goal[2])
            if (isNaN(time) || time < 0 || time > 120) {
              alert('Время гола должно быть числом от 0 до 120')
              return
            }
            // Проверяем, что автор не является ассистентом
            if (goal[0].trim().toLowerCase() === goal[1].trim().toLowerCase()) {
              alert('Автор гола не может быть ассистентом того же гола')
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
          alert(`Время гола ${filledGoals[i].index + 1} (${filledGoals[i].time}) не может быть меньше времени гола ${filledGoals[i - 1].index + 1} (${filledGoals[i - 1].time})`)
          return
        }
      }

      addDoc(gamesCollectionRef, {
        event: newGame.value.event,
        title: newGame.value.title || '',
        tour: newGame.value.tour,
        body: newGame.value.body,
        year: newGame.value.year,
        nameTeamHome: newGame.value.nameTeamHome,
        nameTeamAway: newGame.value.nameTeamAway,
        nameCityTeamHome: newGame.value.nameCityTeamHome,
        nameCityTeamAway: newGame.value.nameCityTeamAway,
        goalTeamHome: newGame.value.goalTeamHome,
        goalTeamAway: newGame.value.goalTeamAway,
        date: newGame.value.date,
        datestamp: Timestamp.now(),
        done: false,
        icon: newGame.value.icon,
        place: newGame.value.place,
        color: newGame.value.color,
        scorer: newGame.value.scorer,
        score: `${newGame.value.goalTeamHome}-${newGame.value.goalTeamAway}`,
        result: newGame.value.result
      })

      // Сброс формы с текущей датой
      const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD формат
      newGame.value = {
        year: '2025',
        event: 'Чемпионат СЗФО',
        place: '',
        tour: '',
        nameTeamHome: '',
        nameCityTeamHome: '',
        goalTeamHome: '',
        nameTeamAway: '',
        nameCityTeamAway: '',
        goalTeamAway: '',
        scorer: {
          0: ['', '', '']
        },
        result: '',
        date: today,
        body: '',
        icon: 'bookmark',
        color: 'primary'
      }
    }

    // Функция удаления игры
    const deleteGame = (id) => {
      deleteDoc(doc(gamesCollectionRef, id))
    }

    // Функция обновления игры
    const updateGame = (id, field, value) => {
      updateDoc(doc(gamesCollectionRef, id), {
        [field]: value
      })
    }

    // Функция открытия календаря
    const openDatePicker = () => {
      datePickerAddOpen.value = true
    }

    // Функция добавления гола
    const addGoal = () => {
      const nextIndex = Object.keys(newGame.value.scorer).length
      newGame.value.scorer[nextIndex] = ['', '', '']
    }

    // Функция добавления гола в редактируемый scorer
    const addGoalToEdit = (scorer) => {
      const nextIndex = Object.keys(scorer).length
      scorer[nextIndex] = ['', '', '']
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
      const scorer = newGame.value.scorer
      for (let i = 0; i < currentIndex; i++) {
        const prevTime = scorer[i] && scorer[i][2] ? parseInt(scorer[i][2]) : 0
        if (!isNaN(prevTime) && time < prevTime) {
          return `Время гола должно быть больше или равно предыдущему (${prevTime})`
        }
      }

      return true
    }

    // Функция валидации времени гола в редактируемом scorer
    const validateGoalTimeEdit = (value, index, scorer) => {
      if (!value || value.trim() === '') return true // пустое значение разрешено

      // Проверяем, что это число
      const time = parseInt(value)
      if (isNaN(time) || time < 0 || time > 120) {
        return 'Время должно быть числом от 0 до 120'
      }

      // Проверяем последовательность времени
      for (let i = 0; i < index; i++) {
        const prevTime = scorer[i] && scorer[i][2] ? parseInt(scorer[i][2]) : 0
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
      if (value.trim().toLowerCase() === newGame.value.scorer[index][0].trim().toLowerCase()) {
        return 'Ассистент не может быть автором того же гола'
      }

      return true
    }

    // Функция валидации ассистента в редактируемом scorer
    const validateAssistantEdit = (value, index, scorer) => {
      if (!value || value.trim() === '') return true // пустое значение разрешено

      // Проверяем, что ассистент не является автором
      if (value.trim().toLowerCase() === scorer[index][0].trim().toLowerCase()) {
        return 'Ассистент не может быть автором того же гола'
      }

      return true
    }

    // Загрузка данных при монтировании
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
      })
    })

    return {
      games,
      showGames,
      datePickerAddOpen,
      newGame,
      eventOptions,
      iconOptions,
      colorOptions,
      formatDate,
      formatScorer,
      addGame,
      deleteGame,
      updateGame,
      openDatePicker,
      addGoal,
      addGoalToEdit,
      validateGoalTime,
      validateGoalTimeEdit,
      validateAssistant,
      validateAssistantEdit
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
</style>
