<template>
  <div class="event-table-editor">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Редактирование таблицы событий</div>
        <div class="text-subtitle2">Изменение данных команд в коллекции event-table</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-gutter-md q-mb-md">
          <q-btn
            color="primary"
            icon="add"
            label="Добавить команду"
            @click="showAddDialog = true"
          />
          <q-btn
            color="secondary"
            icon="refresh"
            label="Обновить данные"
            @click="loadData"
            :loading="loading"
          />
        </div>

        <!-- Таблица для редактирования -->
        <q-table
          :rows="tableData"
          :columns="columns"
          row-key="id"
          :loading="loading"
          :pagination="{ rowsPerPage: 0 }"
        >
          <template v-slot:body="props">
            <q-tr :props="props" :class="getRowClass(props.row)">
              <q-td key="name" :props="props">
                <div class="row items-center">
                  <q-icon :name="props.row.icon" size="20px" class="q-mr-sm" />
                  <q-input
                    v-model="props.row.name"
                    dense
                    @blur="updateTeam(props.row)"
                    :class="props.row.name === 'Север' ? 'text-white' : ''"
                  />
                </div>
              </q-td>
              <q-td key="icon" :props="props">
                <q-input
                  v-model="props.row.icon"
                  dense
                  @blur="updateTeam(props.row)"
                  placeholder="Иконка"
                />
              </q-td>
              <q-td key="games" :props="props">
                <q-input
                  v-model.number="props.row.games"
                  type="number"
                  dense
                  @blur="updateTeam(props.row)"
                />
              </q-td>
              <q-td key="win" :props="props">
                <q-input
                  v-model.number="props.row.win"
                  type="number"
                  dense
                  @blur="updateTeam(props.row)"
                />
              </q-td>
              <q-td key="draw" :props="props">
                <q-input
                  v-model.number="props.row.draw"
                  type="number"
                  dense
                  @blur="updateTeam(props.row)"
                />
              </q-td>
              <q-td key="lose" :props="props">
                <q-input
                  v-model.number="props.row.lose"
                  type="number"
                  dense
                  @blur="updateTeam(props.row)"
                />
              </q-td>
              <q-td key="ball_in" :props="props">
                <q-input
                  v-model.number="props.row.ball_in"
                  type="number"
                  dense
                  @blur="updateTeam(props.row)"
                />
              </q-td>
              <q-td key="ball_out" :props="props">
                <q-input
                  v-model.number="props.row.ball_out"
                  type="number"
                  dense
                  @blur="updateTeam(props.row)"
                />
              </q-td>
              <q-td key="score" :props="props">
                <q-input
                  v-model.number="props.row.score"
                  type="number"
                  dense
                  @blur="updateTeam(props.row)"
                />
              </q-td>
              <q-td key="last_game" :props="props">
                <q-input
                  v-model="props.row.last_game"
                  dense
                  @blur="updateTeam(props.row)"
                />
              </q-td>
              <q-td key="actions" :props="props">
                <q-btn
                  color="negative"
                  icon="delete"
                  size="sm"
                  @click="deleteTeam(props.row)"
                  flat
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Диалог добавления команды -->
    <q-dialog v-model="showAddDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Добавить команду</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newTeam.name" label="Название команды" class="q-mb-md" />
          <q-input v-model="newTeam.icon" label="Иконка (Material Icon)" class="q-mb-md" />
          <q-input v-model.number="newTeam.games" type="number" label="Игры" class="q-mb-md" />
          <q-input v-model.number="newTeam.win" type="number" label="Победы" class="q-mb-md" />
          <q-input v-model.number="newTeam.draw" type="number" label="Ничьи" class="q-mb-md" />
          <q-input v-model.number="newTeam.lose" type="number" label="Поражения" class="q-mb-md" />
          <q-input v-model.number="newTeam.ball_in" type="number" label="Забитые голы" class="q-mb-md" />
          <q-input v-model.number="newTeam.ball_out" type="number" label="Пропущенные голы" class="q-mb-md" />
          <q-input v-model.number="newTeam.score" type="number" label="Очки" class="q-mb-md" />
          <q-input v-model="newTeam.last_game" label="Последние игры" class="q-mb-md" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="primary" v-close-popup />
          <q-btn flat label="Добавить" color="primary" @click="addTeam" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Диалог подтверждения удаления -->
    <q-dialog v-model="showDeleteDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Подтверждение удаления</div>
        </q-card-section>

        <q-card-section>
          <p>Вы действительно хотите удалить команду <strong>{{ teamToDelete?.name }}</strong>?</p>
          <p class="text-caption text-grey">Это действие нельзя отменить.</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="primary" v-close-popup />
          <q-btn flat label="Удалить" color="negative" @click="confirmDelete" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc, orderBy, query } from 'firebase/firestore'
