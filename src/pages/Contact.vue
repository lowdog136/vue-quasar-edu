<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 800px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img alt="logo" src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>
            Контакты
          </q-toolbar-title>

          <q-btn flat round dense icon="whatshot" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <p v-for="n in 1" :key="n">
            Cвязаться со мной:<br>
            Напишите мне на e-mail: lowdog{одинтришесть}@gmail.com<br>
            Я обязательно отвечу.<br>
            Приятного вам дня.<br>
          </p>
        </q-page>
       </q-page-container>
    </q-layout>
  </div>
  <div>
    <date-countdown :deadlineDate="new Date(2024, 5, 1, 14, 59, 59, 0)"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DateCountdown from 'components/Admin/dateCountdown.vue'

export default defineComponent({
  name: 'PageIndex',
  components: { DateCountdown }
})
</script>
