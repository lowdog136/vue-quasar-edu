<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Турнирная таблица, XXIX чемпионат СЗФО"
      :rows="rows"
      :columns="columns"
      :pagination="initialPagination"
      hide-bottom
      row-key="name"
      card-class="bg-grey-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-deep-orange-10"
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
    sortable: true
  },
  {
    name: 'games',
    align: 'center',
    label: 'И',
    field: 'games'
  },
  {
    name: 'win',
    label: 'В',
    field: 'win'
  },
  {
    name: 'draw',
    label: 'Н',
    field: 'draw'
  },
  {
    name: 'lose',
    label: 'П',
    field: 'lose'
  },
  {
    name: 'ball_io',
    label: 'Разница',
    field: 'ball_io'
  },
  { name: 'score', label: 'O', field: 'score', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'last_game', label: 'Форма', field: 'last_game', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    id: 8,
    name: 'Север',
    color: 'primary',
    games: 3,
    win: 2,
    draw: 0,
    lose: 1,
    ball_io: '8-2',
    score: 6,
    last_game: 'ВПВ'
  },
  {
    id: 5,
    name: 'ГОУР-Карелия',
    games: 2,
    win: 1,
    draw: 0,
    lose: 1,
    ball_io: '4-3',
    score: 3,
    last_game: 'ПВ'
  },
  {
    id: 2,
    name: 'Тосно',
    games: 1,
    win: 1,
    draw: 0,
    lose: 0,
    ball_io: '2-1',
    score: 3,
    last_game: 'В'
  },
  {
    id: 9,
    name: 'Псков',
    games: 1,
    win: 1,
    draw: 0,
    lose: 0,
    ball_io: '1-0',
    score: 3,
    last_game: 'В'
  },
  {
    id: 4,
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
    id: 7,
    name: 'Новград',
    games: 1,
    win: 0,
    draw: 0,
    lose: 1,
    ball_io: '0-1',
    score: 0,
    last_game: 'П'
  },
  {
    id: 6,
    name: 'Химик',
    games: 2,
    win: 0,
    draw: 0,
    lose: 2,
    ball_io: '1-9',
    score: 0,
    last_game: 'ПП'
  }
]

export default {
  name: 'gameTable',
  setup () {
    return {
      initialPagination: {
        sortBy: '',
        descending: true,
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
