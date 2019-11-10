import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Member from '../views/Member.vue';
import Search from '../views/Search.vue';
import ShopCar from '../views/ShopCar.vue';
import NewsPage from '../views/NewsPage.vue';
import NewsDetail from '../views/NewsDetail.vue';
import PicShare from '../views/PicShare.vue';
import PicDetail from '../views/PicDetail.vue';
import GoodList from '../views/GoodList.vue';
import ShopDetail from '../views/ShopDetail.vue';
import ShopPicProd from '../views/ShopPicProd.vue';
import ShopComment from '../views/ShopComment.vue';
import AddShop from '../views/AddShop.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/member', component: Member },
  { path: '/search', component: Search },
  { path: '/shopCar', component: ShopCar },
  { path: '/newsPage', component: NewsPage },
  { path: '/newsDetail', component: NewsDetail },
  { path: '/picShare', component: PicShare },
  { path: '/picDetail', component: PicDetail },
  { path: '/goodList', component: GoodList },
  { path: '/shopDetail', component: ShopDetail },
  { path: '/shopPicProd', component: ShopPicProd },
  { path: '/shopComment', component: ShopComment },
  { path: '/addShop', component: AddShop }
];

const router = new VueRouter({
  routes
});

export default router;
