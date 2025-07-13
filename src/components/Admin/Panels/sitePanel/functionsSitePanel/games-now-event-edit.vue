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
              @blur="saveFieldValue('place', newGame.place)"
            >
              <template v-slot:append>
                <q-icon name="history" class="cursor-pointer" @click="showSavedValues('place')" />
              </template>
            </q-input>

            <q-input
              v-model="newGame.tour"
              label="Тур/Этап"
              hint="Тур или этап розыгрыша"
              outlined
              dense
              @blur="saveFieldValue('tour', newGame.tour)"
            >
              <template v-slot:append>
                <q-icon name="history" class="cursor-pointer" @click="showSavedValues('tour')" />
              </template>
            </q-input>

            <q-input
              v-model="newGame.nameTeamHome"
              label="Домашняя команда"
              outlined
              dense
              bg-color="orange-1"
              @blur="saveFieldValue('nameTeamHome', newGame.nameTeamHome)"
            >
              <template v-slot:append>
                <q-icon name="history" class="cursor-pointer" @click="showSavedValues('nameTeamHome')" />
              </template>
            </q-input>

            <q-input
              v-model="newGame.nameCityTeamHome"
              label="Город домашней команды"
              outlined
              dense
              bg-color="orange-1"
              @blur="saveFieldValue('nameCityTeamHome', newGame.nameCityTeamHome)"
            >
              <template v-slot:append>
                <q-icon name="history" class="cursor-pointer" @click="showSavedValues('nameCityTeamHome')" />
              </template>
            </q-input>

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
              @blur="saveFieldValue('nameTeamAway', newGame.nameTeamAway)"
            >
              <template v-slot:append>
                <q-icon name="history" class="cursor-pointer" @click="showSavedValues('nameTeamAway')" />
              </template>
            </q-input>

            <q-input
              v-model="newGame.nameCityTeamAway"
              label="Город гостевой команды"
              outlined
              dense
              bg-color="red-1"
              @blur="saveFieldValue('nameCityTeamAway', newGame.nameCityTeamAway)"
            >
              <template v-slot:append>
                <q-icon name="history" class="cursor-pointer" @click="showSavedValues('nameCityTeamAway')" />
              </template>
            </q-input>

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
                      @blur="saveFieldValue('scorerAuthor', newGame.scorer[index][0])"
                    >
                      <template v-slot:append>
                        <q-icon name="history" class="cursor-pointer" @click="showSavedValues('scorerAuthor')" />
                      </template>
                    </q-input>
                    <q-input
                      v-model="newGame.scorer[index][1]"
                      hint="Ассистент (необязательно)"
                      dense
                      outlined
                      bg-color="orange-1"
                      class="q-mb-xs"
                      :rules="[val => validateAssistant(val, index)]"
                      @blur="saveFieldValue('scorerAssistant', newGame.scorer[index][1])"
                    >
                      <template v-slot:append>
                        <q-icon name="history" class="cursor-pointer" @click="showSavedValues('scorerAssistant')" />
                      </template>
                    </q-input>
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
              @blur="saveFieldValue('result', newGame.result)"
            >
              <template v-slot:append>
                <q-icon name="history" class="cursor-pointer" @click="showSavedValues('result')" />
              </template>
            </q-input>

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

    <!-- Диалог выбора сохраненных значений -->
    <q-dialog v-model="savedValuesDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Выберите значение для поля "{{ currentFieldLabel }}"</div>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item
              v-for="value in savedValues"
              :key="value"
              clickable
              v-ripple
              @click="selectSavedValue(value)"
            >
              <q-item-section>{{ value }}</q-item-section>
              <q-item-section side>
                <q-btn
                  flat
                  round
                  dense
                  icon="delete"
                  color="negative"
                  @click.stop="removeSavedValue(value)"
                />
              </q-item-section>
            </q-item>
            <q-item v-if="savedValues.length === 0">
              <q-item-section class="text-grey">Нет сохраненных значений</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Очистить все"
            color="negative"
            @click="clearAllSavedValues"
            v-if="savedValues.length > 0"
          />
          <q-btn flat label="Отмена" color="primary" @click="savedValuesDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

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

          <!-- Place -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Место: {{ game.place }}
                <q-popup-edit v-model="game.place" class="bg-accent text-white" v-slot="scope">
                  <div class="q-pa-md">
                    <div class="text-subtitle2 q-mb-sm text-white">Редактирование места:</div>
                    <q-input
                      dark
                      color="white"
                      v-model="scope.value"
                      dense
                      autofocus
                      @keyup.enter="scope.set"
                      @blur="saveFieldValue('place', scope.value)"
                    >
                      <template v-slot:append>
                        <q-icon name="history" class="cursor-pointer" @click="showSavedValues('place')" />
                      </template>
                    </q-input>
                    <div class="q-mt-md">
                      <q-btn @click="scope.set" color="positive" label="Сохранить" size="sm" />
                    </div>
                  </div>
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'place', game.place)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Tour -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Тур: {{ game.tour }}
                <q-popup-edit v-model="game.tour" class="bg-accent text-white" v-slot="scope">
                  <div class="q-pa-md">
                    <div class="text-subtitle2 q-mb-sm text-white">Редактирование тура:</div>
                    <q-input
                      dark
                      color="white"
                      v-model="scope.value"
                      dense
                      autofocus
                      @keyup.enter="scope.set"
                      @blur="saveFieldValue('tour', scope.value)"
                    >
                      <template v-slot:append>
                        <q-icon name="history" class="cursor-pointer" @click="showSavedValues('tour')" />
                      </template>
                    </q-input>
                    <div class="q-mt-md">
                      <q-btn @click="scope.set" color="positive" label="Сохранить" size="sm" />
                    </div>
                  </div>
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'tour', game.tour)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Home Team -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Домашняя команда: {{ game.nameTeamHome }}
                <q-popup-edit v-model="game.nameTeamHome" class="bg-accent text-white" v-slot="scope">
                  <div class="q-pa-md">
                    <div class="text-subtitle2 q-mb-sm text-white">Редактирование домашней команды:</div>
                    <q-input
                      dark
                      color="white"
                      v-model="scope.value"
                      dense
                      autofocus
                      @keyup.enter="scope.set"
                      @blur="saveFieldValue('nameTeamHome', scope.value)"
                    >
                      <template v-slot:append>
                        <q-icon name="history" class="cursor-pointer" @click="showSavedValues('nameTeamHome')" />
                      </template>
                    </q-input>
                    <div class="q-mt-md">
                      <q-btn @click="scope.set" color="positive" label="Сохранить" size="sm" />
                    </div>
                  </div>
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'nameTeamHome', game.nameTeamHome)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Home Team City -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Город домашней команды: {{ game.nameCityTeamHome }}
                <q-popup-edit v-model="game.nameCityTeamHome" class="bg-accent text-white" v-slot="scope">
                  <div class="q-pa-md">
                    <div class="text-subtitle2 q-mb-sm text-white">Редактирование города домашней команды:</div>
                    <q-input
                      dark
                      color="white"
                      v-model="scope.value"
                      dense
                      autofocus
                      @keyup.enter="scope.set"
                      @blur="saveFieldValue('nameCityTeamHome', scope.value)"
                    >
                      <template v-slot:append>
                        <q-icon name="history" class="cursor-pointer" @click="showSavedValues('nameCityTeamHome')" />
                      </template>
                    </q-input>
                    <div class="q-mt-md">
                      <q-btn @click="scope.set" color="positive" label="Сохранить" size="sm" />
                    </div>
                  </div>
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'nameCityTeamHome', game.nameCityTeamHome)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Away Team -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Гостевая команда: {{ game.nameTeamAway }}
                <q-popup-edit v-model="game.nameTeamAway" class="bg-accent text-white" v-slot="scope">
                  <div class="q-pa-md">
                    <div class="text-subtitle2 q-mb-sm text-white">Редактирование гостевой команды:</div>
                    <q-input
                      dark
                      color="white"
                      v-model="scope.value"
                      dense
                      autofocus
                      @keyup.enter="scope.set"
                      @blur="saveFieldValue('nameTeamAway', scope.value)"
                    >
                      <template v-slot:append>
                        <q-icon name="history" class="cursor-pointer" @click="showSavedValues('nameTeamAway')" />
                      </template>
                    </q-input>
                    <div class="q-mt-md">
                      <q-btn @click="scope.set" color="positive" label="Сохранить" size="sm" />
                    </div>
                  </div>
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'nameTeamAway', game.nameTeamAway)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Away Team City -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Город гостевой команды: {{ game.nameCityTeamAway }}
                <q-popup-edit v-model="game.nameCityTeamAway" class="bg-accent text-white" v-slot="scope">
                  <div class="q-pa-md">
                    <div class="text-subtitle2 q-mb-sm text-white">Редактирование города гостевой команды:</div>
                    <q-input
                      dark
                      color="white"
                      v-model="scope.value"
                      dense
                      autofocus
                      @keyup.enter="scope.set"
                      @blur="saveFieldValue('nameCityTeamAway', scope.value)"
                    >
                      <template v-slot:append>
                        <q-icon name="history" class="cursor-pointer" @click="showSavedValues('nameCityTeamAway')" />
                      </template>
                    </q-input>
                    <div class="q-mt-md">
                      <q-btn @click="scope.set" color="positive" label="Сохранить" size="sm" />
                    </div>
                  </div>
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'nameCityTeamAway', game.nameCityTeamAway)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Home Goals -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Голы домашней команды: {{ game.goalTeamHome }}
                <q-popup-edit v-model="game.goalTeamHome" class="bg-accent text-white" v-slot="scope">
                  <q-input
                    dark
                    color="white"
                    v-model="scope.value"
                    dense
                    autofocus
                    type="number"
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'goalTeamHome', game.goalTeamHome)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Away Goals -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Голы гостевой команды: {{ game.goalTeamAway }}
                <q-popup-edit v-model="game.goalTeamAway" class="bg-accent text-white" v-slot="scope">
                  <q-input
                    dark
                    color="white"
                    v-model="scope.value"
                    dense
                    autofocus
                    type="number"
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'goalTeamAway', game.goalTeamAway)" flat size="xs" icon="done"/>
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
                  <div class="q-pa-md">
                    <div class="text-subtitle2 q-mb-sm text-white">Редактирование результата:</div>
                    <q-input
                      dark
                      color="white"
                      v-model="scope.value"
                      dense
                      autofocus
                      @keyup.enter="scope.set"
                      @blur="saveFieldValue('result', scope.value)"
                    >
                      <template v-slot:append>
                        <q-icon name="history" class="cursor-pointer" @click="showSavedValues('result')" />
                      </template>
                    </q-input>
                    <div class="q-mt-md">
                      <q-btn @click="scope.set" color="positive" label="Сохранить" size="sm" />
                    </div>
                  </div>
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'result', game.result)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Icon -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Иконка: {{ game.icon }}
                <q-popup-edit v-model="game.icon" class="bg-accent text-white" v-slot="scope">
                  <q-select
                    dark
                    color="white"
                    v-model="scope.value"
                    :options="iconOptions"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'icon', game.icon)" flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>

          <!-- Color -->
          <q-item>
            <q-item-section>
              <q-item-label>
                Цвет: {{ game.color }}
                <q-popup-edit v-model="game.color" class="bg-accent text-white" v-slot="scope">
                  <q-select
                    dark
                    color="white"
                    v-model="scope.value"
                    :options="colorOptions"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateGame(game.id, 'color', game.color)" flat size="xs" icon="done"/>
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
                            @blur="saveFieldValue('scorerAuthor', scope.value[index][0])"
                          >
                            <template v-slot:append>
                              <q-icon name="history" class="cursor-pointer" @click="showSavedValues('scorerAuthor')" />
                            </template>
                          </q-input>
                          <q-input
                            v-model="scope.value[index][1]"
                            hint="Ассистент (необязательно)"
                            dense
                            dark
                            :rules="[val => validateAssistantEdit(val, index, scope.value)]"
                            @blur="saveFieldValue('scorerAssistant', scope.value[index][1])"
                          >
                            <template v-slot:append>
                              <q-icon name="history" class="cursor-pointer" @click="showSavedValues('scorerAssistant')" />
                            </template>
                          </q-input>
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
                Описание: {{ game.body ? (game.body.length > 50 ? game.body.substring(0, 50) + '...' : game.body) : 'Не указано' }}
                <q-popup-edit v-model="game.body" class="bg-accent text-white" v-slot="scope">
                  <div class="q-pa-md">
                    <div class="text-subtitle2 q-mb-sm text-white">Редактирование описания:</div>
                    <q-input
                      dark
                      color="white"
                      v-model="scope.value"
                      dense
                      autofocus
                      type="textarea"
                      rows="4"
                      class="q-mb-md"
                    />
                    <div class="row q-gutter-sm">
                      <q-btn @click="scope.set" color="positive" label="Сохранить" size="sm" />
                      <q-btn @click="scope.cancel" color="grey" label="Отмена" size="sm" />
                    </div>
                  </div>
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
            @click="editAllFields(game)"
            color="primary"
            icon="edit"
            label="Редактировать все поля"
            flat
            class="q-mr-sm"
          />
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

    <!-- Диалог редактирования всех полей -->
    <q-dialog v-model="editAllDialog" persistent>
      <q-card style="min-width: 600px; max-width: 800px">
        <q-card-section>
          <div class="text-h6">Редактирование всех полей игры</div>
          <div class="text-subtitle2">{{ editingGame?.nameTeamHome }} - {{ editingGame?.nameTeamAway }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row q-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="editingGame.year"
                label="Год"
                outlined
                dense
                class="q-mb-md"
              />
              <q-select
                v-model="editingGame.event"
                :options="eventOptions"
                label="Турнир"
                outlined
                dense
                class="q-mb-md"
              />
              <q-input
                v-model="editingGame.title"
                label="Название"
                outlined
                dense
                class="q-mb-md"
              />
              <q-input
                v-model="editingGame.place"
                label="Место проведения"
                outlined
                dense
                class="q-mb-md"
                @blur="saveFieldValue('place', editingGame.place)"
              >
                <template v-slot:append>
                  <q-icon name="history" class="cursor-pointer" @click="showSavedValues('place')" />
                </template>
              </q-input>
              <q-input
                v-model="editingGame.tour"
                label="Тур"
                outlined
                dense
                class="q-mb-md"
                @blur="saveFieldValue('tour', editingGame.tour)"
              >
                <template v-slot:append>
                  <q-icon name="history" class="cursor-pointer" @click="showSavedValues('tour')" />
                </template>
              </q-input>
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="editingGame.nameTeamHome"
                label="Домашняя команда"
                outlined
                dense
                class="q-mb-md"
                @blur="saveFieldValue('nameTeamHome', editingGame.nameTeamHome)"
              >
                <template v-slot:append>
                  <q-icon name="history" class="cursor-pointer" @click="showSavedValues('nameTeamHome')" />
                </template>
              </q-input>
              <q-input
                v-model="editingGame.nameCityTeamHome"
                label="Город домашней команды"
                outlined
                dense
                class="q-mb-md"
                @blur="saveFieldValue('nameCityTeamHome', editingGame.nameCityTeamHome)"
              >
                <template v-slot:append>
                  <q-icon name="history" class="cursor-pointer" @click="showSavedValues('nameCityTeamHome')" />
                </template>
              </q-input>
              <q-input
                v-model="editingGame.nameTeamAway"
                label="Гостевая команда"
                outlined
                dense
                class="q-mb-md"
                @blur="saveFieldValue('nameTeamAway', editingGame.nameTeamAway)"
              >
                <template v-slot:append>
                  <q-icon name="history" class="cursor-pointer" @click="showSavedValues('nameTeamAway')" />
                </template>
              </q-input>
              <q-input
                v-model="editingGame.nameCityTeamAway"
                label="Город гостевой команды"
                outlined
                dense
                class="q-mb-md"
                @blur="saveFieldValue('nameCityTeamAway', editingGame.nameCityTeamAway)"
              >
                <template v-slot:append>
                  <q-icon name="history" class="cursor-pointer" @click="showSavedValues('nameCityTeamAway')" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-gutter-md">
            <div class="col-12 col-md-4">
              <q-input
                v-model.number="editingGame.goalTeamHome"
                label="Голы домашней команды"
                type="number"
                outlined
                dense
                class="q-mb-md"
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                v-model.number="editingGame.goalTeamAway"
                label="Голы гостевой команды"
                type="number"
                outlined
                dense
                class="q-mb-md"
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                v-model="editingGame.score"
                label="Счет"
                outlined
                dense
                class="q-mb-md"
              />
            </div>
          </div>

          <div class="row q-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="editingGame.date"
                label="Дата"
                outlined
                dense
                class="q-mb-md"
              />
              <q-input
                v-model="editingGame.result"
                label="Результат"
                outlined
                dense
                class="q-mb-md"
                @blur="saveFieldValue('result', editingGame.result)"
              >
                <template v-slot:append>
                  <q-icon name="history" class="cursor-pointer" @click="showSavedValues('result')" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-select
                v-model="editingGame.icon"
                :options="iconOptions"
                label="Иконка"
                outlined
                dense
                class="q-mb-md"
              />
              <q-select
                v-model="editingGame.color"
                :options="colorOptions"
                label="Цвет"
                outlined
                dense
                class="q-mb-md"
              />
            </div>
          </div>

          <q-input
            v-model="editingGame.body"
            label="Описание"
            type="textarea"
            rows="3"
            outlined
            dense
            class="q-mb-md"
          />

          <!-- Секция редактирования scorer -->
          <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">Забившие голы (scorer):</div>
            <div class="row q-gutter-md">
              <div class="col-12">
                <div class="text-caption q-mb-xs">Команда 1:</div>
                <div v-for="(goalArray, index) in Object.keys(editingGame.scorer || {})" :key="`edit-all-goal-${index}`" class="q-mb-sm">
                  <div class="text-caption">Гол {{ parseInt(index) + 1 }}:</div>
                  <q-input
                    v-model="editingGame.scorer[index][0]"
                    hint="Автор гола"
                    dense
                    outlined
                    bg-color="orange-1"
                    class="q-mb-xs"
                    @blur="saveFieldValue('scorerAuthor', editingGame.scorer[index][0])"
                  >
                    <template v-slot:append>
                      <q-icon name="history" class="cursor-pointer" @click="showSavedValues('scorerAuthor')" />
                    </template>
                  </q-input>
                  <q-input
                    v-model="editingGame.scorer[index][1]"
                    hint="Ассистент (необязательно)"
                    dense
                    outlined
                    bg-color="orange-1"
                    class="q-mb-xs"
                    :rules="[val => validateAssistantEdit(val, index, editingGame.scorer)]"
                    @blur="saveFieldValue('scorerAssistant', editingGame.scorer[index][1])"
                  >
                    <template v-slot:append>
                      <q-icon name="history" class="cursor-pointer" @click="showSavedValues('scorerAssistant')" />
                    </template>
                  </q-input>
                  <q-input
                    v-model="editingGame.scorer[index][2]"
                    hint="Время гола (например: 15, 45)"
                    dense
                    outlined
                    bg-color="orange-1"
                    :rules="[val => validateGoalTimeEdit(val, index, editingGame.scorer)]"
                  />
                </div>
                <q-btn
                  @click="addGoalToEdit(editingGame.scorer)"
                  color="orange"
                  icon="add"
                  label="Добавить гол"
                  size="sm"
                  class="q-mt-xs"
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="primary" @click="cancelEditAll" />
          <q-btn flat label="Сохранить" color="positive" @click="saveEditAll" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
    const editAllDialog = ref(false)
    const editingGame = ref(null)

    // Состояние для сохраненных значений
    const savedValuesDialog = ref(false)
    const savedValues = ref([])
    const currentField = ref('')
    const currentFieldLabel = ref('')

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
      'Третья лига, финальный этап',
      'Второй дивизион, зона "Запад"'
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

    // Функции для работы с сохраненными значениями
    const getFieldLabel = (field) => {
      const labels = {
        place: 'Место проведения',
        tour: 'Тур/Этап',
        nameTeamHome: 'Домашняя команда',
        nameCityTeamHome: 'Город домашней команды',
        nameTeamAway: 'Гостевая команда',
        nameCityTeamAway: 'Город гостевой команды',
        scorerAuthor: 'Автор гола',
        scorerAssistant: 'Ассистент',
        result: 'Результат'
      }
      return labels[field] || field
    }

    const saveFieldValue = (field, value) => {
      if (!value || value.trim() === '') return

      const storageKey = `savedValues_${field}`
      let savedValuesArray = JSON.parse(localStorage.getItem(storageKey) || '[]')

      // Добавляем значение, если его еще нет
      if (!savedValuesArray.includes(value.trim())) {
        savedValuesArray.push(value.trim())
        // Ограничиваем количество сохраненных значений до 20
        if (savedValuesArray.length > 20) {
          savedValuesArray = savedValuesArray.slice(-20)
        }
        localStorage.setItem(storageKey, JSON.stringify(savedValuesArray))
      }
    }

    const showSavedValues = (field) => {
      currentField.value = field
      currentFieldLabel.value = getFieldLabel(field)
      const storageKey = `savedValues_${field}`
      savedValues.value = JSON.parse(localStorage.getItem(storageKey) || '[]')
      savedValuesDialog.value = true
    }

    const selectSavedValue = (value) => {
      // Определяем, в какое поле нужно вставить значение
      let activeGoalIndex, activeGoalIndex2

      switch (currentField.value) {
        case 'place':
          if (editAllDialog.value && editingGame.value) {
            editingGame.value.place = value
          } else {
            newGame.value.place = value
          }
          break
        case 'tour':
          if (editAllDialog.value && editingGame.value) {
            editingGame.value.tour = value
          } else {
            newGame.value.tour = value
          }
          break
        case 'nameTeamHome':
          if (editAllDialog.value && editingGame.value) {
            editingGame.value.nameTeamHome = value
          } else {
            newGame.value.nameTeamHome = value
          }
          break
        case 'nameCityTeamHome':
          if (editAllDialog.value && editingGame.value) {
            editingGame.value.nameCityTeamHome = value
          } else {
            newGame.value.nameCityTeamHome = value
          }
          break
        case 'nameTeamAway':
          if (editAllDialog.value && editingGame.value) {
            editingGame.value.nameTeamAway = value
          } else {
            newGame.value.nameTeamAway = value
          }
          break
        case 'nameCityTeamAway':
          if (editAllDialog.value && editingGame.value) {
            editingGame.value.nameCityTeamAway = value
          } else {
            newGame.value.nameCityTeamAway = value
          }
          break
        case 'result':
          if (editAllDialog.value && editingGame.value) {
            editingGame.value.result = value
          } else {
            newGame.value.result = value
          }
          break
        case 'scorerAuthor':
          // Находим активный гол и устанавливаем автора
          if (editAllDialog.value && editingGame.value) {
            activeGoalIndex = Object.keys(editingGame.value.scorer).find(key =>
              editingGame.value.scorer[key][0] === '' || editingGame.value.scorer[key][0] === undefined
            )
            if (activeGoalIndex !== undefined) {
              editingGame.value.scorer[activeGoalIndex][0] = value
            }
          } else {
            activeGoalIndex = Object.keys(newGame.value.scorer).find(key =>
              newGame.value.scorer[key][0] === '' || newGame.value.scorer[key][0] === undefined
            )
            if (activeGoalIndex !== undefined) {
              newGame.value.scorer[activeGoalIndex][0] = value
            }
          }
          break
        case 'scorerAssistant':
          // Находим активный гол и устанавливаем ассистента
          if (editAllDialog.value && editingGame.value) {
            activeGoalIndex2 = Object.keys(editingGame.value.scorer).find(key =>
              editingGame.value.scorer[key][1] === '' || editingGame.value.scorer[key][1] === undefined
            )
            if (activeGoalIndex2 !== undefined) {
              editingGame.value.scorer[activeGoalIndex2][1] = value
            }
          } else {
            activeGoalIndex2 = Object.keys(newGame.value.scorer).find(key =>
              newGame.value.scorer[key][1] === '' || newGame.value.scorer[key][1] === undefined
            )
            if (activeGoalIndex2 !== undefined) {
              newGame.value.scorer[activeGoalIndex2][1] = value
            }
          }
          break
      }
      savedValuesDialog.value = false
    }

    const removeSavedValue = (value) => {
      const storageKey = `savedValues_${currentField.value}`
      let savedValuesArray = JSON.parse(localStorage.getItem(storageKey) || '[]')
      savedValuesArray = savedValuesArray.filter(v => v !== value)
      localStorage.setItem(storageKey, JSON.stringify(savedValuesArray))
      savedValues.value = savedValuesArray
    }

    const clearAllSavedValues = () => {
      const storageKey = `savedValues_${currentField.value}`
      localStorage.removeItem(storageKey)
      savedValues.value = []
    }

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
      const updateData = { [field]: value }

      // Автоматически обновляем счет при изменении голов команд
      if (field === 'goalTeamHome' || field === 'goalTeamAway') {
        const game = games.value.find(g => g.id === id)
        if (game) {
          const homeGoals = field === 'goalTeamHome' ? value : game.goalTeamHome
          const awayGoals = field === 'goalTeamAway' ? value : game.goalTeamAway
          updateData.score = `${homeGoals}-${awayGoals}`
        }
      }

      updateDoc(doc(gamesCollectionRef, id), updateData)
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

    // Функция открытия диалога редактирования всех полей
    const editAllFields = (game) => {
      // Создаем глубокую копию игры
      const gameCopy = { ...game }

      // Убеждаемся, что scorer существует и имеет правильную структуру
      if (!gameCopy.scorer || typeof gameCopy.scorer !== 'object') {
        gameCopy.scorer = {
          0: ['', '', '']
        }
      } else {
        // Создаем глубокую копию scorer
        const scorerCopy = {}
        Object.keys(gameCopy.scorer).forEach(key => {
          if (Array.isArray(gameCopy.scorer[key])) {
            scorerCopy[key] = [...gameCopy.scorer[key]]
          } else {
            scorerCopy[key] = ['', '', '']
          }
        })
        gameCopy.scorer = scorerCopy
      }

      editingGame.value = gameCopy
      editAllDialog.value = true
    }

    // Функция отмены редактирования всех полей
    const cancelEditAll = () => {
      editingGame.value = null
      editAllDialog.value = false
    }

    // Функция сохранения изменений в редактируемой игре
    const saveEditAll = async () => {
      if (editingGame.value) {
        try {
          // Очищаем undefined значения и подготавливаем данные для сохранения
          const updateData = {}

          // Список полей для обновления
          const fields = [
            'year', 'event', 'title', 'place', 'tour',
            'nameTeamHome', 'nameCityTeamHome', 'nameTeamAway', 'nameCityTeamAway',
            'goalTeamHome', 'goalTeamAway', 'date', 'result', 'icon', 'color', 'body', 'score'
          ]

          // Добавляем только определенные поля
          fields.forEach(field => {
            if (editingGame.value[field] !== undefined) {
              updateData[field] = editingGame.value[field]
            }
          })

          // Добавляем scorer если он есть
          if (editingGame.value.scorer) {
            updateData.scorer = editingGame.value.scorer
          }

          // Обновляем документ одним запросом
          await updateDoc(doc(gamesCollectionRef, editingGame.value.id), updateData)

          // Закрываем диалог
          editingGame.value = null
          editAllDialog.value = false
        } catch (error) {
          console.error('Error updating game:', error)
          alert('Ошибка при обновлении игры: ' + error.message)
        }
      }
    }

    return {
      games,
      showGames,
      datePickerAddOpen,
      editAllDialog,
      editingGame,
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
      validateAssistantEdit,
      editAllFields,
      cancelEditAll,
      saveEditAll,
      savedValuesDialog,
      savedValues,
      currentField,
      currentFieldLabel,
      saveFieldValue,
      showSavedValues,
      selectSavedValue,
      removeSavedValue,
      clearAllSavedValues
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
</style>
