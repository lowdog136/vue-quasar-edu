<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered
            v-for="item of items"
            :key="item.id">
      <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg"
      />

      <q-card-section>
        <div class="text-overline text-orange-9">{{ item.preview }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ item.title }}</div>
        <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="dark" label="Share" />
        <q-btn flat color="primary" label="Book" />

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            {{ lorem }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
  <div class="container">
    <ul>
      <li
        v-for="item of items"
        :key="item.id"
      ><br>
        itemTitle: {{ item.title }} <br>
        itemStatus: {{ item.status }} <br>
        itemTeam1: {{ item.team1 }} <br>
        itemTeam2: {{ item.team2 }} <br>
        itemResult: {{ item.result }} <br>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  name: 'ResultMatchAddDataTest',
  data () {
    return {
      items: [],
      itemName: '',
      itemBody: '',
      itemTitle: '',
      itemStatus: '',
      itemNewsClubNewsCardTitleNews: '',
      itemTeam1: '',
      itemTeam2: '',
      itemResult: ''
    }
  },
  async created () {
    try {
      const res = await axios.get('http://localhost:3000/items')
      this.items = res.data
    } catch (error) {
      console.log(error)
    }
  },
  setup () {
    return {
      expanded: ref(false),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    async boughtItem (id) {
      await axios.patch(`http://localhost:3000/items/${id}`, {
        bought: true
      })
      this.items = this.items.map((item) => {
        if (item.id === id) {
          item.bought = true
        }
        return item
      })
    }
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
.container {
  background-color: rgba(80, 79, 70, 0.82);
  max-width: 500px;
  margin: 0 auto;
  border-radius: 8px;
}
li {
  font-size: 1.5rem;
  list-style: none;
}
button {
  margin-top: 5px;
  background-color: #3498db;
  border: none;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
}
input {
  margin-top: 5px;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.bought {
  text-decoration: line-through;
}
</style>
