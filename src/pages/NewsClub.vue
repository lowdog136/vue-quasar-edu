<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img
        src="../assets/image/imgTitle/title_1.png"
      />

      <q-card-section>
        <div class="text-overline text-orange-9"> {{ statusMatch_2 }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Матч против Динамо</div>
        <div class="text-caption text-grey">
          В минувшее воскресенье ФК "Север" провел товарищеский матч против ФК "Динамо" Санкт-Петербург.
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="dark" label="14.03.22" />
        <q-btn flat color="primary"  label="vk.com/dynamo_spb" />

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            {{ lorem1 }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      expanded: ref(false),
      statusMatch_1: 'Товарищеский матч',
      statusMatch_2: 'Официальный матч',
      lorem1: 'В минувшее воскресенье ФК "Север" провел товарищеский матч против ФК "Динамо" Санкт-Петербург. Матч закончился победой хозяев со счетом 4-2.'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
