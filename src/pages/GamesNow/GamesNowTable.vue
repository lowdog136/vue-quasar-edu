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
    games: 4,
    win: 1,
    draw: 1,
    lose: 2,
    ball_io: '4-5',
    score: '4',
    last_game: 'ППВН'
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
