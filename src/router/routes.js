const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/auth', name: 'Auth', component: () => import('pages/AuthPage.vue') },
      { path: '/AboutSite', name: 'AboutSite', component: () => import('pages/AboutSite.vue') },
      { path: '/Contact', name: 'Contact', component: () => import('pages/Contact.vue') },
      { path: '/Fanats', name: 'Fanats', component: () => import('pages/Fanats.vue') },
      { path: '/Foto', name: 'Foto', component: () => import('pages/Archive/Foto.vue') },
      { path: '/HistoryClub', name: 'HistoryClub', component: () => import('pages/HistoryClub.vue') },
      { path: '/ArchiveGames', name: 'ArchiveGames', component: () => import('pages/Archive/ArchiveGames.vue') },
      { path: '/ArchiveGamesBefore', name: 'ArchiveGamesBefore', component: () => import('pages/Archive/ArchiveGamesBefore.vue') },
      { path: '/authors-goals', name: 'authors-goals', component: () => import('pages/Archive/authors-goals.vue') },
      { path: '/Stadium', name: 'Stadium', component: () => import('pages/Stadium.vue') },
      { path: '/Achievement', name: 'Achievement', component: () => import('pages/PageAchievement.vue') },
      { path: '/Video', name: 'Video', component: () => import('pages/Video.vue') },
      { path: '/NewsSite', name: 'NewsSite', component: () => import('pages/NewsSite.vue') },
      { path: '/Test', name: 'Test', component: () => import('pages/Test.vue') },
      { path: '/TestPinia', name: 'TestPinia', component: () => import('pages/TestPinia.vue') },
      { path: '/NewsClub', name: 'NewsClub', component: () => import('pages/NewsClub.vue') },
      { path: '/eventList', name: 'eventList', component: () => import('pages/EventsList/eventList.vue') },
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
          { path: '/Admin', name: 'AdminDashboard', component: () => import('pages/Admin/Dashboard.vue') },
          { path: '/Admin/TomatAdminPage', meta: { requiresAuth: true }, name: 'TomatAdminPage', component: () => import('pages/Admin/TomatAdminPage.vue') },
          { path: '/Admin/InitEventTable', meta: { requiresAuth: true }, name: 'InitEventTable', component: () => import('pages/Admin/InitEventTable.vue') },
          { path: '/Admin/UserRoleManager', meta: { requiresAuth: true }, name: 'UserRoleManager', component: () => import('pages/Admin/UserRoleManagerPage.vue') },
          { path: '/Admin/MakeMeAdmin', meta: { requiresAuth: true }, name: 'MakeMeAdmin', component: () => import('pages/Admin/MakeMeAdmin.vue') },
          { path: '/Contact', name: 'Contact', component: () => import('pages/Contact.vue') },
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
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/AppError404.vue')
  }
]
export default routes
