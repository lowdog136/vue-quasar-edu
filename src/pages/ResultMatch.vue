<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 800px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img  alt="logo" src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>
            Результаты матчей
          </q-toolbar-title>

          <q-btn flat round dense icon="whatshot" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <p v-for="n in 1" :key="n">
            13 марта 2022 <br>
            Товарищеский матч <br>
            ФК "Динамо" Санкт-Петербург - ФК "Север Мурманск" 4-2<br>
          </p>
          <p v-for="n in 1" :key="n">
            19 марта 2022 <br>
            Товарищеский матч <br>
            ФК "Звезда" Санкт-Петербург - ФК "Север Мурманск" 6-1<br>
          </p>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex'
})
</script>
