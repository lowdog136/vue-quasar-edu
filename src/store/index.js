import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
    },
    state: {
      NewsCardStatusMatch_F: 'Товарищеский матч',
      NewsCardStatusMatch_O: 'Официальный матч',
      // Дата обновления новостей о сайте
      NavigationReleaseDateSite: '17.03.22',
      // Дата обновления новостей о команде
      NavigationReleaseNewsSite: '20.03.22',
      NavigationListMenu: [
        {
          id: 1,
          Name: 'Главная',
          Caption: 'Основная страница'
        },
        {
          id: 2,
          Name: 'ФК Север',
          Caption: 'О клубе, новости, стадион'
        },
        {
          id: 3,
          Name: 'Новости клуба',
          Caption: 'Последние известия'
        },
        {
          id: 4,
          Name: 'Клуб',
          Caption: 'О клубе'
        },
        {
          id: 5,
          Name: 'Стадион',
          Caption: 'Стадион'
        },
        {
          id: 6,
          Name: 'Архив',
          Caption: 'Фото, видео, результаты матчей'
        },
        {
          id: 7,
          Name: 'Фото',
          Caption: 'Фотографии'
        },
        {
          id: 8,
          Name: 'Видео',
          Caption: 'Видеоматериалы'
        },
        {
          id: 9,
          Name: 'Результаты матчей',
          Caption: 'Результаты матчей'
        },
        {
          id: 10,
          Name: 'Фанаты',
          Caption: 'Болельщики клуба'
        },
        {
          id: 11,
          Name: 'Архив',
          Caption: 'Фото, видео, результаты матчей'
        },
        {
          id: 12,
          Name: 'Контакты',
          Caption: 'Связаться'
        },
        {
          id: 13,
          Name: 'О сайте',
          Caption: 'Новости сайта, история развития'
        },
        {
          id: 14,
          Name: 'Новости',
          Caption: 'История обновления'
        },
        {
          id: 15,
          Name: 'История',
          Caption: 'История ресурса'
        }
      ],
      NewsClubNewsCard:
      [
        {
          id: 1,
          NewsClubNewsCardTitleNews: 'Матч против Динамо',
          NewsClubNewsCardDateNews: '14.03.22',
          NewsClubNewsCardTitleUrlImg: '../assets/image/imgTitle/title_2.png',
          NewsClubNewsCardCardNewsSrc: 'Источник: vk.com/dynamo_spb. ',
          NewsClubNewsCardPreViewNews: 'В минувшее воскресенье ФК "Север" провел товарищеский матч против ФК "Динамо" Санкт-Петербург.',
          NewsClubNewsCardExtNews: 'В минувшее воскресенье ФК "Север" провел гостевой товарищеский матч против ФК "Динамо" Санкт-Петербург. Матч закончился победой хозяев со счетом 4-2.',
          NewsClubNewsCardFullNews: 'В минувшее воскресенье ФК "Север" провел гостевой товарищеский матч против ФК "Динамо" Санкт-Петербург. Матч закончился победой хозяев со счетом 4-2. За "Север" голы забили: 33\'-Миронов, 76\'-Гагиев (пен).'
        },
        {
          id: 2,
          NewsClubNewsCardTitleNews: 'Поражение от Звезды',
          NewsClubNewsCardDateNews: '21.03.22',
          NewsClubNewsCardTitleUrlImg: '../assets/image/imgTitle/title_1.png',
          NewsClubNewsCardCardNewsSrc: 'Источник: vk.com/fczvezdaspb. ',
          NewsClubNewsCardPreViewNews: '19 марта товарищеский матч против ФК "Звезда" из Санкт-Петербурга закончился разгромом "Севера".',
          NewsClubNewsCardExtNews: 'Товарищеский матч против ФК "Звезда" из Санкт-Петербурга закончился разгромом "Севера". Команда из Мурманска проиграла 6-1.',
          NewsClubNewsCardFullNews: 'Товарищеский матч против ФК "Звезда" из Санкт-Петербурга закончился разгромом "Севера". Команда из Мурманска проиграла 6-1. Единственный гол "Север" гол забил на 26й минуте игрок под номером восемь.'
        }
      ],
      colorCode: 'подробно',
      count: 'red'
    },
    mutations: {
      increment (state) {
        state.count++
      }
    },
    actions: {
      increment (context) {
        context.commit('increment')
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
