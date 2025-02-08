<template>
  <div class="q-pa-md">
    <q-markup-table flat bordered>
      <thead class="bg-grey-13 text-primary">
      <tr>
        <th colspan="8">
          <div class="row no-wrap items-center">
            <q-img
              style="width: 70px"
              :ratio="1"
              class="rounded-borders"
              src="https://st.joinsport.io/news/1136334/6761566ccf861_910x610.jpg"
            />

            <div class="text-h4 q-ml-md text-primary">{{ tableTitle }}</div>
          </div>
        </th>
      </tr>
      <tr>
        <th v-for="item in columns" :key="item.id" :class=item.text>{{ item.label }}</th>
      </tr>
      </thead>
      <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
      <tr v-for="item in sortedItems" :key="item.id">
        <td :class=item.text_a>{{ item.name }}</td>
        <td class="text-right">{{ item.games }}</td>
        <td class="text-right">{{ item.win }}</td>
        <td class="text-right">{{ item.draw }}</td>
        <td class="text-right">{{ item.lose }}</td>
        <td class="text-right">{{ item.ball_io }}</td>
        <td class="text-right">{{ item.score }}</td>
        <td class="text-right">{{ item.last_game }}</td>
      </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
const columns = [
  {
    id: 1,
    text: 'text-left',
    label: 'Группа "Б"'
  },
  {
    id: 2,
    text: 'text-right',
    label: 'И'
  },
  {
    id: 3,
    text: 'text-right',
    label: 'В'
  },
  {
    id: 4,
    text: 'text-right',
    label: 'Н'
  },
  {
    id: 5,
    text: 'text-right',
    label: 'П'
  },
  {
    id: 6,
    text: 'text-right',
    label: 'З/П'
  },
  {
    id: 7,
    text: 'text-right',
    label: 'О'
  },
  {
    id: 8,
    text: 'text-right',
    label: 'Ф'
  }
]
const rows = [
  {
    id: 1,
    text_a: 'text-left',
    text_c: 'primary',
    name: 'Север',
    color: 'primary',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0-0',
    score: 0,
    last_game: '-'
  },
  {
    id: 2,
    text: 'text-left',
    name: 'СШOP №1 Кристал',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0-0',
    score: 0,
    last_game: '-'
  },
  {
    id: 3,
    text: 'text-left',
    name: 'Псков',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0-0',
    score: 0,
    last_game: '-'
  },
  {
    id: 4,
    name: 'Динамо-2',
    text: 'text-left',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0-0',
    score: 0,
    last_game: '-'
  },
  {
    id: 5,
    text: 'text-left',
    name: 'Звезда',
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
    ball_io: '0-0',
    score: 0,
    last_game: '-'
  }
]

export default {
  name: 'gameTable',
  setup () {
    return {
      tableTitle: 'XXVI турнир полпреда СЗФО',
      columns,
      rows
    }
  },
  computed: {
    sortedItems: function () {
      return rows.sort((a, b) => a.id - b.id)
    }
  }
}
</script>
