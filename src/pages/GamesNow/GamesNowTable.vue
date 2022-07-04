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
    name: 'Север',
    colorCode: 'primary',
    games: 7,
    win: 6,
    draw: 1,
    lose: 0,
    ball_io: '15-3',
    score: 19,
    last_game: 'ВВНВВB'
  },
  {
    name: 'Псков',
    games: 5,
    win: 6,
    draw: 0,
    lose: 1,
    ball_io: '15-4',
    score: 18,
    last_game: 'ВВВПВB'
  },
  {
    name: 'СШ №2 ВО Звезда',
    games: 6,
    win: 2,
    draw: 1,
    lose: 3,
    ball_io: '12-12',
    score: '7',
    last_game: 'ВППВП'
  },
  {
    name: 'Химик',
    games: 7,
    win: 1,
    draw: 3,
    lose: 3,
    ball_io: '12-13',
    score: '6',
    last_game: 'ННППВ'
  },
  {
    name: 'Новград',
    games: 4,
    win: 1,
    draw: 2,
    lose: 1,
    ball_io: '4-4',
    score: 5,
    last_game: 'НПВН'
  },
  {
    name: 'СШ Ленинградец',
    games: 6,
    win: 2,
    draw: 1,
    lose: 3,
    ball_io: '14-10',
    score: '7',
    last_game: 'ВНВПП'
  },
  {
    name: 'СШ №7 Карелия',
    games: 5,
    win: 2,
    draw: 1,
    lose: 2,
    ball_io: '7-7',
    score: '7',
    last_game: 'ППВНП'
  },
  {
    name: 'СШ Электрон',
    games: 7,
    win: 0,
    draw: 1,
    lose: 6,
    ball_io: '3-27',
    score: '1',
    last_game: 'ППППНП'
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
