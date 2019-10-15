/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';

Vue.use(VueRouter);
//routes initailization for application
let routes = [
  { path: '/home', component: require('./components/Home.vue').default },
  { path: '/articles', component: require('./components/Article.vue').default },
  { path: '/about', component: require('./components/About.vue').default }
];

//assign routes to vue router
const router = new VueRouter({
  mode: 'history', //this will remove # sign from url and make clean url also remember history
  routes // short for `routes: routes`
});


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

//defining each component for application
Vue.component('navbar', require('./components/NavBar.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router// this will register router for application
});
