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
          <q-tab-panel :name=tours[11]>
            <div class="text-h4 q-mb-md">{{ tours[11] }}</div>
            <p>25 августа</p>
            <p>{{$store.state.teams[5].name}} {{$store.state.teams[5].city}} 0 - 0 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[10]>
            <div class="text-h4 q-mb-md">{{ tours[10] }}</div>
            <p>20 августа</p>
            <p>{{$store.state.teams[4].name}} {{$store.state.teams[4].city}} 0 - 7 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[9]>
            <div class="text-h4 q-mb-md">{{ tours[9] }}</div>
            <p>13 августа</p>
            <p>{{$store.state.teams[0].name}} {{$store.state.teams[0].city}} 2 - 1 {{$store.state.teams[3].name}} {{$store.state.teams[3].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[8]>
            <div class="text-h4 q-mb-md">{{ tours[8] }}</div>
            <p>9 августа</p>
            <p>{{$store.state.teams[0].name}} {{$store.state.teams[0].city}} 3 - 0 {{$store.state.teams[6].name}} {{$store.state.teams[6].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[7]>
            <div class="text-h4 q-mb-md">{{ tours[7] }}</div>
            <p>6 августа</p>
            <p>{{$store.state.teams[0].name}} {{$store.state.teams[0].city}} 7 - 0 {{$store.state.teams[7].name}} {{$store.state.teams[7].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[6]>
            <div class="text-h4 q-mb-md">{{ tours[6] }}</div>
            <p>2 июля</p>
            <p>{{$store.state.teams[0].name}} {{$store.state.teams[0].city}} 2 - 0 {{$store.state.teams[4].name}} {{$store.state.teams[4].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[5]>
            <div class="text-h4 q-mb-md">{{ tours[5] }}</div>
            <p>29 июня</p>
            <p>{{$store.state.teams[0].name}} {{$store.state.teams[0].city}} 3 - 0 {{$store.state.teams[5].name}} {{$store.state.teams[5].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[4]>
            <div class="text-h4 q-mb-md">{{ tours[4] }}</div>
            <p>18 июня</p>
            <p>{{$store.state.teams[3].name}} {{$store.state.teams[3].city}} 1 - 2 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[3]>
            <div class="text-h4 q-mb-md">{{ tours[3] }}</div>
            <p>15 июня</p>
            <p>{{$store.state.teams[2].name}} {{$store.state.teams[2].city}} 0 - 2 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[2]>
            <div class="text-h4 q-mb-md">{{ tours[2] }}</div>
            <p>11 июня</p>
            <p>{{$store.state.teams[6].name}} {{$store.state.teams[6].city}} 1 - 1 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[1]>
            <div class="text-h4 q-mb-md">{{ tours[1] }}</div>
            <p>1 июня</p>
            <p>{{$store.state.teams[1].name}} {{$store.state.teams[1].city}} 1 - 2 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[0]>
            <div class="text-h5 q-mb-md">1 тур</div>
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
  name: 'ResultMatchCardArchiveGameF',
  data () {
    return {
      tour: 'лол',
      tours: ['1 тур', '2 тур', '3 тур', '4 тур', '5 тур', '6 тур', '7 тур', '8 тур', '9 тур', '10 тур', '11 тур', '12 тур', '13 тур', '14 тур'],
      teams: ['ФК "Север"', 'ФК ""Псков"', 'СШ "Ленинградец"', 'СШ №2 ВО "Звезда"', 'СШ №7 "Карелия"', 'ФК "Химик"', 'ФК "Новград"', 'СШ "Электрон"'],
      scores: ['0-3', '1-2', '1-1', '0-2', '1-2']
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
              label: '12 тур',
              icon: 'done'
            },
            {
              label: '11 тур',
              icon: 'done'
            },
            {
              label: '10 тур',
              icon: 'done'
            },
            {
              label: '9 тур',
              icon: 'done'
            },
            {
              label: '8 тур',
              icon: 'done'
            },
            {
              label: '7 тур',
              icon: 'done'
            },
            {
              label: '6 тур',
              icon: 'done'
            },
            {
              label: '5 тур',
              icon: 'done'
            },
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
