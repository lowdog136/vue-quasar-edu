
const routes = [
  {
    path: '/',
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
      { path: '/Video', name: 'Video', component: () => import('pages/Video.vue') },
      { path: '/NewsSite', name: 'NewsSite', component: () => import('pages/NewsSite.vue') },
      { path: '/NewsClub', name: 'NewsClub', component: () => import('pages/NewsClub.vue') },
      { path: '/Test', name: 'Test', component: () => import('pages/Test.vue') }
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
