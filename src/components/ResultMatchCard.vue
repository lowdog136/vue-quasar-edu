<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      style="height: 400px"
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <q-tree
            :nodes="simple"
            node-key="label"
            selected-color="primary"
            v-model:selected="selected"
            default-expand-all
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="selected"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="2022">
            <div class="text-h4 q-mb-md">Welcome</div>
            </q-tab-panel>

          <q-tab-panel name="Food">
            <div class="text-h4 q-mb-md">Food</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
const baseURL = 'http://localhost:3001'

export default {
  name: 'ResultMatchCard',
  data () {
    return {
      resultGames: [],
      resultGameStatus: '',
      resultGameResult: '',
      resultGameTitle: '',
      resultGameDate: '',
      resultGameTeam1: '',
      resultGameTeam1City: '',
      resultGameTeam2: '',
      resultGameTeam2City: '',
      resultGameTotal: ''
    }
  },
  async created () {
    try {
      const res = await axios.get(`${baseURL}/resultGames`)
      this.resultGames = res.data
    } catch (error) {
      console.log(error)
    }
  },
  setup () {
    return {
      splitterModel: ref(50),
      selected: ref('Food'),

      simple: [
        {
          label: '2022',
          children: [
            {
              label: 'Food',
              icon: 'restaurant_menu'
            }
          ]
        }
      ]
    }
  }
}
</script>
