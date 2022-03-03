<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="glossy">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
<!--        <q-footer reveal elevated>
          <q-toolbar class="glossy">
            <q-toolbar-title>Footer</q-toolbar-title>
          </q-toolbar>
        </q-footer>-->
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
    caption: 'О клубе',
    icon: 'sports_soccer',
    to: '/HistoryClub'
  },
  {
    title: 'Стадион',
    caption: 'Стадион',
    icon: 'sports_soccer',
    to: '/Stadium'
  },
  {
    title: 'Фанаты',
    caption: 'Фанаты',
    icon: 'sports_soccer',
    to: '/Fanats'
  },
  {
    title: 'Фото',
    caption: 'Фото',
    icon: 'chat',
    to: '/Foto'
  },
  {
    title: 'Видео',
    caption: 'Видео',
    icon: 'chat',
    to: '/Video'
  },
  {
    title: 'Резудьтаты матчей',
    caption: 'Результаты матчей',
    icon: 'chat',
    to: '/ResultMatch'
  },
  {
    title: 'Контакты',
    caption: 'Связаться',
    icon: 'contact_mail',
    to: 'Contact'
  },
  {
    title: 'О сайте',
    caption: 'История сайта',
    icon: 'info',
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
