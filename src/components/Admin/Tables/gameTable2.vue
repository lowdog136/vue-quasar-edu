<template>
  <div class="q-pa-md">
    <q-markup-table>
      <thead>
      <tr>
        <th v-for="item in tableHead" :key="item.id">{{ item.label }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in tableBody" :key="item.id">
        <td >{{ item.name }}</td>
        <td>{{ item.games }}</td>
        <td>{{ item.win }}</td>
        <td>{{ item.draw }}</td>
        <td>{{ item.lose }}</td>
        <td>{{ item.ball_io }}</td>
        <td>{{ item.score }}</td>
        <td v-for="item2 in item.last_game" :key="item2.id">{{ item2.state }}</td>
      </tr>
      </tbody>
      <thead>
      <tr>
        <div>
          <div class="text-h6 q-ml-md text-black">{{ tableTitle }}</div>
        </div>
      </tr>
      <tr>
        <th v-for="item in tableHead" :key="item.id">{{ item.label }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in tableBody" :key="item.id">
        <td :class=item.color>
          {{ item.name }}
        </td>
        <td  :class=item.color>{{ item.games }}</td>
        <td  :class=item.color>{{ item.win }}</td>
        <td :class=item.color>{{ item.draw }}</td>
        <td :class=item.color>{{ item.lose }}</td>
        <td :class=item.color>{{ item.ball_io }}</td>
        <td :class=item.color>{{ item.score }}</td>
        <td  :class=item.color v-for="item2 in item.last_game" :key="item2.id">{{ item2.state }}</td>
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
          color: 'primary',
          games: 5,
          win: 4,
          draw: 0,
          lose: 1,
          ball_io: '19-3',
          score: 12,
          last_game: [
            {
              id: 1,
              state: 'B'
            },
            {
              id: 2,
              state: 'П'
            },
            {
              id: 3,
              state: 'B'
            },
            {
              id: 4,
              state: 'B'
            },
            {
              id: 5,
              state: 'B'
            },
            {
              id: 6,
              state: ''
            },
            {
              id: 7,
              state: ''
            },
            {
              id: 8,
              state: ''
            },
            {
              id: 9,
              state: ''
            },
            {
              id: 10,
              state: ''
            },
            {
              id: 11,
              state: ''
            },
            {
              id: 12,
              state: ''
            }
          ]
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
          last_game: [
            {
              id: 1,
              state: 'Н'
            },
            {
              id: 2,
              state: 'В'
            },
            {
              id: 3,
              state: 'B'
            },
            {
              id: 4,
              state: ''
            },
            {
              id: 5,
              state: ''
            },
            {
              id: 6,
              state: ''
            },
            {
              id: 7,
              state: ''
            },
            {
              id: 8,
              state: ''
            },
            {
              id: 9,
              state: ''
            },
            {
              id: 10,
              state: ''
            },
            {
              id: 11,
              state: ''
            },
            {
              id: 12,
              state: ''
            }
          ]
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
          last_game: [
            {
              id: 1,
              state: 'B'
            },
            {
              id: 2,
              state: 'Н'
            },
            {
              id: 3,
              state: 'П'
            },
            {
              id: 4,
              state: ''
            },
            {
              id: 5,
              state: ''
            },
            {
              id: 6,
              state: ''
            },
            {
              id: 7,
              state: ''
            },
            {
              id: 8,
              state: ''
            },
            {
              id: 9,
              state: ''
            },
            {
              id: 10,
              state: ''
            },
            {
              id: 11,
              state: ''
            },
            {
              id: 12,
              state: ''
            }
          ]
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
          last_game: [
            {
              id: 1,
              state: 'B'
            },
            {
              id: 2,
              state: ''
            },
            {
              id: 3,
              state: ''
            },
            {
              id: 4,
              state: ''
            },
            {
              id: 5,
              state: ''
            },
            {
              id: 6,
              state: ''
            },
            {
              id: 7,
              state: ''
            },
            {
              id: 8,
              state: ''
            },
            {
              id: 9,
              state: ''
            },
            {
              id: 10,
              state: ''
            },
            {
              id: 11,
              state: ''
            },
            {
              id: 12,
              state: ''
            }
          ]
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
          last_game: [
            {
              id: 1,
              state: 'П'
            },
            {
              id: 2,
              state: 'В'
            },
            {
              id: 3,
              state: 'П'
            },
            {
              id: 4,
              state: ''
            },
            {
              id: 5,
              state: ''
            },
            {
              id: 6,
              state: ''
            },
            {
              id: 7,
              state: ''
            },
            {
              id: 8,
              state: ''
            },
            {
              id: 9,
              state: ''
            },
            {
              id: 10,
              state: ''
            },
            {
              id: 11,
              state: ''
            },
            {
              id: 12,
              state: ''
            }
          ]
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
          last_game: [
            {
              id: 1,
              state: 'П'
            },
            {
              id: 2,
              state: 'П'
            },
            {
              id: 3,
              state: ''
            },
            {
              id: 4,
              state: ''
            },
            {
              id: 5,
              state: ''
            },
            {
              id: 6,
              state: ''
            },
            {
              id: 7,
              state: ''
            },
            {
              id: 8,
              state: ''
            },
            {
              id: 9,
              state: ''
            },
            {
              id: 10,
              state: ''
            },
            {
              id: 11,
              state: ''
            },
            {
              id: 12,
              state: ''
            }
          ]
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
          last_game: [
            {
              id: 1,
              state: 'П'
            },
            {
              id: 2,
              state: 'П'
            },
            {
              id: 3,
              state: 'П'
            },
            {
              id: 4,
              state: ''
            },
            {
              id: 5,
              state: ''
            },
            {
              id: 6,
              state: ''
            },
            {
              id: 7,
              state: ''
            },
            {
              id: 8,
              state: ''
            },
            {
              id: 9,
              state: ''
            },
            {
              id: 10,
              state: ''
            },
            {
              id: 11,
              state: ''
            },
            {
              id: 12,
              state: ''
            }
          ]
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

<style lang="sass">
thead
  border-bottom: 2px solid rgb(160 160 160)
  text-align: center
  background-color: #2c5e77
  color: #fff

tbody
  background-color: #e4f0f5

</style>
