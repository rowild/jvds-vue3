// import StartpageLayout from 'layouts/StartpageLayout'
// import MainLayout from 'layouts/MainLayout'

const routes = [
  {
    path: '/',
    component: () => import('layouts/StartpageLayout.vue'),
    meta: {
      layoutKey: 'home'
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          layoutKey: 'home'
        },
      }
    ]
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      layoutKey: 'main'
    },
    children: [
      {
        path: '',
        name: 'main-page',
        component:  () => import('pages/MainPage.vue'),
        meta: {
          layoutKey: 'main'
        },
        // components: {
        //   default: () => import('pages/MainPage.vue'),
        //   navmenu: () => import('src/components/MenuComponent.vue')
        // },
        children: [
          {
            path: ':section',
            name: 'section',
            component: () => import('pages/catalog/CatalogOfWorks.vue'),
            meta: {
              layoutKey: 'main'
            },
          },
          {
            path: ':section/:detail',
            name: 'section-detail',
            component: () => import('pages/catalog/DetailPage.vue'),
            meta: {
              layoutKey: 'main'
            },
          }
        ]
      }
    ]
  },
  {
    path: '/main/main',
    redirect: '/main'
  },
  {
    path: '/startpage/home',
    redirect: '/'
  },
  // Always leave this as last one, but you can also remove it
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('pages/PageNotFound.vue'),
    meta: {
      layout: () => import('layouts/StartpageLayout.vue')
    },
  }
]

export default routes

