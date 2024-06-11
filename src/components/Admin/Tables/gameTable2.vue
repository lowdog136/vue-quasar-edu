<template>
  <div class="q-pa-md">
    <q-markup-table>
      <thead>
      <tr>
        <div class="row no-wrap items-center">
          <div class="text-h6 q-ml-md text-black">{{ tableTitle }}</div>
        </div>
      </tr>
      <tr>
        <th class="text-left text-primary" v-for="item in tableHead" :key="item.id">{{ item.label }}</th>
      </tr>
      </thead>
      <tbody>
      <tr class="text-left text-grey-8" v-for="item in tableBody" :key="item.id">
        <td class="text-left" :class=item.color>
          {{ item.name }}
        </td>
        <td class="text-left" :class=item.color>{{ item.games }}</td>
        <td class="text-left" :class=item.color>{{ item.win }}</td>
        <td class="text-left" :class=item.color>{{ item.draw }}</td>
        <td class="text-left" :class=item.color>{{ item.lose }}</td>
        <td class="text-left" :class=item.color>{{ item.ball_io }}</td>
        <td class="text-left" :class=item.color>{{ item.score }}</td>
        <td class="text-left" :class=item.color>{{ item.last_game }}</td>
      </tr>
      </tbody>
    </q-markup-table>
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
    games: 2,
    win: 1,
    draw: 0,
    lose: 1,
    ball_io: '3-2',
    score: 3,
    last_game: 'ВП'
  },
  {
    id: 9,
    name: 'Псков',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0-0',
    score: 0,
    last_game: ''
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
    id: 5,
    name: 'ГОУР-Карелия',
    games: 1,
    win: 0,
    draw: 0,
    lose: 1,
    ball_io: '0-2',
    score: 0,
    last_game: 'П'
  },
  {
    id: 6,
    name: 'Химик',
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
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0-0',
    score: 0,
    last_game: ''
  }
]

export default {
  name: 'gameTable2',
  data () {
    return {
      tableTitle: 'Турнирная таблица, XXIX чемпионат СЗФО',
      tabNameInfoText: 'To Do Info:',
      tabNameTodoText: 'To Do List:',
      tabNameTodoAddText: 'To Do Add:',
      tableHead: [
        {
          id: 1,
          label: '',
          value: 'reset'
        },
        {
          id: 2,
          label: 'И',
          value: 'reset'
        },
        {
          id: 3,
          label: 'В',
          value: 'game'
        },
        {
          id: 4,
          label: 'Н',
          value: 'team'
        },
        {
          id: 5,
          label: 'П',
          value: 'date'
        },
        {
          id: 6,
          label: 'Разница',
          value: 'date'
        },
        {
          id: 7,
          label: 'О',
          value: 'date'
        },
        {
          id: 8,
          label: 'Форма',
          value: 'date'
        }
      ],
      tableBody: [
        {
          id: 8,
          name: 'Север',
          color: 'text-primary',
          games: 2,
          win: 1,
          draw: 0,
          lose: 1,
          ball_io: '3-2',
          score: 3,
          last_game: 'ВП'
        },
        {
          id: 9,
          name: 'Псков',
          games: 0,
          win: 0,
          draw: 0,
          lose: 0,
          ball_io: '0-0',
          score: 0,
          last_game: ''
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
          id: 5,
          name: 'ГОУР-Карелия',
          games: 1,
          win: 0,
          draw: 0,
          lose: 1,
          ball_io: '0-2',
          score: 0,
          last_game: 'П'
        },
        {
          id: 6,
          name: 'Химик',
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
          games: 0,
          win: 0,
          draw: 0,
          lose: 0,
          ball_io: '0-0',
          score: 0,
          last_game: ''
        }
      ]
    }
  },
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
