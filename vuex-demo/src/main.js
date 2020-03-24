import Vue from 'vue';
import Antd from 'ant-design-vue';
import VueRouter from 'vue-router'
import App from './App.vue';
import store from './store';
import routes from './routes';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');