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
            Cтраница о истории сайта severfans.ru <br>
            Сайт был основан в 2007 году.<br>
            Точную дату не вспомнить, но судя по Wayback Machine - 25 мая. Наверно эта дата и будет считаться датой начала. Хотя по факту все начиналось раньше.<br>
            Как клуб, объединение болельщиков (хулсы, ультрас) - этот сайт имеет свою историю.<br>
            О ней и будет ниже.<br>
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
