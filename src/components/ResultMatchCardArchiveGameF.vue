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
          <q-tab-panel :name=titleMainName >
            <div class="text-h5 q-mb-md">Кратко:</div>
            <p>{{ titleMainBody }}</p>
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
            <div class="text-h4 q-mb-md">{{ tours[0] }}</div>
            <p>14.03.22</p>
            <p>Поражение</p>
            <p>ФК "Динамо" Санкт-Петербург 4 - 2 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ResultMatchCardArchiveGameF',
  data () {
    return {
      titleMainName: 'Товарищеские игры 2022',
      titleMainBody: 'В 2022 году ФК "Север" провел 8 товарищеских матчей.',
      tours: ['против Динамо', 'против Звезды', 'против Фаворита', 'против Черноморец-М', 'против Анапы', 'против Висты', 'против Константиновское', 'против Константиновское.2'],
      teams: ['ФК "Север"', 'ФК ""Псков"', 'СШ "Ленинградец"', 'СШ №2 ВО "Звезда"', 'СШ №7 "Карелия"', 'ФК "Химик"', 'ФК "Новград"', 'СШ "Электрон"']
    }
  },
  setup () {
    return {
      splitterModel: ref(50),
      selected: ref('против Константиновское.2'),

      simple: [
        {
          label: 'Товарищеские игры 2022',
          children: [
            {
              label: 'против Константиновское.2',
              icon: 'done'
            },
            {
              label: 'против Константиновское',
              icon: 'done'
            },
            {
              label: 'против Висты',
              icon: 'done'
            },
            {
              label: 'против Анапы',
              icon: 'done'
            },
            {
              label: 'против Черноморец-М',
              icon: 'done'
            },
            {
              label: 'против Фаворита',
              icon: 'done'
            },
            {
              label: 'против Звезды',
              icon: 'done'
            },
            {
              label: 'против Динамо',
              icon: 'done'
            }
          ]
        }
      ]
    }
  }
}
</script>
