<template>
  <div class="q-pa-md">
    <q-layout>
      <q-page-container>
        <div class="col-6">
          <q-img src="~src/assets/image/imgTitle/title_1.png" :fit="mode" spinner-color="red" :ratio="16/9" no-native-menu>
            <div class="absolute-top text-center">
              {{ $store.state.NewsClubNewsCard[1].NewsClubNewsCardTitleNews }}
            </div>
          </q-img>
        </div>
        <q-page>
          Товарищеский матч против ФК "Звезда" из Санкт-Петербурга закончился разгромом "Севера".
          Команда из Мурманска проиграла 6-1. Единственный гол "Север" гол забил на 26й минуте игрок под номером восемь.<br>
          Источник: vk.com/fczvezdaspb <br>
          <q-btn color="primary" to="/NewsClub">Вернуться</q-btn>
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
<style>
</style>
