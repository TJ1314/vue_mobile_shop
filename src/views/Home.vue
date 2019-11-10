<template>
  <div>
    <!-- 轮播图展示区域 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swipeList" :key="item.id">
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 九宫格导航区域 -->
    <van-grid :border="false" :column-num="3">
      <van-grid-item @click="goNewsPage">
        <img src="../assets/imgs/menu1.png" alt="">
        <span>新闻资讯</span>
      </van-grid-item>
      <van-grid-item @click="goPicSharePage">
        <img src="../assets/imgs/menu2.png" alt="">
        <span>图片分享</span>
      </van-grid-item>
      <van-grid-item @click="goGoodListPage">
        <img src="../assets/imgs/menu3.png" alt="">
        <span>商品购买</span>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/imgs/menu4.png" alt="">
        <span>留言反馈</span>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/imgs/menu5.png" alt="">
        <span>视频专区</span>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/imgs/menu6.png" alt="">
        <span>联系我们</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swipeList: []
    };
  },
  created() {
    this.getSwipeList();
  },
  methods: {
    // 获取轮播图数据
    async getSwipeList() {
      const { data: res } = await this.$http.get('/api/getlunbo');
      // console.log(res);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      this.swipeList = res.message;
    },
    // 前往新闻资讯页面
    goNewsPage() {
      this.$router.push('/newsPage');
    },
    // 前往图片分享页面
    goPicSharePage() {
      this.$router.push('/picShare');
    },
    // 前往商品列表组件
    goGoodListPage() {
      this.$router.push('/goodList');
    }
  }
};
</script>

<style lang="less" scoped>
.van-swipe-item {
  height: 200px !important;
  img {
    width: 100%;
    height: 100%;
  }
}

.van-grid-item {
  width: 33.333%;
  font-size: 15px;
  img {
    height: 65%;
    width: 65%;
    margin-bottom: 10px;
  }
}
</style>