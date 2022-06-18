<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      unit="px"
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

      <template v-slot:after >
        <q-tab-panels
          v-model="selected"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
            <q-tab-panel name="Relax Hotel">
              <div class="text-h4 q-mb-md">Welcome</div>
              <p>Ololo</p>
              <p>{{ TitleNews }}</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            </q-tab-panel>

          <q-tab-panel :name=TitleGame>
            <div class="text-h4 q-mb-md">{{ TitleGame }}</div>
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

export default {
  name: 'Test2Comp',

  data () {
    return {
      tests: [
        {
          id: 1,
          name: 'Food',
          other: ''
        },
        {
          id: 2,
          name: 'Room service',
          other: ''
        },
        {
          id: 3,
          name: 'Room view',
          other: ''
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
