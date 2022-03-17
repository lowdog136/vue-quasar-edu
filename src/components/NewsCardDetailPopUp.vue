<template>
  <div class="q-pa-md row items-start q-gutter-md">
        <q-btn label="Подробно" color="primary" @click="dialog = true" />

        <q-dialog v-model="dialog" persistent>
          <q-card>
            <q-card-section>
              <div class="text-overline text-orange-9"> {{ $store.state.NewsCardStatusMatch_F }}</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ $store.state.NewsClubNewsCard[0].NewsClubNewsCardTitleNews }}</div>
              <div class="text-caption text-grey">
                <q-img
                src='../assets/image/imgTitle/title_1.png'
              />
                В минувшее воскресенье ФК "Север" провел гостевой товарищеский матч против ФК "Динамо" Санкт-Петербург.<br>
                Матч закончился победой хозяев со счетом 4-2.<br>
                За "Север" голы забили: 33'-Миронов, 76'-Гагиев (пен).<br><br>
              </div>
              <div class="text-caption text-grey">
                {{ $store.state.NewsClubNewsCard[0].NewsClubNewsCardCardNewsSrc }}
              </div>
            </q-card-section>

            <q-slide-transition>
              <div v-show="expanded">
                <q-separator />
                <q-card-section class="text-subitle2">
                  {{ $store.state.NewsClubNewsCard[0].NewsClubNewsCardExtNews }}
                </q-card-section>
              </div>
            </q-slide-transition>
            <!-- Notice v-close-popup -->
            <q-card-actions align="right">
              <q-btn flat label="закрыть" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-space />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'NewsCardDetailPopUp',
  data () {
    return {
      dialog: ref(false),
      cancelEnabled: ref(false),
      expanded: ref(false),
      dateNews: '14.03.22'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
