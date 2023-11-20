const routes = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('pages/Index.vue') },
      { path: '/', name: 'dashboard', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/administrator',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/administrator/users-groups',
        name: 'users-groups',
        component: () => import('pages/administrator/UsersGroups.vue')
      },
    ]
  },
  {
    path: '/playground',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/playground/data-table',
        name: 'data-table',
        component: () => import('pages/playground/DataTables.vue')
      },
      {
        path: '/playground/forms',
        name: 'forms',
        component: () => import('pages/playground/Forms.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
