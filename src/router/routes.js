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
      { path: '/ArchiveGames', name: 'ArchiveGames', component: () => import('pages/ArchiveGames.vue') },
      { path: '/ArchiveGamesBefore', name: 'ArchiveGamesBefore', component: () => import('pages/ArchiveGamesBefore.vue') },
      { path: '/Stadium', name: 'Stadium', component: () => import('pages/Stadium.vue') },
      { path: '/Achievement', name: 'Achievement', component: () => import('pages/Achievement.vue') },
      { path: '/Video', name: 'Video', component: () => import('pages/Video.vue') },
      { path: '/NewsSite', name: 'NewsSite', component: () => import('pages/NewsSite.vue') },
      { path: '/NewsClub', name: 'NewsClub', component: () => import('pages/NewsClub.vue') },
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
          { path: '/Admin/TomatAdminPage', meta: { requiresAuth: true }, name: 'TomatAdminPage', component: () => import('pages/Admin/TomatAdminPage.vue') },
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
