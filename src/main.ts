// import dotenv from 'dotenv'
// dotenv.config()
import firebase from './firebase/index'
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

firebase.firebase.auth();



// const provider : any = firebase.auth().createUserWithEmailAndPassword('', '').then().catch();

// const fs: any = firebase.firestore();

// // window.fs : any = fs;

// const window.firestore = firebase.firestore()


Vue.config.productionTip = false

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
