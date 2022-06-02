<template>
  <div class="q-px-lg q-pb-md">
    <div class="title">
      Календарь игр ФК "Север"
    </div>
    <q-timeline :layout="layout" color="secondary">
      <q-timeline-entry heading>Июль, 2022</q-timeline-entry>
      <q-timeline-entry
        :title='titleEvent'
        subtitle="Июль 2, 2022"
        side="left"
        icon="emoji_emotions"
      >
        <div>
          7 тур
        </div>
        <div>
          ФК "Север" - СШ №7 Карелия
        </div>
      </q-timeline-entry>
      <q-timeline-entry heading>Июнь, 2022</q-timeline-entry>
      <q-timeline-entry
        :title='titleEvent'
        subtitle="Июнь 29, 2022"
        side="left"
      >
        <div>
          6 тур
        </div>
        <div>
          ФК "Север" - ФК "Химик"
        </div>
      </q-timeline-entry>
      <q-timeline-entry
        :title='titleEvent'
        subtitle="Июнь 18, 2022"
        side="left"
      >
        <div>
          5 тур
        </div>
        <div>
          СШ №2 ВО "Звезда" - ФК "Север"
        </div>
      </q-timeline-entry>
      <q-timeline-entry
        :title='titleEvent'
        subtitle="Июнь 15, 2022"
        side="left"
        icon="local_fire_department"
        color="primary"
      >
        <div>
          4 тур
        </div>
        <div>
          ФК "Псков" - ФК "Север"
        </div>
      </q-timeline-entry>
      <q-timeline-entry
        :title='titleEvent'
        subtitle="Июнь 11, 2022"
        side="left"
      >
        <div>
          3 тур
        </div>
        <div>
          ФК "Новград" - ФК "Север"
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        :title='titleEvent'
        subtitle="Июнь 1, 2022"
        side="left"
        color="orange-14"
        icon="done_all"
      >
        <div>
          2 тур
        </div>
        <div>
          ФК "Ленинградец" 1-2 ФК "Север"
        </div>
      </q-timeline-entry>

      <q-timeline-entry heading>Май, 2022</q-timeline-entry>

      <q-timeline-entry
        :title='titleEvent'
        subtitle="Май 29, 2022"
        side="left"
        color="orange-14"
        icon="done_all"
      >
        <div>
          1 тур
        </div>
        <div>
          СШ "Электрон" 0-3 ФК "Север"
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { computed } from 'vue'

export default {
  data () {},
  setup () {
    const $q = useQuasar()

    return {
      titleEvent: 'Чемпионат СЗФО',
      layout: computed(() => {
        return $q.screen.lt.sm ? 'dense' : ($q.screen.lt.md ? 'comfortable' : 'loose')
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.title
  font-size: 28px
  text-align: center
  color: #2c3e50
.my-card
  width: 100%
  max-width: 350px
</style>
