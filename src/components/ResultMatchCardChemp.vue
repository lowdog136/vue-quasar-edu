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
          <q-tab-panel name="Чемпионат СЗФО 2022">
            <div class="text-h5 q-mb-md">О турнире:</div>
            <p>Чемпионат СЗФО по футболу среди мужских команд 2022 г. Представлен 8 командами: ФК "Север", ФК ""Псков", СШ "Ленинградец", СШ №2 ВО "Звезда", СШ №7 "Карелия", ФК "Химик", ФК "Новград", СШ "Электрон".</p>
            </q-tab-panel>
          <q-tab-panel :name=tours[3]>
            <div class="text-h4 q-mb-md">4 тур</div>
            <p>{{$store.state.teams[2].name}} {{$store.state.teams[2].city}} 0 - 2 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[2]>
            <div class="text-h4 q-mb-md">3 тур</div>
            <p>1 июня</p>
            <p>{{$store.state.teams[6].name}} {{$store.state.teams[6].city}} 1 - 1 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[1]>
            <div class="text-h4 q-mb-md">2 тур</div>
            <p>1 июня</p>
            <p>{{$store.state.teams[1].name}} {{$store.state.teams[1].city}} 1 - 2 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[0]>
            <div class="text-h4 q-mb-md">1 тур</div>
            <p>29 мая</p>
            <p>{{$store.state.teams[7].name}} {{$store.state.teams[7].city}} 0 - 3 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
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
  name: 'ResultMatchCardChemp',
  data () {
    return {
      tour: 'лол',
      tours: ['1 тур', '2 тур', '3 тур', '4 тур'],
      teams: ['ФК "Север"', 'ФК ""Псков"', 'СШ "Ленинградец"', 'СШ №2 ВО "Звезда"', 'СШ №7 "Карелия"', 'ФК "Химик"', 'ФК "Новград"', 'СШ "Электрон"'],
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
      selected: ref('1 тур'),

      simple: [
        {
          label: 'Чемпионат СЗФО 2022',
          children: [
            {
              label: '4 тур',
              icon: 'done'
            },
            {
              label: '3 тур',
              icon: 'done'
            },
            {
              label: '2 тур',
              icon: 'done'
            },
            {
              label: '1 тур',
              icon: 'done'
            }
          ]
        }
      ]
    }
  }
}
</script>
