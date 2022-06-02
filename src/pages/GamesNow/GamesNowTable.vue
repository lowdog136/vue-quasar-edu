<template>
  <div class="q-pa-md">
    <q-table
      title="Турнирная таблица"
      :rows="rows"
      :columns="columns"
      row-key="name"
      color="primary"
    />
  </div>
</template>

<script>
const columns = [
  {
    name: 'name',
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
    name: 'Север',
    colorCode: 'primary',
    games: 2,
    win: 2,
    draw: '0',
    lose: 0,
    ball_io: '5-1',
    score: 6,
    last_game: 'ВВ'
  },
  {
    name: 'Псков',
    games: 2,
    win: 2,
    draw: 0,
    lose: 0,
    ball_io: '4-1',
    score: 6,
    last_game: 'ВВ'
  },
  {
    name: 'СШ №2 ВО Звезда',
    games: 1,
    win: 0,
    draw: 1,
    lose: 0,
    ball_io: '2-2',
    score: '1',
    last_game: 'H'
  },
  {
    name: 'Химик',
    games: 2,
    win: 0,
    draw: 1,
    lose: 1,
    ball_io: '2-4',
    score: '1',
    last_game: 'ПН'
  },
  {
    name: 'Новград',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: 0,
    score: '0',
    last_game: ''
  },
  {
    name: 'СШ Ленинградец',
    games: 1,
    win: 0,
    draw: 0,
    lose: 1,
    ball_io: '1-2',
    score: '0',
    last_game: 'П'
  },
  {
    name: 'СШ №7 Карелия',
    games: 1,
    win: 0,
    draw: 0,
    lose: 1,
    ball_io: '1-2',
    score: '0',
    last_game: 'П'
  },
  {
    name: 'СШ Электрон',
    games: 1,
    win: 0,
    draw: 0,
    lose: 1,
    ball_io: '1-3',
    score: '0',
    last_game: 'П'
  }
]

export default {
  setup () {
    return {
      columns,
      rows
    }
  }
}
</script>
