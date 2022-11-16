<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      style="width: auto; height: auto"
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
          <q-tab-panel name="Кубок СЗФО 2022">
            <div class="text-h5 q-mb-md">О турнире:</div>
            <p>Межрегиональные спортивные соревнования "Кубок среди любительских команд – "Северо-Запад" по футболу среди мужских команд проводится с 1997 года.</p>
            </q-tab-panel>
          <q-tab-panel :name=tours[1]>
            <div class="text-h4 q-mb-md">{{ tours[1] }}</div>
            <p>17 сентября</p>
            <p>{{$store.state.teams[0].name}} {{$store.state.teams[0].city}} {{scores[1]}}{{$store.state.teams[1].name}} {{$store.state.teams[1].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[0]>
            <div class="text-h4 q-mb-md">{{ tours[0] }}</div>
            <p>14 сентября</p>
            <p>{{$store.state.teams[4].name}} {{$store.state.teams[4].city}} {{scores[0]}} {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
const baseURL = 'https://severfans.ru'

export default {
  name: 'ResultMatchCardArchiveGameF',
  data () {
    return {
      tour: 'лол',
      tours: ['Групповой этап, 2 тур', 'Групповой этап, 3 тур'],
      scores: ['0-6', '2-1']
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
      selected: ref('Групповой этап, 3 тур'),

      simple: [
        {
          label: 'Кубок СЗФО 2022',
          children: [
            {
              label: 'Групповой этап, 3 тур',
              icon: 'done'
            },
            {
              label: 'Групповой этап, 2 тур',
              icon: 'done'
            }
          ]
        }
      ]
    }
  }
}
</script>
