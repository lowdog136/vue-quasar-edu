<template>
  <div class="q-px-lg q-pb-md">
    <q-timeline :layout="layout" color="secondary">
      <q-timeline-entry heading>Июнь, 2022</q-timeline-entry>
        <q-timeline-entry
          v-for=" test in tests" :key="test.id"
          :title='titleEvent'
          subtitle="Июнь 1, 2022"
          side="left"
          color="orange-14"
          icon="done_all"
        >
          <div>
            {{ test.tour }} {{ test.other }}
          </div>
        </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Test2Comp',

  data () {
    return {
      tests: [
        {
          id: 1,
          tour: '1 tour',
          other: 'СШ "Ленинградец" 1 - 2 ФК "Север"'
        },
        {
          id: 2,
          tour: '2 tour',
          other: 'СШ "Ленинградец" 2 - 2 ФК "Север"'
        },
        {
          id: 3,
          tour: '3 tour',
          other: ''
        },
        {
          id: 4,
          tour: '4 tour',
          other: ''
        },
        {
          id: 5,
          tour: '5 tour',
          other: ''
        }
      ],
      matches: [
        {
          id: 1,
          match: 'СШ "Ленинградец" 1 - 2 ФК "Север"'
        },
        {
          id: 2,
          match: 'СШ "Ленинградец" 2 - 2 ФК "Север"'
        },
        {
          id: 3,
          match: 'СШ "Ленинградец" 3 - 2 ФК "Север"'
        },
        {
          id: 4,
          match: 'СШ "Ленинградец" 4 - 2 ФК "Север"'
        },
        {
          id: 5,
          match: 'СШ "Ленинградец" 5 - 2 ФК "Север"'
        }
      ]
    }
  },
  setup () {
    return {
      splitterModel: ref(150),
      selected: ref('Food'),

      simple: [
        {
          label: 'Relax Hotel',
          children: [
            {
              label: 'Food',
              icon: 'restaurant_menu'
            },
            {
              label: 'Room service',
              icon: 'room_service'
            },
            {
              label: 'Room view',
              icon: 'photo'
            }
          ]
        }
      ]
    }
  },
  props: {
    TitleNews: String,
    TitleGame: String,
    PopyUpTitleNews: String,
    PopyUpSrcNews: String,
    PopyUpFullNews: String,
    PopyUpHowWatch: String,

    product_data: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