import { db } from 'src/firebase'

export default {
  name: 'EventTableEditor',
  setup () {
    const loading = ref(false)
    const tableData = ref([])
    const showAddDialog = ref(false)
    const showDeleteDialog = ref(false)
    const teamToDelete = ref(null)
    const newTeam = ref({
      name: '',
      icon: 'sports_soccer',
      games: 0,
      win: 0,
      draw: 0,
      lose: 0,
      ball_in: 0,
      ball_out: 0,
      score: 0,
      last_game: ''
    })

    const columns = [
      { name: 'name', label: 'Команда', field: 'name', align: 'left' },
      { name: 'icon', label: 'Иконка', field: 'icon', align: 'center' },
      { name: 'games', label: 'И', field: 'games', align: 'center' },
      { name: 'win', label: 'В', field: 'win', align: 'center' },
      { name: 'draw', label: 'Н', field: 'draw', align: 'center' },
      { name: 'lose', label: 'П', field: 'lose', align: 'center' },
      { name: 'ball_in', label: 'З', field: 'ball_in', align: 'center' },
      { name: 'ball_out', label: 'П', field: 'ball_out', align: 'center' },
      { name: 'score', label: 'О', field: 'score', align: 'center' },
      { name: 'last_game', label: 'Ф', field: 'last_game', align: 'center' },
      { name: 'actions', label: 'Действия', field: 'actions', align: 'center' }
    ]

    const loadData = async () => {
      loading.value = true
      try {
        const eventTableCollectionRef = collection(db, 'event-table')
        const eventTableQuery = query(eventTableCollectionRef, orderBy('id', 'asc'))
        const querySnapshot = await getDocs(eventTableQuery)
        const data = []
        querySnapshot.forEach((docSnapshot) => {
          const teamData = docSnapshot.data()
          teamData.docId = docSnapshot.id
          teamData.ball_in = teamData.ball_in || 0
          teamData.ball_out = teamData.ball_out || 0
          teamData.icon = teamData.icon || 'sports_soccer'
          data.push(teamData)
        })
        tableData.value = data.sort((a, b) => {
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
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
      } finally {
        loading.value = false
      }
    }

    const updateTeam = async (team) => {
      try {
        const teamRef = doc(db, 'event-table', team.docId)
        await updateDoc(teamRef, {
          name: team.name,
          games: team.games,
          win: team.win,
          draw: team.draw,
          lose: team.lose,
          ball_in: team.ball_in,
          ball_out: team.ball_out,
          score: team.score,
          last_game: team.last_game,
          icon: team.icon
        })
        console.log('Команда обновлена:', team.name)
      } catch (error) {
        console.error('Ошибка при обновлении команды:', error)
      }
    }

    const deleteTeam = async (team) => {
      teamToDelete.value = team
      showDeleteDialog.value = true
    }

    const confirmDelete = async () => {
      try {
        await deleteDoc(doc(db, 'event-table', teamToDelete.value.docId))
        await loadData()
        console.log('Команда удалена:', teamToDelete.value.name)
      } catch (error) {
        console.error('Ошибка при удалении команды:', error)
      }
    }

    const addTeam = async () => {
      try {
        const eventTableCollectionRef = collection(db, 'event-table')
        const newId = Math.max(...tableData.value.map(t => t.id), 0) + 1

        await addDoc(eventTableCollectionRef, {
          id: newId,
          ...newTeam.value,
          text_a: 'text-left',
          text_c: 'primary',
          color: 'primary'
        })

        // Сброс формы
        newTeam.value = {
          name: '',
          icon: 'sports_soccer',
          games: 0,
          win: 0,
          draw: 0,
          lose: 0,
          ball_in: 0,
          ball_out: 0,
          score: 0,
          last_game: ''
        }

        await loadData()
        console.log('Команда добавлена')
      } catch (error) {
        console.error('Ошибка при добавлении команды:', error)
      }
    }

    const getRowClass = (row) => {
      if (row.name === 'Север') {
        return 'bg-ae0000'
      }
      return ''
    }

    onMounted(() => {
      loadData()
    })

    return {
      loading,
      tableData,
      columns,
      showAddDialog,
      showDeleteDialog,
      teamToDelete,
      newTeam,
      loadData,
      updateTeam,
      deleteTeam,
      confirmDelete,
      addTeam,
      getRowClass
    }
  }
}
</script>

<style lang="sass" scoped>
.event-table-editor
  .my-card
    max-width: 1200px
    margin: 0 auto

.bg-ae0000
  background-color: #ae0000 !important
  color: white !important

  .q-input
    color: white !important

    input
      color: white !important
</style>
