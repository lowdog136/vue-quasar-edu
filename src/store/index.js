import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import router from 'src/router'

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
      // NavigationReleaseDateSite: '18.07.22',
      // Дата обновления новостей о команде
      // NavigationReleaseNewsSite: '04.07.22',
      // Дата обновления календаря чемпионата
      GamesNowEventUpdateDate: '10.08.22',
      // Дата обновления таблицы чемпионата
      GamesNowTableUpdateDate: '04.07.22',
      posts: JSON.parse(localStorage.getItem('posts') || '[]'),
      tours: [
        {
          id: 1,
          name: '1 тур',
          other: '',
          count: ''
        },
        {
          id: 2,
          name: '2 тур',
          other: '',
          count: ''
        },
        {
          id: 3,
          name: '3 тур',
          other: '',
          count: ''
        },
        {
          id: 4,
          name: '4 тур',
          other: '',
          count: ''
        },
        {
          id: 5,
          name: '5 тур',
          other: '',
          count: ''
        },
        {
          id: 6,
          name: '5 тур',
          other: '',
          count: ''
        },
        {
          id: 7,
          name: '7 тур',
          other: '',
          count: ''
        }
      ],
      teams: [
        {
          id: 1,
          name: 'ФК "Север"',
          city: 'г. Мурманск'
        },
        {
          id: 2,
          name: 'СШ "Ленинградец"',
          city: 'Ленинградская область'
        },
        {
          id: 3,
          name: 'ФК "Псков"',
          city: 'г.Псков'
        },
        {
          id: 4,
          name: 'СШ №2 ВО "Звезда"',
          city: 'г. Санкт-Петербург'
        },
        {
          id: 5,
          name: 'СШ №7 "Карелия"',
          city: 'г. Петразаводск'
        },
        {
          id: 6,
          name: 'ФК "Химик"',
          city: 'г. Коряжма'
        },
        {
          id: 7,
          name: 'ФК "Новград"',
          city: 'г. Великий Новгород'
        },
        {
          id: 8,
          name: 'СШ "Электрон"',
          city: 'г. Великий Новгород'
        }
      ],
      games: [
        {
          id: 1,
          mounth: 'Май, 2022',
          matchEvents: [
            {
              id: 1,
              tour: '1 тур',
              nameEvent: 'СШ "Ленинградец" 6 - 2 ФК "Север"',
              color: 'primary',
              data: 'май 29, 2022',
              mounth: 'май',
              icon: 'bookmark_border',
              count: 0
            }
          ]
        },
        {
          id: 2,
          mounth: 'Июнь, 2022',
          matchEvents: [
            {
              id: 1,
              tour: '2 тур',
              nameEvent: 'СШ "Ленинградец" 6 - 2 ФК "Север"',
              color: 'primary',
              data: 'June 1, 2022',
              mounth: 'June',
              icon: 'bookmark_border',
              count: 0
            },
            {
              id: 2,
              tour: '3 тур',
              nameEvent: 'СШ "Ленинградец" 2 - 2 ФК "Север"',
              color: 'primary',
              data: 'June 11, 2022',
              mounth: 'June',
              icon: 'bookmark_border',
              count: 0
            },
            {
              id: 3,
              tour: '5 тур',
              nameEvent: 'СШ "Ленинградец" 1 - 2 ФК "Север"',
              color: 'primary',
              data: 'June 31, 2022',
              mounth: 'June',
              icon: 'bookmark_border',
              count: 0
            }
          ]
        }
      ],
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
      NewsClubNewsCard: [
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
        },
        {
          id: 9,
          NewsClubNewsCardStatus: true,
          NewsClubNewsCardTitleNews: '',
          NewsClubNewsCardDateNews: '23.04.22',
          NewsCardAnnounceNews: 'Результат матча',
          NewsClubNewsCardTitleUrlImg: 'title_0.png',
          NewsClubNewsCardCardNewsSrc: '',
          NewsClubNewsCardPreViewNews: '',
          NewsClubNewsCardExtNews: '',
          NewsClubNewsCardFullNews: '',
          ResultCardTitle: 'Победа',
          ResultCardTeam1: 'ФК "Константиновское"',
          ResultCardTeam2: 'ФК "Север Мурманск',
          ResultCardResult: '0-2'
        },
        {
          id: 10,
          NewsClubNewsCardStatus: true,
          NewsClubNewsCardTitleNews: 'Победа над ФК "Виста"',
          NewsClubNewsCardDateNews: '10.05.22',
          NewsCardAnnounceNews: 'Результат матча',
          NewsClubNewsCardTitleUrlImg: 'title_0.png',
          NewsClubNewsCardCardNewsSrc: '',
          NewsClubNewsCardPreViewNews: '',
          NewsClubNewsCardExtNews: '',
          NewsClubNewsCardFullNews: '',
          ResultCardTitle: 'Победа',
          ResultCardTeam1: 'ФК "Константиновское"',
          ResultCardTeam2: 'ФК "Север Мурманск',
          ResultCardResult: '1-2 (1-1)'
        },
        {
          id: 11,
          NewsClubNewsCardStatus: true,
          NewsClubNewsCardTitleNews: 'Победа над ФК "Виста"',
          NewsClubNewsCardDateNews: '30.05.22',
          NewsCardAnnounceNews: 'Результат матча',
          NewsClubNewsCardTitleUrlImg: 'title_0.png',
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
          ResultCardTeam1: 'ФК "Электрон"',
          ResultCardTeam2: 'ФК "Север Мурманск',
          ResultCardResult: '0-3 (0-1)'
        }
      ],
      GamesNowEventLists: [
        {
          id: 1,
          eventCardTitleMounthDate: 'Июль, 2022',
          eventCardTitleDate: 'Июль 2, 2022',
          eventCardNameContest: 'Чемпионат СЗФО',
          eventCardGameTur: 2,
          eventCardGameBody: 'ФК "Север" - СШ №7 Карелия',
          eventCardTitleMounthDateView: true
        },
        {
          id: 2,
          eventCardTitleMounthDate: 'Июль, 2022',
          eventCardTitleDate: 'Июнь 29, 2022',
          eventCardNameContest: 'Чемпионат СЗФО',
          eventCardGameTur: 1,
          eventCardGameBody: 'ФК "Север" - ФК "Химик"',
          eventCardTitleMounthDateView: true
        },
        {
          id: 3,
          eventCardTitleMounthDate: 'Июль, 2022',
          eventCardTitleDate: 'Июнь 29, 2022',
          eventCardNameContest: 'Чемпионат СЗФО',
          eventCardGameTur: 1,
          eventCardGameBody: 'ФК "Север" - ФК "Химик"',
          eventCardTitleMounthDateView: true
        },
        {
          id: 4,
          eventCardTitleMounthDate: 'Июль, 2022',
          eventCardTitleDate: 'Июнь 29, 2022',
          eventCardNameContest: 'Чемпионат СЗФО',
          eventCardGameTur: 1,
          eventCardGameBody: 'ФК "Север" - ФК "Химик"',
          eventCardTitleMounthDateView: true
        }
      ],
      colorCode: false,
      InsertValue: [],
      myCount: 2,
      ratingNewsCard: 0,
      count: '1',
      uid: 'wTZJonX7ZaWDPXOikF8gfzfvwfm1',
      NewsCardHowWatch: 0,
      user: null,
      event: null
    },
    mutations: {
      SET_USER (state, user) {
        state.user = user
      },
      incrementCounter (state) {
        state.myCount++
      },
      clearCount (state) {
        state.myCount = null
      },
      lenCounter (state) {
        state.myCount = 666
      },
      CLEAR_USER (state) {
        state.user = null
      },
      changePush () {
        this.router.push('/User')
      },
      ratingNewsCardUp (state) {
        state.ratingNewsCard++
      },
      howWatch: function (state) {
        state.NewsCardHowWatch++
      },
      changedropDown (state) {
        state.colorCode = true
      },
      updatePosts (state, posts) {
        state.posts = posts
      },
      createPost (state, newPost) {
        state.posts.unshift(newPost)
        localStorage.setItem('posts', JSON.stringify(state.posts))
      }
    },
    getters: {
      howWatch (state) {
        return state.NewsCardHowWatch
      },
      userName (state) {
        return state.user.email
      },
      eventListDay (state) {
        return state.event
      },
      ratingNewsCardUp (state) {
        return state.ratingNewsCard
      },
      dropDown (state) {
        return state.myCount
      },
      validPosts (state) {
        return state.posts.filter(p => {
          return p.title && p.body
        })
      },
      doublemyCount (state) {
        return state.myCount.length
      },
      allPosts (state) {
        return state.posts
      },
      postsCount (state, getters) {
        return getters.validPosts.length
      }
    },
    actions: {
      async login ({ commit }, details) {
        const { email, password } = details

        try {
          await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
          switch (error.code) {
            case 'auth/user-not-found':
              alert('user not found')
              break
            case 'auth/wrong-password':
              alert('wrong password')
              break
            default:
              alert('something went wrong')
          }
          return
        }
        commit('SET_USER', auth.currentUser)
        this.$router.push({ path: '/Admin' })
      },
      async register ({ commit }, details) {
        const { email, password } = details

        try {
          await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              alert('email already in use')
              break
            case 'auth/invalid-email':
              alert('invalid email')
              break
            case 'auth/operation-not-allowed':
              alert('operation not allows')
              break
            case 'auth/weak-password':
              alert('weak password')
              break
            default:
              alert('something went wrong')
          }
          return
        }
        commit('SET_USER', auth.currentUser)
        await this.$router.push({ path: '/' })
      },
      async logout ({ commit }) {
        await signOut(auth)
        commit('CLEAR_USER')
        this.router.push('/')
      },
      fetchUser ({ commit }) {
        auth.onAuthStateChanged(async user => {
          if (user === null) {
            commit('CLEAR_USER')
          } else {
            commit('SET_USER', user)

            if (router.isReady() && router.currentRoute.value.path === '/Admin') {
              this.router.push('/Admin')
            }
          }
        })
      },
      changePush ({ commit }) {
        commit('changePush')
      },
      myCountZero ({ commit }) {
        commit('clearCount')
      },
      myCountUp ({ commit }) {
        commit('incrementCounter')
      },
      myCountLen ({ commit }) {
        commit('lenCounter')
      },
      ratingNewsCardUp ({ commit }) {
        commit('ratingNewsCardUp')
      },
      howWatch ({ commit }) {
        commit('howWatch')
      },
      togledropDown ({ commit }) {
        commit('changedropDown')
      },
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
