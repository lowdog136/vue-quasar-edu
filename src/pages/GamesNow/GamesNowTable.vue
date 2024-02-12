<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Турнирная таблица, XXV турнир полпреда СЗФО, группа 'Б'"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :pagination="initialPagination"
      hide-bottom
      color="primary"
      card-class="bg-grey-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-deep-orange-10"
    >
    </q-table>
  </div>
</template>

<script>

const columns = [
  {
    name: 'desc',
    required: false,
    label: '',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: false
  },
  { name: 'games', align: 'center', label: 'И', field: 'games' },
  { name: 'win', label: 'В', field: 'win' },
  { name: 'draw', label: 'Н', field: 'draw' },
  { name: 'lose', label: 'П', field: 'lose' },
  { name: 'ball_io', label: 'Разница', field: 'ball_io' },
  { name: 'score', required: true, label: 'О', field: 'score', sortable: true, sort: (b, a) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'last_game', label: 'Форма', field: 'last_game', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    id: 4,
    name: 'Север',
    colorCode: 'primary',
    games: 1,
    win: 0,
    draw: 0,
    lose: 1,
    ball_io: '0-1',
    score: 0,
    last_game: 'П'
  },
  {
    id: 2,
    name: 'СШОР Зенит',
    games: 1,
    win: 0,
    draw: 0,
    lose: 1,
    ball_io: '1-3',
    score: 0,
    last_game: 'П'
  },
  {
    id: 3,
    name: 'МФК Чисто Питер',
    games: 1,
    win: 1,
    draw: 0,
    lose: 0,
    ball_io: '3-1',
    score: 3,
    last_game: 'В'
  },
  {
    id: 1,
    name: 'СШ Ленинградец',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0-0',
    score: 0,
    last_game: ''
  },
  {
    id: 2,
    name: 'Звезда',
    games: 1,
    win: 1,
    draw: 0,
    lose: 0,
    ball_io: '1-0',
    score: 3,
    last_game: 'В'
  }
]

export default {
  setup () {
    return {
      initialPagination: {
        sortBy: 'score',
        descending: false,
        page: 1,
        rowsPerPage: 7
        // rowsNumber: xx if getting data from a server
      },
      columns,
      rows
    }
  }
}
</script>
<style lang="sass">
.header-table
  /* height or max-height is important */
  height: 540px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #e5e5e5

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0
</style>
