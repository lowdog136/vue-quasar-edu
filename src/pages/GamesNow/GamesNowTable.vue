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
    games: 5,
    win: 4,
    draw: 1,
    lose: 0,
    ball_io: '10-3',
    score: 13,
    last_game: 'ВВНВВ'
  },
  {
    name: 'Псков',
    games: 5,
    win: 4,
    draw: 0,
    lose: 1,
    ball_io: '11-3',
    score: 12,
    last_game: 'ВВВПВ'
  },
  {
    name: 'СШ №2 ВО Звезда',
    games: 4,
    win: 1,
    draw: 1,
    lose: 2,
    ball_io: '6-9',
    score: '4',
    last_game: 'HВПП'
  },
  {
    name: 'Химик',
    games: 4,
    win: 0,
    draw: 3,
    lose: 1,
    ball_io: '6-8',
    score: '3',
    last_game: 'ПНН'
  },
  {
    name: 'Новград',
    games: 2,
    win: 0,
    draw: 1,
    lose: 1,
    ball_io: '1-2',
    score: 1,
    last_game: 'НП'
  },
  {
    name: 'СШ Ленинградец',
    games: 5,
    win: 2,
    draw: 1,
    lose: 2,
    ball_io: '14-9',
    score: '7',
    last_game: 'ПВ'
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
    games: 4,
    win: 0,
    draw: 0,
    lose: 4,
    ball_io: '0-14',
    score: '0',
    last_game: 'ПППП'
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
