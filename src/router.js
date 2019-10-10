import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const router = new VueRouter({
  scrollBehavior(to, from, position) {
    return new Promise(resolve => {
      if (position) {
        setTimeout(() => resolve(position))
      } else {
        setTimeout(() => resolve({ x: 0, y: 0 }))
      }
    })
  },

  routes: [
    {
      path: '/:id(\\d+)?',
      component: () => import('@/components/Movies'),
      props: true,
      name: 'movies'
    },
    {
      path: '/movie/:genre(\\d+)/:id(\\d+)',
      component: () => import('@/components/Details'),
      props: true,
      name: 'movie'
    }
  ]
})
