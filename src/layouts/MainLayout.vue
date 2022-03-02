<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          SeverFans
        </q-toolbar-title>

        <div>Сайт болельщиков ФК "Север" Мурманск</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Навигация
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Главная',
    caption: 'домой',
    icon: 'home',
    to: '/'
  },
  {
    title: 'ФК Север',
    caption: 'О клубе, стадион, фанаты',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Архив',
    caption: 'Фото, видео, результаты матчей',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Контакты',
    caption: 'Связаться',
    icon: 'record_voice_over',
    to: 'Contact'
  },
  {
    title: 'О сайте',
    caption: 'История сайта',
    icon: 'help',
    to: 'AboutSite'
  }
/*   {
    title: 'Vk',
    caption: 'Клуб в Vk',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  } */
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
