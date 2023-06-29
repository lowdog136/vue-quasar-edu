<script setup>

</script>

<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 800px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img  alt="logo" src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <q-toolbar-title>
            Чемпионат СЗФО по футболу среди мужских команд
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page padding>
          <p v-for="n in 1" :key="n">
            Чемпионат Северо-Западного федерального округа по футболу среди мужских команд проводится с 1996 года. <br>
            В 2023 году чемпионат является зональным этапом всероссийских соревнований по футболу среди мужчин «III дивизион». Чемпион СЗФО получает путевку в финальный турнир РФС среди команд III дивизиона. <br>
            Призеры чемпионата получают право пройти процедуру лицензирования для участия во Второй лиге. <br>
            В турнире принимают участие команды любительских футбольных клубов, составленные из игроков, родившихся не ранее 2008 года. <br>
          </p>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped lang="sass">

</style>
