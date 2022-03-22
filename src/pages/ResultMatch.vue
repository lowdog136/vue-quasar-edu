<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Товарищеский матч</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Поражение</div>
          <div class="text-caption text-grey">
            ФК "Динамо" Санкт-Петербург - ФК "Север Мурманск" 4-2
          </div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            src="../assets/image/imgTitle/title_1.png"
          />
        </q-card-section>
      </q-card-section>
      <q-separator />
    </q-card>
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Товарищеский матч</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Поражение</div>
          <div class="text-caption text-grey">
            ФК "Звезда" Санкт-Петербург - ФК "Север Мурманск" 6-1
          </div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            src="../assets/image/imgTitle/title_2.png"
          />
        </q-card-section>
      </q-card-section>
      <q-separator />
    </q-card>
  </div>
</template>

<script>
export default {
  setup () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
