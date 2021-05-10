import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Learn.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import JS from '../views/Editor.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Introduction from '../views/Introduction.vue'
import Basic from '../views/Basic.vue'
import CyclesAndConditions from '../views/CyclesAndConditions.vue'
import JS_Function from '../views/Function.vue'
import JS_Error from '../views/Error.vue'
import JS_Object from '../views/Object.vue'

import store from '../store/index'
import middlewarePipeline from './middlewarePipeline'
import guest from './middleware/guest'
import auth from './middleware/auth'
import openTask from './middleware/openTask'
import object from './middleware/object'
import func from './middleware/function'
import err from './middleware/error'
import basics from './middleware/basics'
import introduction from './middleware/introduction'
import js_cycles_and_conditions from './middleware/js_cycles_and_conditions'



Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/reset_password',
    name: 'Reset',
    component: ResetPassword,
    meta: {
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/js/:id',
    component: JS,
    name: 'js_task', 
    meta: {
      middleware: [
        auth,
        openTask
      ]
    }
  },
  {
    path: '/js/introduction/:id',
    component: Introduction,
    name: 'Introduction', 
    meta: {
      middleware: [
        auth,
        introduction
      ]
    }
  },
  {
    path: '/js/basic/:id',
    component: Basic,
    name: 'Basic', 
    meta: {
      middleware: [
        auth,
        basics
      ]
    }
  },
  {
    path: '/js/cycles_and_conditions/:id',
    component: CyclesAndConditions,
    name: 'CyclesAndConditions', 
    meta: {
      middleware: [
        auth,
        js_cycles_and_conditions
      ]
    }
  },
  {
    path: '/js/function/:id',
    component: JS_Function,
    name: 'Function', 
    meta: {
      middleware: [
        auth,
        func
      ]
    }
  },
  {
    path: '/js/error/:id',
    component: JS_Error,
    name: 'Error', 
    meta: {
      middleware: [
        auth,
        err
      ]
    }
  },
  {
    path: '/js/object/:id',
    component: JS_Object,
    name: 'Object', 
    meta: {
      middleware: [
        auth,
        object
      ]
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
