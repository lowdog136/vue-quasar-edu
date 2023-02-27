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
          <q-tab-panel :name=tours[6]>
            <div class="text-h5 q-mb-md">{{ tours[6] }}</div>
            <p>10 мая 2022</p>
            <p>Победа</p>
            <p>ФК "Константиновское" 1 - 2 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
            <q-separator />
            <p>23 апреля 2022</p>
            <p>Победа</p>
            <p>ФК "Константиновское" 0 - 2 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[5]>
            <div class="text-h5 q-mb-md">{{ tours[5] }}</div>
            <p>19 апреля 2022</p>
            <p>Победа</p>
            <p>ФК "Виста" 1 - 2 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[4]>
            <div class="text-h5 q-mb-md">{{ tours[4] }}</div>
            <p>13 апреля 2022</p>
            <p>Ничья</p>
            <p>ФК "Анапа" г. Анапа 1 - 1 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[3]>
            <div class="text-h5 q-mb-md">{{ tours[3] }}</div>
            <p>6 апреля 2022</p>
            <p>Победа</p>
            <p>ФК "Черноморец-м" г. Новороссийск 0 - 3 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[2]>
            <div class="text-h5 q-mb-md">{{ tours[2] }}</div>
            <p>26 марта 2022</p>
            <p>Победа</p>
            <p>ФК "Фаворит" г. Выборг 1 - 5 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[1]>
            <div class="text-h5 q-mb-md">{{ tours[1] }}</div>
            <p>21 марта 2022</p>
            <p>Поражение</p>
            <p>ФК "Звезда" г. Санкт-Петербург 6 - 1 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
          </q-tab-panel>
          <q-tab-panel :name=tours[0]>
            <div class="text-h5 q-mb-md">{{ tours[0] }}</div>
            <p>14 марта 2022</p>
            <p>Поражение</p>
            <p>ФК "Динамо" г. Санкт-Петербург 4 - 2 {{$store.state.teams[0].name}} {{$store.state.teams[0].city}}</p>
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
      tours: ['против Динамо', 'против Звезды', 'против Фаворита', 'против Черноморец-М', 'против Анапы', 'против Висты', 'против Константиновское'],
      teams: ['ФК "Север"', 'ФК ""Псков"', 'СШ "Ленинградец"', 'СШ №2 ВО "Звезда"', 'СШ №7 "Карелия"', 'ФК "Химик"', 'ФК "Новград"', 'СШ "Электрон"']
    }
  },
  setup () {
    return {
      splitterModel: ref(50),
      selected: ref('против Константиновское'),

      simple: [
        {
          label: 'Товарищеские игры 2023',
          children: [
            // {
            //   label: 'против команда_имя',
            //   icon: 'done'
            // }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="sass" scoped>
.tab-panel
  width: 100%
  max-width: 400px
</style>
