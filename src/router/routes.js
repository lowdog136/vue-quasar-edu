const routes = [
  {
    path: '/',
    meta: { requiresAuth: true },
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/AboutSite', name: 'AboutSite', component: () => import('pages/AboutSite.vue') },
      { path: '/Contact', name: 'Contact', component: () => import('pages/Contact.vue') },
      { path: '/Fanats', name: 'Fanats', component: () => import('pages/Fanats.vue') },
      { path: '/Foto', name: 'Foto', component: () => import('pages/Foto.vue') },
      { path: '/HistoryClub', name: 'HistoryClub', component: () => import('pages/HistoryClub.vue') },
      { path: '/ResultMatch', name: 'ResultMatch', component: () => import('pages/ResultMatch.vue') },
      { path: '/Stadium', name: 'Stadium', component: () => import('pages/Stadium.vue') },
      { path: '/Achievement', name: 'Achievement', component: () => import('pages/Achievement.vue') },
      { path: '/Video', name: 'Video', component: () => import('pages/Video.vue') },
      { path: '/NewsSite', name: 'NewsSite', component: () => import('pages/NewsSite.vue') },
      { path: '/MyTestNewsClub', name: 'MyTestNewsClub', component: () => import('pages/MyTestNewsClub.vue') },
      { path: '/NewsClub', name: 'NewsClub', component: () => import('pages/NewsClub.vue') },
      {
        path: '/News',
        component: () => import('layouts/LayoutNewsPage.vue'),
        children: [
          { path: '/News/140322', name: '140322', component: () => import('pages/News/140322.vue') },
          { path: '/News/test2', name: 'test2', component: () => import('pages/News/test2.vue') }
        ]
      },
      {
        path: '/User',
        meta: { requiresAuth: true },
        component: () => import('layouts/LayoutUserPage.vue'),
        children: [
          { path: '/User/ProfilePage', name: 'ProfilePage', component: () => import('pages/User/ProfilePage.vue') }
        ]
      },
      {
        path: '/Admin',
        meta: { requiresAuth: true },
        component: () => import('layouts/LayoutAdminPage.vue'),
        children: [
          { path: '/Admin/CarrotAdminPage', meta: { requiresAuth: true }, name: 'CarrotAdminPage', component: () => import('pages/Admin/CarrotAdminPage.vue') },
          { path: '/Admin/Exit', name: 'ExitAdmin', component: () => import('pages/Admin/ExitAdmin.vue') }
        ]
      },
      {
        path: '/GamesNow',
        component: () => import('layouts/LayoutGamesNow.vue'),
        children: [
          { path: '/GamesNow/GamesNowEvent', name: 'GamesNowEvent', component: () => import('pages/GamesNow/GamesNowEvent.vue') },
          { path: '/GamesNow/GamesNowTable', name: 'GamesNowTable', component: () => import('pages/GamesNow/GamesNowTable.vue') }
        ]
      },
      {
        path: '/Trest',
        meta: { requiresAuth: true },
        component: () => import('layouts/MainLayout2.vue'),
        children: [
          { path: '/Trest6', name: 'Trest6', component: () => import('pages/Trest/Trest6.vue') },
          { path: '/Trest5', name: 'Trest5', component: () => import('pages/Trest/Trest5.vue') },
          { path: '/Trest4', name: 'Trest4', component: () => import('pages/Trest/Trest4.vue') },
          { path: '/Trest3', name: 'Trest3', component: () => import('pages/Trest/Trest3.vue') },
          { path: '/Trest2', name: 'Trest2', component: () => import('pages/Trest/Trest2.vue') },
          { path: '/Trest', name: 'Trest', component: () => import('pages/Trest/Trest.vue') }
        ]
      },
      { path: '/CucumberPage', name: 'CucumberPage', component: () => import('pages/CucumberPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]
export default routes
