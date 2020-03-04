import Vue from 'vue'
import Router from 'vue-router'

/* General view imports */

/* Specific page imports */
// import Placeholder from './views/Pages/Placeholder.vue';
import Work from './views/Pages/Work.vue';
import Demos from './views/Pages/Demos.vue';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '',
    //   name: 'home',
    //   // component: Placeholder,
    // },
    {
      path: '/work',
      name: 'work',
      component: Work,
    },
    {
      path: '/demos',
      name: 'demos',
      component: Demos
    }
  ]
})

export default router;