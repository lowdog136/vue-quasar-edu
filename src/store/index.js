import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import { reactive } from 'vue'

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
      // Дата обновления новостей о сайте
      NavigationReleaseDateSite: '13.04.22',
      // Дата обновления новостей о команде
      NavigationReleaseNewsSite: '19.04.22',
      posts: JSON.parse(localStorage.getItem('posts') || '[]'),
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
          // Показывать в результататх матча true
          NewsClubNewsCardStatus: true,
          NewsClubNewsCardTitleNews: 'Матч против Динамо',
          NewsClubNewsCardDateNews: '14.03.22',
          NewsCardAnnounceNews: 'Товарищеский матч',
          NewsClubNewsCardTitleUrlImg: 'title_1.png',
          NewsClubNewsCardCardNewsSrc: 'Источник: vk.com/dynamo_spb.',
          NewsClubNewsCardPreViewNews: 'В минувшее воскресенье ФК "Север" провел товарищеский матч против ФК "Динамо" Санкт-Петербург.',
          NewsClubNewsCardExtNews: 'В минувшее воскресенье ФК "Север" провел гостевой товарищеский матч против ФК "Динамо" Санкт-Петербург. Матч закончился победой хозяев со счетом 4-2.',
          NewsClubNewsCardFullNews: 'В минувшее воскресенье ФК "Север" провел гостевой товарищеский матч против ФК "Динамо" Санкт-Петербург. Матч закончился победой хозяев со счетом 4-2. За "Север" голы забили: 33\'-Миронов, 76\'-Гагиев (пен).',
          ResultCardTitle: 'Поражение',
          ResultCardTeam1: 'ФК "Динамо" Санкт-Петербург',
          ResultCardTeam2: 'ФК "Север Мурманск',
          ResultCardResult: '4-2'
        },
        {
          id: 2,
          NewsClubNewsCardStatus: true,
          NewsClubNewsCardTitleNews: 'Поражение от Звезды',
          NewsClubNewsCardDateNews: '21.03.22',
          NewsCardAnnounceNews: 'Товарищеский матч',
          NewsClubNewsCardTitleUrlImg: 'title_2.png',
          NewsClubNewsCardCardNewsSrc: 'Источник: vk.com/fczvezdaspb.',
          NewsClubNewsCardPreViewNews: '19 марта очередной товарищеский матч против ФК "Звезда" из Санкт-Петербурга закончился разгромом "Севера".',
          NewsClubNewsCardExtNews: 'Товарищеский матч против ФК "Звезда" из Санкт-Петербурга закончился разгромом "Севера". Команда из Мурманска проиграла 6-1.',
          NewsClubNewsCardFullNews: 'Товарищеский матч против ФК "Звезда" из Санкт-Петербурга закончился разгромом "Севера". Команда из Мурманска проиграла 6-1. Единственный гол "Север" гол забил на 26й минуте игрок под номером восемь. ',
          ResultCardTitle: 'Поражение',
          ResultCardTeam1: 'ФК "Звезда" Санкт-Петербург',
          ResultCardTeam2: 'ФК "Север Мурманск',
          ResultCardResult: '6-1'
        },
        {
          id: 3,
          NewsClubNewsCardTitleNews: 'Победа над Фаворитом',
          NewsClubNewsCardStatus: true,
          NewsClubNewsCardDateNews: '26.03.22',
          NewsCardAnnounceNews: 'Товарищеский матч',
          NewsClubNewsCardTitleUrlImg: 'title_0.png',
          NewsClubNewsCardCardNewsSrc: 'Источник: vk.com/id121092017.',
          NewsClubNewsCardPreViewNews: 'Мурманчане крупно победили после последних поражений. Победа в контольном матче над ФК "Фаворит" г.Выборг 5-1.',
          NewsClubNewsCardExtNews: 'Мурманчане крупно победили после последних поражений. Победа в контольном матче над ФК "Фаворит" г.Выборг 5-1. Голы : Д. Майоров, А. Некрасов-2, П. Сурков-2',
          NewsClubNewsCardFullNews: 'Мурманчане крупно победили после последних поражений. Победа в контольном матче над ФК "Фаворит" г.Выборг 5-1. Голы : Д. Майоров, А. Некрасов-2, П. Сурков-2. Состав "Севера":О. Аврамчик, М. Слащев, М. Осипов (Э.Кубланов\'46), И. Ваганов, Г. Кравчук, Д. Миронов, М. Зайцев(И.Шилов\'46), И. Игнатенко, П. Рябоконь, А. Некрасов(А.Соловьев\'46), Д. Майоров( П. Сурков\'46) ',
          ResultCardStatus: true,
          ResultCardTitle: 'Победа',
          ResultCardTeam1: 'ФК "Север Мурманск',
          ResultCardTeam2: 'ФК "Фаворит" Выборг',
          ResultCardResult: '5-1 (3-1)'
        },
        {
          id: 4,
          NewsClubNewsCardTitleNews: 'Дорога в Дивноморское',
          NewsClubNewsCardDateNews: '29.03.22',
          NewsCardAnnounceNews: 'Новости клуба',
          NewsClubNewsCardTitleUrlImg: 'title_0.png',
          NewsClubNewsCardCardNewsSrc: 'Источник: severfans',
          NewsClubNewsCardPreViewNews: 'ФК "Север" отправился на сборы до 17 апреля в Дивноморское. Контрольные матчи будут при наличии подходящих соперников.',
          NewsClubNewsCardExtNews: 'ФК "Север" отправился на сборы до 17 апреля в Дивноморское. Контрольные матчи будут при наличии подходящих соперников.',
          NewsClubNewsCardFullNews: 'Сегодня 29 марта ФК "Север" отправится на сборы до 17 апреля в Дивноморское (Краснодарский край). Контрольные матчи будут при наличии подходящих соперников.'
        },
        {
          id: 5,
          NewsClubNewsCardStatus: true,
          NewsClubNewsCardTitleNews: 'Победа над "Черноморец-м"',
          NewsClubNewsCardDateNews: '06.04.22',
          NewsCardAnnounceNews: 'Товарищеский матч',
          NewsClubNewsCardTitleUrlImg: 'title_0.png',
          NewsClubNewsCardCardNewsSrc: 'Источник: vk.com/sever_murmansk',
          NewsClubNewsCardPreViewNews: 'ФК "Север" в рамках первого товарищеского матча на сборах одержал победу 0-3 (0-1) над ФК "Черноморец-м".',
          NewsClubNewsCardExtNews: 'ФК "Север" в рамках первого товарищеского матча на сборах одержал победу 0-3 (0-1) над ФК "Черноморец-м". Голы на счету Ивана Игнатенко и дубль Даниила Майорова',
          NewsClubNewsCardFullNews: 'ФК "Север" 6 апреля 2022 г в рамках первого товарищеского матча на сборах одержал победу 0-3 (0-1) над ФК "Черноморец-м". Голы на счету Ивана Игнатенко и дубль Даниила Майорова',
          ResultCardTitle: 'Победа',
          ResultCardTeam1: 'ФК "Черноморец-м" Новороссийск',
          ResultCardTeam2: 'ФК "Север Мурманск',
          ResultCardResult: '0-3 (0-1)'
        },
        {
          id: 6,
          NewsClubNewsCardTitleNews: 'Анонс матча "Витязево"',
          NewsClubNewsCardDateNews: '12.04.22',
          NewsCardAnnounceNews: 'Анонс матча',
          NewsClubNewsCardTitleUrlImg: 'title_0.png',
          NewsClubNewsCardCardNewsSrc: 'Источник: vk.com/sever_murmansk',
          NewsClubNewsCardPreViewNews: 'ФК «Север» в рамках продолжающейся подготовки к сезону на сборах сыграет в Витязево с местным одноимённым футбольным клубом.',
          NewsClubNewsCardExtNews: 'ФК «Север» в рамках продолжающейся подготовки к сезону на сборах сыграет в Витязево с местным одноимённым футбольным клубом.',
          NewsClubNewsCardFullNews: 'ФК «Север» в рамках продолжающейся подготовки к сезону на сборах сыграет в Витязево с местным одноимённым футбольным клубом. Онлайн трансляция пройдет в группе вк'
        },
        {
          id: 7,
          NewsClubNewsCardStatus: true,
          NewsClubNewsCardTitleNews: 'Ничья с Анапой',
          NewsClubNewsCardDateNews: '13.04.22',
          NewsCardAnnounceNews: 'Результат матча',
          NewsClubNewsCardTitleUrlImg: 'title_0.png',
          NewsClubNewsCardCardNewsSrc: 'Источник: vk.com/sever_murmansk',
          NewsClubNewsCardPreViewNews: 'ФК «Север» внезапно сыграл в ничью с ФК "Анапа" 1-1. До этого анонс был другого соперника. После первого тайма мурманчане проигрывали 0-1.',
          NewsClubNewsCardExtNews: 'ФК «Север» внезапно сыграл в ничью с ФК "Анапа" 1-1. До этого анонс был другого соперника ФК "Витязево". После первого тайма мурманчане проигрывали 0-1. Следующая игра, заключительная на сборе, состоится в пятницу 15 апреля в 14:00, соперником станет футбольный клуб «Виста».',
          NewsClubNewsCardFullNews: 'ФК «Север» внезапно сыграл в ничью с ФК "Анапа" 1-1. До этого анонс был другого соперника ФК "Витязево". После первого тайма мурманчане проигрывали 0-1. За Север забил Александ Соловьев. Следующая игра, заключительная на сборе, состоится в пятницу 15 апреля в 14:00, соперником станет футбольный клуб «Виста»',
          ResultCardTitle: 'Ничья',
          ResultCardTeam1: 'ФК Анапа',
          ResultCardTeam2: 'ФК "Север Мурманск',
          ResultCardResult: '1-1 (1-0)'
        },
        {
          id: 8,
          NewsClubNewsCardStatus: true,
          NewsClubNewsCardTitleNews: 'Победа над ФК "Виста"',
          NewsClubNewsCardDateNews: '19.04.22',
          NewsCardAnnounceNews: 'Результат матча',
          NewsClubNewsCardTitleUrlImg: 'title_8.png',
          NewsClubNewsCardCardNewsSrc: 'Источник: vk.com/fdcvista',
          NewsClubNewsCardPreViewNews: '15 апреля "Свевер" обыграл ФК "Виста". Северяне первые вышли вперед за счет пенальти на 13 минуте. Итоговый счет 1-2 (1-1)',
          NewsClubNewsCardExtNews: '15 апреля FDC «Vista» на домашнем поле провела товарищеский матч с мурманским «Севером».\n' +
            '\n' +
            'Уже на 13 минуте матча мы пропускаем гол с пенальти, который реализует футболист «Севера» Максим Осипов. Под занавес первого тайма Алексей Алуханян зарабатывает одиннадцатиметровый удар. На исполнение отправляют Самуэля Акере, который уверенно вколачивает мяч в сетку ворот.\n',
          NewsClubNewsCardFullNews: 'Пенальти северян в начале матча сломал игру красно-белым\n' +
            '\n' +
            '15 апреля FDC «Vista» на домашнем поле провела товарищеский матч с мурманским «Севером».\n' +
            '\n' +
            'Уже на 13 минуте матча мы пропускаем гол с пенальти, который реализует футболист «Севера» Максим Осипов. Под занавес первого тайма Алексей Алуханян зарабатывает одиннадцатиметровый удар. На исполнение отправляют Самуэля Акере, который уверенно вколачивает мяч в сетку ворот.\n' +
            '\n' +
            'Во втором тайме игра шла на обоюдных курсах. В самом начале один из шансов реализовали северяне: 1-2. Этот результат сохранился до конца матча и стал итоговым счётом.',
          ResultCardTitle: 'Победа',
          ResultCardTeam1: 'ФК Виста',
          ResultCardTeam2: 'ФК "Север Мурманск',
          ResultCardResult: '1-2 (1-1)'
        }
      ],
      colorCode: 'подробно',
      InsertValue: [],
      count: '2'
    },
    mutations: {
      updatePosts (state, posts) {
        state.posts = posts
      },
      createPost (state, newPost) {
        state.posts.unshift(newPost)
        localStorage.setItem('posts', JSON.stringify(state.posts))
      }
    },
    getters: {
      validPosts (state) {
        return state.posts.filter(p => {
          return p.title && p.body
        })
      },
      allPosts (state) {
        return state.posts
      },
      postsCount (state, getters) {
        return getters.validPosts.length
      }
    },
    actions: {
      createPost ({ commit }, post) {
        commit('createPost', post)
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
export const stope = reactive({
  state: {
    myName: 'zooloo',
    myCount2: 0,
    myTitleText: '',
    myArray: [
      {
        id: '',
        status: true,
        title: ''
      }
    ]
  },
  mutations: {
    SET_NAME: (state, myName) => {
      state.myName = myName
    }
  },
  actions: {},
  getters: {
    NAME: state => {
      return state.myName
    }
  }
})
