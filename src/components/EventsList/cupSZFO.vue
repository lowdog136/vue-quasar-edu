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
            «Кубок среди любительских команд — зона «Северо-Запад».
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page padding>
          <p v-for="n in 1" :key="n">
            Межрегиональные спортивные соревнования «Кубок среди любительских команд — зона «Северо-Запад» по футболу среди мужских команд проводятся с 1997 года.<br>
            В 2023 году Кубок является зональным этапом всероссийских соревнований по футболу среди мужчин «Кубок среди любительских команд».<br>
            Победитель Кубка завоюет путевку в финальный турнир РФС «Кубок среди любительских команд» и получит право пройти процедуру лицензирования для участия во Второй лиге.<br>
            В турнире принимают участие команды любительских футбольных клубов, составленные из игроков, родившихся не ранее 2008 года.<br>
          </p>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped lang="sass">

</style>
