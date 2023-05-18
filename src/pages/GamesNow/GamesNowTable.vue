<template>
  <div class="q-pa-md">
    <q-table
      title="Турнирная таблица, Чемпионат СЗФО 2023"
      :rows="rows"
      :columns="columns"
      row-key="name"
      class="header-table"
      color="primary"
      :pagination="initialPagination"
    />
  </div>
</template>

<script>

const columns = [
  {
    name: 'desc',
    required: true,
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
  { name: 'score', label: 'О', field: 'score', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'last_game', label: 'Форма', field: 'last_game', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    id: 1,
    name: 'Север',
    colorCode: 'primary',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0',
    score: 0,
    last_game: '-'
  },
  {
    id: 2,
    name: 'Псков',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0',
    score: 0,
    last_game: '-'
  },
  {
    id: 3,
    name: 'Химик',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0',
    score: 0,
    last_game: '-'
  },
  {
    id: 4,
    name: 'СШ Ленинградец',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0',
    score: 0,
    last_game: '-'
  },
  {
    id: 5,
    name: 'Звезда',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0',
    score: 0,
    last_game: '-'
  },
  {
    id: 6,
    name: 'Карелия',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0',
    score: 0,
    last_game: '-'
  },
  {
    id: 7,
    name: 'Тосно',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0',
    score: 0,
    last_game: '-'
  }
]

export default {
  setup () {
    return {
      initialPagination: {
        sortBy: 'name',
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
