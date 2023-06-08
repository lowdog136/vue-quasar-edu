<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Турнирная таблица, Чемпионат СЗФО 2023"
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
  { name: 'score', required: true, label: 'О', field: 'score', sortable: true, sort: (b, a) => parseInt(a, 10) - parseInt(b, 20) },
  { name: 'last_game', label: 'Форма', field: 'last_game', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    id: 4,
    name: 'Север',
    colorCode: 'primary',
    games: 2,
    win: 2,
    draw: 0,
    lose: 0,
    ball_io: '6-2',
    score: 6,
    last_game: 'ВВ'
  },
  {
    id: 2,
    name: 'Псков',
    games: 2,
    win: 1,
    draw: 1,
    lose: 0,
    ball_io: '2-1',
    score: 4,
    last_game: 'ВН'
  },
  {
    id: 3,
    name: 'Химик',
    games: 1,
    win: 0,
    draw: 1,
    lose: 0,
    ball_io: '2-2',
    score: 1,
    last_game: 'Н'
  },
  {
    id: 1,
    name: 'СШ Ленинградец',
    games: 2,
    win: 2,
    draw: 0,
    lose: 0,
    ball_io: '9-1',
    score: 6,
    last_game: 'ВВ'
  },
  {
    id: 5,
    name: 'Звезда',
    games: 2,
    win: 0,
    draw: 1,
    lose: 1,
    ball_io: '3-4',
    score: 1,
    last_game: 'ПН'
  },
  {
    id: 6,
    name: 'Карелия',
    games: 2,
    win: 0,
    draw: 0,
    lose: 2,
    ball_io: '1-5',
    score: 0,
    last_game: 'ПП'
  },
  {
    id: 7,
    name: 'Тосно',
    games: 3,
    win: 0,
    draw: 1,
    lose: 2,
    ball_io: '2-10',
    score: 1,
    last_game: 'ПП'
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
