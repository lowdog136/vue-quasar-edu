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
    games: 3,
    win: 2,
    draw: 1,
    lose: 0,
    ball_io: '6-2',
    score: 7,
    last_game: 'ВВН'
  },
  {
    name: 'Псков',
    games: 3,
    win: 3,
    draw: 0,
    lose: 0,
    ball_io: '10-1',
    score: 9,
    last_game: 'ВВВ'
  },
  {
    name: 'СШ №2 ВО Звезда',
    games: 2,
    win: 1,
    draw: 1,
    lose: 0,
    ball_io: '2-2',
    score: '4',
    last_game: 'HВ'
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
    games: 1,
    win: 0,
    draw: 1,
    lose: 0,
    ball_io: '1-1',
    score: 1,
    last_game: 'Н'
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
    games: 2,
    win: 0,
    draw: 0,
    lose: 2,
    ball_io: '1-2',
    score: '0',
    last_game: 'ПП'
  },
  {
    name: 'СШ Электрон',
    games: 2,
    win: 0,
    draw: 0,
    lose: 1,
    ball_io: '1-3',
    score: '0',
    last_game: 'ПП'
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
