<template>
  <div class="q-pa-md">
    <div style="max-width: 100%">
      <q-tabs
        v-model='options'
        align="justify"
        narrow-indicator
        class="q-mb-lg"
      >
        <q-tab v-for="tab in options2" :key=tab.id class="text-primary" :name=tab.value :label=tab.label />
      </q-tabs>

      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="options"
          animated
          transition-prev="fade"
          transition-next="fade"
          class="bg-grey-2 text-black text-center"
        >
          <q-tab-panel v-for="tab in options2" :key=tab.id :name=tab.label >
            <div class="text-h6">{{ tab.label }}</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ArchiveGamesViewList2',
  setup () {
    return {
      tab: ref('mails'),
      options: ref(
        [
          {
            id: 1,
            label: '2007',
            value: '2007',
            done: true
          },
          {
            id: 2,
            label: '2008',
            value: '2008',
            done: true
          },
          {
            id: 3,
            label: '2009',
            value: '2009',
            done: true
          },
          {
            id: 4,
            label: '2010',
            value: '2010',
            done: true
          },
          {
            id: 5,
            label: '2011',
            value: '2011',
            done: true
          },
          {
            id: 6,
            label: '2013',
            value: '2013',
            done: true
          },
          {
            id: 7,
            label: '2014',
            value: '2014',
            done: true
          },
          {
            id: 8,
            label: '2016',
            value: '2016',
            done: true
          },
          {
            id: 9,
            label: '2022',
            value: '2022',
            done: true
          },
          {
            id: 10,
            label: '2023',
            value: '2023',
            done: true
          },
          {
            id: 11,
            label: '2024',
            value: '2024',
            done: true
          }
        ]
      ),
      options2: ref(
        [
          {
            id: 1,
            label: '2007',
            name: '2007',
            value: '2007',
            done: true
          },
          {
            id: 2,
            label: '2008',
            value: '2008',
            done: true
          },
          {
            id: 3,
            label: '2009',
            value: '2009',
            done: true
          },
          {
            id: 4,
            label: '2010',
            value: '2010',
            done: true
          },
          {
            id: 5,
            label: '2011',
            value: '2011',
            done: true
          },
          {
            id: 6,
            label: '2013',
            value: '2013',
            done: true
          },
          {
            id: 7,
            label: '2014',
            value: '2014',
            done: true
          },
          {
            id: 8,
            label: '2016',
            value: '2016',
            done: true
          },
          {
            id: 9,
            label: '2022',
            value: '2022',
            done: true
          },
          {
            id: 10,
            label: '2023',
            value: '2023',
            done: true
          },
          {
            id: 11,
            label: '2024',
            value: '2024',
            done: true
          }
        ]
      )
    }
  }
}
</script>
