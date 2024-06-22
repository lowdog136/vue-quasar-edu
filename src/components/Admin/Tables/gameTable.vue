<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      hide-bottom
      :title=tableTitle
      :rows="rows"
      :columns="columns"
      :pagination="initialPagination"
      row-key="id"
      :card-class=tableCSS.cardClass
      :table-class=tableCSS.tableClass
      :table-header-class=tableCSS.tableHeaderClass
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
    games: 5,
    win: 4,
    draw: 0,
    lose: 1,
    ball_io: '19-3',
    score: 12,
    last_game: 'ВПВВВ'
  },
  {
    id: 4,
    name: 'СШ Ленинградец',
    games: 3,
    win: 2,
    draw: 1,
    lose: 0,
    ball_io: '10-0',
    score: 7,
    last_game: 'HBB'
  },
  {
    id: 9,
    name: 'Псков',
    games: 3,
    win: 1,
    draw: 1,
    lose: 1,
    ball_io: '2-2',
    score: 4,
    last_game: 'ВHП'
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
    id: 5,
    name: 'ГОУР-Карелия',
    games: 3,
    win: 1,
    draw: 0,
    lose: 2,
    ball_io: '4-5',
    score: 3,
    last_game: 'ПВП'
  },
  {
    id: 7,
    name: 'Новград',
    games: 2,
    win: 0,
    draw: 0,
    lose: 2,
    ball_io: '0-10',
    score: 0,
    last_game: 'ПП'
  },
  {
    id: 6,
    name: 'Химик',
    games: 3,
    win: 0,
    draw: 0,
    lose: 3,
    ball_io: '1-17',
    score: 0,
    last_game: 'ППП'
  }
]

export default {
  name: 'gameTable',
  setup () {
    return {
      tableTitle: 'Турнирная таблица, XXIX чемпионат СЗФО',
      tableCSS: {
        cardClass: 'bg-grey-1 text-brown',
        tableClass: 'text-grey-8',
        tableHeaderClass: 'text-deep-orange-10'
      },
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
