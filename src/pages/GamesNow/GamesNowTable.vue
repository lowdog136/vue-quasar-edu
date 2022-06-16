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
    games: 4,
    win: 3,
    draw: 1,
    lose: 0,
    ball_io: '8-2',
    score: 10,
    last_game: 'ВВНВ'
  },
  {
    name: 'Псков',
    games: 4,
    win: 3,
    draw: 0,
    lose: 1,
    ball_io: '10-3',
    score: 9,
    last_game: 'ВВВП'
  },
  {
    name: 'СШ №2 ВО Звезда',
    games: 3,
    win: 1,
    draw: 1,
    lose: 1,
    ball_io: '5-7',
    score: '4',
    last_game: 'HВП'
  },
  {
    name: 'Химик',
    games: 3,
    win: 0,
    draw: 2,
    lose: 1,
    ball_io: '5-7',
    score: '2',
    last_game: 'ПНН'
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
    games: 3,
    win: 1,
    draw: 1,
    lose: 1,
    ball_io: '8-6',
    score: '4',
    last_game: 'ПВН'
  },
  {
    name: 'СШ №7 Карелия',
    games: 3,
    win: 1,
    draw: 0,
    lose: 2,
    ball_io: '3-4',
    score: '3',
    last_game: 'ППВ'
  },
  {
    name: 'СШ Электрон',
    games: 3,
    win: 0,
    draw: 0,
    lose: 3,
    ball_io: '0-10',
    score: '0',
    last_game: 'ППП'
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
