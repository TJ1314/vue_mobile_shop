<template>
  <div id="app">
    <!-- 头部区域 -->
    <van-sticky>
      <van-nav-bar v-if="pagePath === '/home'" title="乐丰商城" />
      <van-nav-bar v-if="pagePath === '/search'" title="乐丰商城" left-text="返回" right-text="添加" left-arrow @click-left="goBack" @click-right="addShop" />
      <van-nav-bar v-if="pagePath !== '/home' && pagePath !== '/search'" title="乐丰商城" left-text="返回" left-arrow @click-left="goBack" />
    </van-sticky>
    <!-- 添加路由占位符 -->
    <router-view></router-view>
    <!-- <div class="space"></div> -->
    <!-- 底部tabbar标签栏 -->
    <div class="space" v-if="pagePath !== '/shopCar'">
      <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="contact" to="/member">会员</van-tabbar-item>
        <van-tabbar-item icon="cart-o" to="/shopCar" :info="$store.state.allNum">购物车</van-tabbar-item>
        <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      pagePath: ''
    };
  },
  created() {
    this.getPath();
  },
  updated() {
    this.getPath();
  },
  methods: {
    // 根据当前页面判断是否在头部显示返回区域
    getPath() {
      this.pagePath = location.href.split('#')[1];
      // console.log(this.pagePath);
      // console.log(this.$router);
    },
    // 返回上一级页面
    goBack() {
      this.$router.go(-1);
    },
    // 添加商品
    addShop() {
      this.$router.push('/addShop');
    }
  }
};
</script>

<style lang="less" scoped>
.space {
  height: 50px;
}
</style>
