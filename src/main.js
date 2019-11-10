import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/vant.js';
// 引入全局样式表
import './assets/css/laybal.css';
// 引入axios
import axios from 'axios';
// 引入store
import store from './store/store';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
// 设置接口基准地址
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/';
// 设置请求拦截
axios.interceptors.request.use(config => {
  return config;
});
// 对日期格式进行处理
Vue.filter('dateFormat', function(date) {
  const time = new Date(date);
  const y = time.getFullYear();
  const m = (time.getMonth() + 1 + '').padStart(2, 0);
  const d = (time.getDate() + '').padStart(2, 0);
  const hh = (time.getHours() + '').padStart(2, 0);
  const mm = (time.getMinutes() + '').padStart(2, 0);
  const ss = (time.getSeconds() + '').padStart(2, 0);
  return `${y}-${m}-${d}  ${hh}:${mm}:${ss}`;
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
