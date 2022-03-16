<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img
        src=''
      />

      <q-card-section>
        <div class="text-overline text-orange-9"> {{ $store.state.NewsCardStatusMatch_F }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ titleNews }}</div>
        <div class="text-caption text-grey">
          {{ prewievNews }}
        </div>
        <div class="text-caption text-grey">
          {{ cardNewsSrc }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="dark" label="14.03.22" />
        <q-btn
          flat color="primary"
          replace
          to="/News/140322"
          label="Подробно" />

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
            {{ extNews }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
    <input v-model="$store.state.colorCode" type="text" placeholder="kek">
    <input v-model="$store.state.NavigationListMenu[0].Name" type="text" placeholder="ololo">
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'NewsCard',
  data () {
    return {
      expanded: ref(false),
      dateNews: '14.03.22',
      titleUrlImg: '../assets/image/imgTitle/title_1.png',
      cardNewsSrc: 'Источник: vk.com/dynamo_spb. ',
      prewievNews: 'В минувшее воскресенье ФК "Север" провел товарищеский матч против ФК "Динамо" Санкт-Петербург.',
      extNews: 'В минувшее воскресенье ФК "Север" провел гостевой товарищеский матч против ФК "Динамо" Санкт-Петербург. Матч закончился победой хозяев со счетом 4-2.'
    }
  },
  computed: {
    NavigationListMenu: {
      get () {
        return this.$store.state.NavigationListMenu
      },
      set () {}
    }
  },
  setup () {
    return {
      titleNews: 'Матч против Динамо'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
