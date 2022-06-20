<template>
  <div class="q-px-lg q-pb-md">
    <q-timeline :layout="layout" color="secondary" v-for="test in tests" :key="test.id">
      <q-timeline-entry heading>{{ test.mounth }}</q-timeline-entry>
        <q-timeline-entry
          v-for="matchEvent in test.matchEvents" :key="matchEvent.id"
          :title='titleEvent'
          :subtitle=matchEvent.data
          side="left"
          :color=matchEvent.color
          :icon=matchEvent.icon
        >
          <div>
            {{ matchEvent.tour}}<br/>{{ matchEvent.other}}
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
          mounth: 'May',
          matchEvents: [
            {
              id: 1,
              tour: '1 tour',
              other: 'СШ "Ленинградец" 6 - 2 ФК "Север"',
              color: 'primary',
              data: 'май 1, 2022',
              mounth: 'июнь',
              icon: 'bookmark_border'
            },
            {
              id: 2,
              tour: '2 tour',
              other: 'СШ "Ленинградец" 2 - 2 ФК "Север"',
              color: 'primary',
              data: 'май 15, 2022',
              mounth: 'июнь',
              icon: 'bookmark_border'
            },
            {
              id: 3,
              tour: '3 tour',
              other: 'СШ "Ленинградец" 1 - 2 ФК "Север"',
              color: 'primary',
              data: 'май 25, 2022',
              mounth: 'июнь',
              icon: 'bookmark_border'
            }
          ]
        },
        {
          id: 2,
          mounth: 'June',
          matchEvents: [
            {
              id: 1,
              tour: '4 tour',
              other: 'СШ "Ленинградец" 6 - 2 ФК "Север"',
              color: 'primary',
              data: 'June 1, 2022',
              mounth: 'June',
              icon: 'bookmark_border'
            },
            {
              id: 2,
              tour: '5 tour',
              other: 'СШ "Ленинградец" 2 - 2 ФК "Север"',
              color: 'primary',
              data: 'June 11, 2022',
              mounth: 'June',
              icon: 'bookmark_border'
            },
            {
              id: 3,
              tour: '6 tour',
              other: 'СШ "Ленинградец" 1 - 2 ФК "Север"',
              color: 'primary',
              data: 'June 31, 2022',
              mounth: 'June',
              icon: 'bookmark_border'
            }
          ]
        },
        {
          id: 3,
          mounth: 'Jule',
          matchEvents: [
            {
              id: 1,
              tour: '7 tour',
              other: 'СШ "Ленинградец" 6 - 2 ФК "Север"',
              color: 'primary',
              data: 'май 1, 2022',
              mounth: 'Jule',
              icon: 'bookmark_border'
            },
            {
              id: 2,
              tour: '8 tour',
              other: 'СШ "Ленинградец" 2 - 2 ФК "Север"',
              color: 'primary',
              data: 'май 15, 2022',
              mounth: 'Jule',
              icon: 'bookmark_border'
            }
          ]
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
  computed: {
    evenNumbers: function () {
      return this.mounth.filter(function (mounth) {
        return mounth
      })
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
