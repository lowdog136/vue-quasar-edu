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
    games: 10,
    win: 9,
    draw: 1,
    lose: 0,
    ball_io: '27-4',
    score: 28,
    last_game: 'BBBBB'
  },
  {
    id: 2,
    name: 'Псков',
    games: 8,
    win: 7,
    draw: 0,
    lose: 1,
    ball_io: '20-5',
    score: 21,
    last_game: 'ПВВВВ'
  },
  {
    id: 3,
    name: 'СШ №2 ВО Звезда',
    games: 10,
    win: 5,
    draw: 1,
    lose: 4,
    ball_io: '20-16',
    score: '16',
    last_game: 'ПВВВП'
  },
  {
    id: 7,
    name: 'Химик',
    games: 9,
    win: 1,
    draw: 3,
    lose: 5,
    ball_io: '14-20',
    score: '6',
    last_game: 'ППВПП'
  },
  {
    id: 5,
    name: 'Новград',
    games: 8,
    win: 1,
    draw: 3,
    lose: 4,
    ball_io: '6-14',
    score: 6,
    last_game: 'ННППП'
  },
  {
    id: 6,
    name: 'СШ Ленинградец',
    games: 8,
    win: 3,
    draw: 2,
    lose: 3,
    ball_io: '17-12',
    score: '11',
    last_game: 'ВППНВ'
  },
  {
    id: 7,
    name: 'СШ №7 Карелия',
    games: 9,
    win: 4,
    draw: 1,
    lose: 4,
    ball_io: '17-11',
    score: '13',
    last_game: 'ВПВПВ'
  },
  {
    id: 8,
    name: 'СШ Электрон',
    games: 10,
    win: 0,
    draw: 1,
    lose: 9,
    ball_io: '3-42',
    score: '1',
    last_game: 'НПППП'
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
